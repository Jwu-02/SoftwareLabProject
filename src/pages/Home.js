import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router";

const Home = (props) => {

    // const [username, setUsername] = useState("");
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

    //   navigate('/project')


        // Prepare data to send to the backend
        const data = {
            userID: userID,
            password: password
        };

        try {
            // Make a POST request to your backend
            const response = await fetch('/login', {
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
            if (responseData.userID !== " " && responseData.password !== " " && responseData.userID !== null && responseData.password !== null && response.status === 200) {
                navigate('/project');
                // User logged in successfully
                // Update your UI accordingly
            } else {
                // navigate('/newUser')
                // Login failed
                // Update your UI accordingly
                setMessage("User Name or Password is invalid");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }



    const handleRegister = async (e) => {
        e.preventDefault();

        // Prepare data to send to the backend
        const data = {
            userID: userID,
            password: password
        };

        navigate('/newUser');

     }

    return (
        <div className="auth-form-container">
            <h1>ECE 461L: User Management</h1>
            <h2>Sign-In</h2>
            <form className="home-form" onSubmit={handleLogin}>
                {/* <label htmlFor="username">username</label> */}
                {/* <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" /> */}

                <label htmlFor="userID">userID</label>
                <input value={userID} onChange={(e) => setUserID(e.target.value)} type="text" id="userID" name="userID" />

                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" name="password" />

                <button>Login</button>

            </form>
            <div>{message}</div>
            <button className="link-button" onClick={handleRegister}>New user? Register here</button>
        </div>
    );
}


export default Home;

