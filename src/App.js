import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewUser from './pages/NewUser';
import Project from './pages/Project'
import './App.css';
import ResourceManagement from './pages/ResourceManagement';
//import ResourceManagement from './ResourceManagement_V1';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/project" element={<Project />} />
          <Route path="/resourceManagement" element={<ResourceManagement />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
