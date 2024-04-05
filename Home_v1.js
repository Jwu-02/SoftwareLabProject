import React, { useState } from 'react';
import { useNavigate } from "react-router";

const Home = (props) => {

    const [username, setUsername] = useState("");
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleNewUserClick = () => {
        navigate('/newUser');
    };
    // const handleLogin = async (e) => {
    //   e.preventDefault();

    //   navigate('/project')
    // // const handleLogin = () => {
    // //   navigate('/project')
    // // }

    const handleLogin = async (e) => {
        e.preventDefault();

      navigate('/project')


        // Prepare data to send to the backend
        const data = {
            userID: userID,
            password: password
        };

        try {
            // Make a POST request to your backend
            const response = await fetch('http://127.0.0.1:5000/login', {
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
            if (response.status === 200) {
                navigate('/project');
                // User logged in successfully
                // Update your UI accordingly
            } else {
                navigate('/newUser')
                // Login failed
                // Update your UI accordingly
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
      <div className="auth-form-container">
        <h1>ECE461L: User Management</h1>
        <h2>Sign-In</h2>
        <form className="home-form" onSubmit={handleLogin}>
          {/* <label htmlFor="username">username</label>
          <input value = {username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username"/> */}

          <label htmlFor="userID">userID</label>
          <input value = {userID} onChange={(e) => setUserID(e.target.value)} type="text" id="userID" name="userID"/>

          <label htmlFor="password">password</label>
          <input value = {password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" name="password"/>

          <button>Login</button>
        </form>
        <button className="link-button" onClick={handleNewUserClick}>New user? Register here</button>
      </div>

    );
}

export default Home;
