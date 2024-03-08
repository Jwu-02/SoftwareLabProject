import React, { useState } from 'react';
import { useNavigate } from "react-router";

const NewUser = (props) => {

    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleExistingUserClick = () => {
        navigate('/')
    }

    const handleLogin = () => {
      navigate('/project')
    }

    return (
      <div className="auth-form-container">
        <h1>ECE 461L: User Management</h1>
        <h2>Sign-In</h2>
        <form className="newuser-form">
          <label htmlFor="userID">userID</label>
          <input value = {userID} onChange={(e) => setUserID(e.target.value)} type="text" id="userID" name="userID"/>

          <label htmlFor="password">password</label>
          <input value = {password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" name="password"/>

          <button onClick={handleLogin}>Login</button>
        </form>
        <button className="link-button" onClick={handleExistingUserClick}>Already have an account? Login here</button>
      </div>
    )
}

export default NewUser;