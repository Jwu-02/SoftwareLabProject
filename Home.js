import React, { useState } from 'react';

// testing, Alberto

const Home = (props) => {

    const [username, setUsername] = useState("");
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
    }

    return (
      <div className="auth-form-container">
        <h1>ECE 461L: User Management</h1>
        <form className="home-form" onSubmit={handleSubmit}>
          <label htmlFor="username">username</label>
          <input value = {username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username"/>

          <label htmlFor="userID">userID</label>
          <input value = {userID} onChange={(e) => setUserID(e.target.value)} type="text" id="userID" name="userID"/>

          <label htmlFor="password">password</label>
          <input value = {password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" name="password"/>

          <button>Login</button>
        </form>
        <button className="link-button" onClick={() => props.onFormSwitch("NewUser")}>New user? Register here</button>
      </div>

    );
}

export default Home;
