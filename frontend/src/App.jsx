// home.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './home.jsx';
import Signup from './signup.jsx'; 
import Signin from './signin.jsx'; 
import Reset from './reset.jsx'; 
import  EyeDisease from './eyedisease.jsx';
import  History from './history.jsx';
import  Dashboard from './dashboard.jsx';
import Header from './header.jsx';
import About from './about.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<Reset />} /> 
          <Route path="/eyedisease" element={<EyeDisease />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
