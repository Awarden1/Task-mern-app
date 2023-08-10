import './App.css';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";

import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import CreateTask from './pages/CreateTask/CreateTask';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth, { AuthProvider } from './store/store';
import Navigators from './Navigators';

function App() {
  return (
    <AuthProvider>
      <Navigators />
    </AuthProvider>
  );
}

export default App;
