import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import Navbar from "./Navbar";

function Input(props){
  return(
    <div>
      <label htmlFor="{props.field}">{props.Filed}</label>
      <input type="text" id="{props.field"/>
    </div>
  )
}
const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">


        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">

          
          <h1 className="primary-heading">
            User Information
          </h1>


          {/* Username field */}
          <div>
            <Input field= "username" Filed="Username:" />
          </div>


          {/* New User and Sign-in */}
          <div>
            <h2>New User?</h2>
            <h3>Sign-up</h3>
          </div>


          {/* UserID and Password */}
          <div>
            <div>
              <Input field="userID" Filed="UserID:" />
            </div>
            <div>
            
              <Input field="password" Filed="Password:" />
            </div>


          </div>
          {/* Thin black line */}
          <hr />


          {/* Create New Project */}
          <h2>Create New Project</h2>


          {/* Project details */}
          <div>
            
            <Input field="name" Filed="Name:" />
          </div>


          <div>
            <Input field="description" Filed="Description:" />
          </div>


          <div>
            
            <Input field="projectId" Filed="ProjectID:" />
          </div>


          {/* Use Existing Project */}
          <div>
            <h2>Use Existing Project</h2>
            <Input field="existingProjectId" Filed="ProjectID:" />
          </div>


        </div>
      </div>
    </div>
  );
};

export default Home;