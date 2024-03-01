import React, { useState } from "react";
import './App.css';
import Home from "./Home";
import NewUser from "./NewUser";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Home onFormSwitch={toggleForm} /> : <NewUser onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;