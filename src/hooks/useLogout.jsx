import axios from "../api/axios";
import useAuth from "./useAuth";

export default function useLogout() {
  const { setAuth } = useAuth();

  async function logout() {
    setAuth({});
    try {
      const response = await axios("/general/Login/Logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return logout
}
