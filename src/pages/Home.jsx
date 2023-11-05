import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginHistory from "../components/LoginHistory";
import UserApps from "../components/UserApps";
import useLogout from "../hooks/useLogout";

export default function Home() {
  const logout = useLogout();
  const navigate = useNavigate();

  async function signOut() {
    await logout();
    navigate("/");
  }

  return (
    <>
      <div>Home</div>
      <p>Hier kommt dann die auflistung der anwendungen!</p>
      {/* {auth && (
        <>
          <p>
            Welcome back, {auth.user.firstName} {auth.user.lastName}.
          </p>
        </>
      )} */}
      <UserApps />
      <LoginHistory />
      <Button
        variant="contained"
        color="primary"
        onClick={signOut}
      >
        Logout
      </Button>
      <Button variant="contained" color="primary" onClick={signOut}>
        Register
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/reset");
        }}
      >
        Reset
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/profile");
        }}
      >
        Profile
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/admin");
        }}
      >
        Admin
      </Button>
    </>
  );
}
