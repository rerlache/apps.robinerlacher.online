import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [allApps, setAllApps] = useState([]);
  const [userApps, setUserApps] = useState(auth.user.apps)

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    async function getAllApps() {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + auth.accessToken,
            withCredentials: true,
          },
        };
        const response = await axios.get(
          "/general/Application/GetAllApplications",
          config
        );
        isMounted && setAllApps(response.data);
      } catch (error) {
        console.log(error);
        setErrMsg(error.message);
      }
    }
    getAllApps();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  async function signUpApp(appId) {
    try {
      const data = JSON.stringify({ appId: appId, userId: auth.user.id });
      const config = {
        headers: {
          Authorization: "Bearer " + auth.accessToken,
          withCredentials: true,
        },
      };
      const app = await axios.get(`/general/Application/GetAppById/${appId}`,config)
      const response = await axios.post("/general/User/SignUpApp", data, config);
      console.log('response', response)
      setUserApps([...userApps, app.data])
    } catch (error) {
      setErrMsg(error.message);
    }
  }

  return (
    <section>
      <h2>My Profile</h2>
      <p>{auth.user.id}</p>
      <h3>Available Applications</h3>

      {allApps.length ? (
        <ul>
          {allApps.map((app) => (
            <li key={app.id}>
              <b>{app.name}</b>:<br />
              {app.description}
              <br />
              {userApps.some((item) => item.id === app.id) ? (
                "Already assigned"
              ) : (
                <button onClick={() => signUpApp(app.id)}>Sign Up</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>{errMsg}</p>
      )}
      <button onClick={() => navigate(-1)}>Back</button>
    </section>
  );
}
