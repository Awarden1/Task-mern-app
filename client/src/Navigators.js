import './App.css';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";

import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import CreateTask from './pages/CreateTask/CreateTask';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth, { AuthProvider } from './store/store';

function Navigators() {
  const { user } = useAuth();

  return (
    <div className="App">
        <Router>
            {user == null ?
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                </Routes>
            :
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/createTask" element={<CreateTask />} />
                </Routes>
            }
        </Router>
    </div>
  );
}

export default Navigators;
