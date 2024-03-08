import React, { useState } from 'react';
import { useNavigate } from "react-router";

const Project = (props) => {


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [newProjectID, setNewProjectID] = useState("");
    const [existingProjectID, setExistingProjectID] = useState("");

    const navigate = useNavigate();

    const handleSubmit = () => {
      navigate('/resourceManagement')
    }

    return (
      <div className="auth-form-container">
        <h1>ECE 461L: User Management</h1>
          <div className="project-container">
              <form className="project-user">
                <h2>Create New Project</h2>
                <label htmlFor="name">name</label>
                <input value = {name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name"/>

                <label htmlFor="description">description</label>
                <input value = {description} onChange={(e) => setDescription(e.target.value)} type="text" id="description" name="description"/>
                
                <label htmlFor="newProjectID">projectID</label>
                <input value = {newProjectID} onChange={(e) => setNewProjectID(e.target.value)} type="text" id="newProjectID" name="newProjectID"/>
                <button onClick={handleSubmit}>Submit</button>
              </form>

              <form className="project-user">
                <h2>Use Existing Project</h2>
                <label htmlFor="existingProjectID">projectID</label>
                <input value = {existingProjectID} onChange={(e) => setExistingProjectID(e.target.value)} type="text" id="existingProjectID" name="existingProjectID"/>
                <button onClick={handleSubmit}>Submit</button>
              </form>
          </div>
        
      </div>
      
    )
}

export default Project;