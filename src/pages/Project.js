import React, { useState } from 'react';
import { useNavigate } from "react-router";

const Project = () => {
    // const [userID, setUserID] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [newProjectID, setNewProjectID] = useState("");
    const [existingProjectID, setExistingProjectID] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [message_2,setMessage_2] = useState("");

    const handleLogout = () => {
      // Add any logout logic here if needed
      navigate('/');
    }

    const handleExistingProjectSubmit = async (event) =>{
      event.preventDefault(); // Prevent default form submission
      const data = {
        projectID: existingProjectID,
      };
      try {
        const response = await fetch('/exist_project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
            console.log(responseData); // Log the response for debugging purposes
        if (response.status === 200) {
            navigate('/resourceManagement');
        } else {
          setMessage_2("Project ID does not exixts")
        }

      } catch (error) {
        console.error('Error:', error);
    }



    }
    const handleNewProjectSubmmit = async (event) => {
      event.preventDefault(); // Prevent default form submission
      const data = {
        projectID: newProjectID,
        name: name,
        description: description
      };

        // Check if userID or password is null, empty or just spaces
    if (!name || !name.trim() || !description || !description.trim() || !newProjectID || !newProjectID.trim()) {
      setMessage("No field can be left empty");
      return;
  }
  
      try {
        const response = await fetch('/new_project', {
              method: 'POST',
              headers: {
                    'Content-Type': 'application/json',
                },
              body: JSON.stringify(data)
              });
              // Handle the response from the backend
        const responseData = await response.json();
        console.log(responseData); // Log the response for debugging purposes
        if (response.status === 400) {
          setMessage("Project ID already exists");
        } else if(response.status === 201){
          setMessage("Project ID successfully created ")
        }
        }catch (error) {
          console.error('Error:', error);
        }
    }

    return (
        <div className="auth-form-container">
            <h1>ECE 461L: User Management</h1>
            <button style={{position: 'absolute', top: '10px', right: '10px', width: '100px'}} onClick={handleLogout}>Logout</button>
            <div className="project-container">
                <form className="project-user" onSubmit={handleNewProjectSubmmit}>
                    <h2>Create New Project</h2>
                    
                    <label htmlFor="name">name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" />

                    <label htmlFor="description">description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" id="description" name="description" />

                    <label htmlFor="newProjectID">projectID</label>
                    <input value={newProjectID} onChange={(e) => setNewProjectID(e.target.value)} type="text" id="newProjectID" name="newProjectID" />
                    <button type="submit">Submit</button>

                    <div>{message}</div>
                </form>

                <form className="project-user" onSubmit={handleExistingProjectSubmit}>
                    <h2>Use Existing Project</h2>
                    <label htmlFor="existingProjectID">projectID</label>
                    <input value={existingProjectID} onChange={(e) => setExistingProjectID(e.target.value)} type="text" id="existingProjectID" name="existingProjectID" />
                    <button type="submit">Submit</button>
                    <div>{message_2}</div>
                </form>
            </div>
        </div>
    );
}

export default Project;

