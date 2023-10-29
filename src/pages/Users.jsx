import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

export default function Users() {
  const { auth, setAuth } = useAuth();
  const [users, setUsers] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const refresh = useRefreshToken();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    async function getUsers() {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + auth.accessToken,
            withCredentials: true,
          },
        };
        const response = await axios.get("/general/User/GetAllUsers", config);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.log(error);
        setErrMsg(error.message);
      }
    }

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      {users.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.userName}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found!</p>
      )}
      <button onClick={() => navigate("/")}>Back</button>
      <button onClick={() => refresh}>Refresh</button>
      <button onClick={() => setAuth({})}>Logout</button>
    </div>
  );
}
