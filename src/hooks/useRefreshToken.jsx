import axios from "../api/axios";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  async function refresh(token) {
    const response = await axios.get("/general/Login/WithToken", {
      headers: {
        token: token,
      },
    });
    setAuth((prev) => {
      console.log("prev", JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    console.log("response", response);
    return response.data.accessToken;
  }
  return refresh;
}
