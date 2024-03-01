import React, { useState } from 'react';

const NewUser = (props) => {

    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
      }

    return (
      <div className="auth-form-container">
        <h1>ECE 461L: User Management</h1>
        <form className="newuser-form" onSubmit={handleSubmit}>
          <label htmlFor="userID">userID</label>
          <input value = {userID} onChange={(e) => setUserID(e.target.value)} type="text" id="userID" name="userID"/>

        
          <label htmlFor="password">password</label>
          <input value = {password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" name="password"/>

          <button onClick={() => props.onFormSwitch("login")}>Login</button>
        </form>
        <button className="link-button" onClick={() => props.onFormSwitch("login")}>Already have an account? Login here</button>
      </div>
    )
}

export default NewUser;