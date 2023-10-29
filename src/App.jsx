import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import Users from "./pages/Users";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="admin" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
