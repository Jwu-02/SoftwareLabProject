import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import Navbar from "./Navbar";

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
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" />
          </div>


          {/* New User and Sign-in */}
          <div>
            <h2>New User?</h2>
            <h3>Sign-up</h3>
          </div>


          {/* UserID and Password */}
          <div>
            <div>
              <label htmlFor="userId">UserID:</label>
              <input type="text" id="userId" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" />
            </div>


          </div>
          {/* Thin black line */}
          <hr />


          {/* Create New Project */}
          <h2>Create New Project</h2>


          {/* Project details */}
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" />
          </div>


          <div>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" />
          </div>


          <div>
            <label htmlFor="projectId">ProjectID:</label>
            <input type="text" id="projectId" />
          </div>


          {/* Use Existing Project */}
          <div>
            <h2>Use Existing Project</h2>
            <label htmlFor="existingProjectId">ProjectID:</label>
            <input type="text" id="existingProjectId" />
          </div>


        </div>
      </div>
    </div>
  );
};

export default Home;