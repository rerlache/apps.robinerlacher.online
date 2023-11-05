import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Users from "./pages/Users";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
        {/* <Route element={<PersistLogin />}> */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<Users />} />
          </Route>
        {/* </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
