import React, { useState } from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import Navbar from "./Navbar";

function Input(props) {
  return (
    <div>
      <label htmlFor={props.field}>{props.Filed}</label>
      <input type="text" id={props.field} />
    </div>
  );
}

const Home = () => {
  const [formData, setFormData] = useState({
    Name: "",
    userID: "",
    password: ""
  });
  const [existingUser, setExistingUser] = useState(true);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    // Send formData to backend
    fetch("/save_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setMessage(data); // Set the message received from the backend
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">User Information</h1>

          {/* Toggle between existing and new user */}
          <div>
            <button onClick={() => setExistingUser(true)}>Existing User</button>
            <button onClick={() => setExistingUser(false)}>New User</button>
          </div>

          {/* Display message */}
          {message && <p>{message}</p>}

          {/* Display fields based on existing or new user */}
          {existingUser ? (
            <div>
              <h2>Existing User</h2>
              <div>
                <Input field="Name" Filed="Name:" onChange={handleInputChange} />
              </div>
              <div>
                <Input field="userID" Filed="UserID:" onChange={handleInputChange} />
              </div>
              <div>
                <Input field="password" Filed="Password:" onChange={handleInputChange} />
              </div>
            </div>
          ) : (
            <div>
              <h2>New User</h2>
              <div>
                <Input field="Name" Filed="Name:" onChange={handleInputChange} />
              </div>
              <div>
                <Input field="userID" Filed="UserID:" onChange={handleInputChange} />
              </div>
              <div>
                <Input field="password" Filed="Password:" onChange={handleInputChange} />
              </div>
            </div>
          )}

          {/* Thin black line */}
          <hr />

          {/* Create New Project */}
          <h2>Create New Project</h2>

          {/* Project details */}
          <div>
            <Input field="Name" Filed="Name:" onChange={handleInputChange} />
          </div>
          <div>
            <Input field="description" Filed="Description:" onChange={handleInputChange} />
          </div>
          <div>
            <Input field="projectId" Filed="ProjectID:" onChange={handleInputChange} />
          </div>

          {/* Use Existing Project */}
          <div>
            <h2>Use Existing Project</h2>
            <Input field="existingProjectId" Filed="ProjectID:" onChange={handleInputChange} />
          </div>

          {/* Submit Button */}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
