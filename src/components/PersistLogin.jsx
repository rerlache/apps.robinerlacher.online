import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        console.log('auth', auth)
        await refresh(auth.accessToken);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("isLoading", isLoading);
    console.log("aT", JSON.stringify(auth?.accessToken));
  }, [isLoading]);

  return <>{isLoading ? <p>loading...</p> : <Outlet />}</>;
}
