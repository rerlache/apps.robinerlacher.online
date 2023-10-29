import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
export default function LoginHistory() {
  const { auth } = useAuth();
  const [errMsg, setErrMsg] = useState("");
  const [loginHistory, setLoginHistory] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getLogins() {
      try {
        const config = {
          headers: {
            userName: auth.user.userName,
            Authorization: "Bearer " + auth.accessToken,
            withCredentials: true,
          },
        };
        const response = await axios.get("/general/Login/GetHistory", config);
        isMounted && setLoginHistory(response.data);
      } catch (error) {
        console.log(error);
        setErrMsg(error.message);
      }
    }

    getLogins();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section>
      {errMsg && <p>{errMsg}</p>}
      {loginHistory.length && errMsg == "" ? (
        <ul>
          {loginHistory.map((login, i) => {
            const formattedDate = new Date(login.loginDate).toLocaleString(
              "de-DE",
              { dateStyle: "long", timeStyle: "short" }
            );
            return (
              <li key={i}>
                {login.success ? "successful" : "failed"} login from:{" "}
                {login.ipAddress}
                <br />
                on: {formattedDate}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
