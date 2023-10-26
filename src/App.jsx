import { useState } from "react";
// import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  function toggleForm(formName) {
    console.log(formName);
    setCurrentForm(formName);
  }

  return (
    <>
      {currentForm == "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : currentForm == "register" ? (
        <Register onFormSwitch={toggleForm} />
      ) : (
        <Reset onFormSwitch={toggleForm} />
      )}
      {/* <Login />
      <Register /> */}
    </>
  );
}

export default App;
