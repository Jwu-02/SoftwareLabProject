import React, { useState } from 'react';
import { useNavigate } from "react-router";

const NewUser = (props) => {

    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleExistingUserClick = () => {
        navigate('/')
    }

    // const handleLogin = () => {
    //   navigate('/')
    // }

    const handleRegister = async (e) => {
      e.preventDefault();

      // Prepare data to send to the backend
      const data = {
          userID: userID,
          password: password
      };

      try {
          // Make a POST request to your backend
          const response = await fetch('http://127.0.0.1:5000/save_user', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });

          // Handle the response from the backend
          const responseData = await response.json();
          console.log(responseData); // Log the response for debugging purposes

          // Optionally, you can handle the response here and update your UI accordingly
          if (response.status === 201) {
              // User registered successfully
              // Navigate to the project page
              navigate('/project');
          } else {
              // Registration failed
              // Update your UI accordingly
              navigate('/')
          }
      } catch (error) {
          console.error('Error:', error);
      }
  }

    return (
      <div className="auth-form-container">
        <h1>ECE 461L: User Management</h1>
        <h2>Register</h2>
        <form className="newuser-form" >
          <label htmlFor="userID">userID</label>
          <input value = {userID} onChange={(e) => setUserID(e.target.value)} type="text" id="userID" name="userID"/>

          <label htmlFor="password">password</label>
          <input value = {password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" name="password"/>

          <button className="link-button" onClick={handleRegister}>Register</button>
        </form>
        <button className="link-button" onClick={handleExistingUserClick}>Already have an account? Login here</button>
      </div>
    )
}

export default NewUser;