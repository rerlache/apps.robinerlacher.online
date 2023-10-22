import { useState } from "react";
// import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

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
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
      {/* <Login />
      <Register /> */}
    </>
  );
}

export default App;
