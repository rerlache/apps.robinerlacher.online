import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  async function getUsers() {
    try {
      const response = await axios.get("/general/User/GetAllUsers", {
        headers: { "Access-Control-Allow-Origin": "*" },
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {users && (
        <ul>
          {users.map((user) => (
            <li key={user.userName}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
