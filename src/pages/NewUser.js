import React, { useState } from 'react';
import { useNavigate } from "react-router";

const NewUser = (props) => {

    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    
    const navigate = useNavigate();

    const handleExistingUserClick = () => {
        navigate('/')
    }

    const handleRegister = async (e) => {
        e.preventDefault();

         // Check if userID or password is null, empty or just spaces
         // trim() method removes the leading and trailing spaces from the userID
         if (!userID || !userID.trim() || !password || !password.trim()) {
            setMessage("User ID or password cannot be empty");
            return;
        }

        // Prepare data to send to the backend
        const data = {
            userID: userID,
            password: password
        };

        try {
            // Make a POST request to backend
            const response = await fetch('/save_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Handle the response from the backend
            const responseData = await response.json();
            console.log(responseData); // Log the response for debugging purposes

            if (response.status === 201) {
                // User registered successfully
                setMessage("User registered successfully");
            } else{
                // Registration failed
                setMessage(responseData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="auth-form-container">
            <h1>ECE 461L: User Management</h1>
            <h2>Register for New User</h2>
            <form className="newuser-form" onSubmit={handleRegister}>
                <label htmlFor="userID">userID</label>
                <input value={userID} onChange={(e) => setUserID(e.target.value)} type="text" id="userID" name="userID"/>

                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" name="password"/>

                <button type="submit">Register</button>
            </form>
            <div>{message}</div>
            <button className="link-button" onClick={handleExistingUserClick}>Already have an account? Login here</button>
        </div>
    );
}

export default NewUser;