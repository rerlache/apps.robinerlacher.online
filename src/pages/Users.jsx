import { useState, useEffect } from "react";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const refresh = useRefreshToken();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    async function getUsers() {
      try {
        const response = await axios.get("/general/User/GetAllUsers", {
          signal: controller.signal,
          headers: {
            // Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        isMounted && setUsers(response.data);
      } catch (error) {
        console.log(error);
        setErrMsg(error.message)
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
      <button onClick={() => refresh}>Refresh</button>
    </div>
  );
}
