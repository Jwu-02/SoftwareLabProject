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

    const handleLogin = () => {
      navigate('/project')
    }

    return (
      <div className="auth-form-container">
        <h1>ECE461L: User Management</h1>
        <h2>Sign-In</h2>
        <form className="home-form">
          <label htmlFor="username">username</label>
          <input value = {username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username"/>

          <label htmlFor="userID">userID</label>
          <input value = {userID} onChange={(e) => setUserID(e.target.value)} type="text" id="userID" name="userID"/>

          <label htmlFor="password">password</label>
          <input value = {password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" name="password"/>

          <button onClick={handleLogin}>Login</button>
        </form>
        <button className="link-button" onClick={handleNewUserClick}>New user? Register here</button> 
      </div>

    );
}

export default Home;
