import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './home.jsx';
import Signup from './signup.jsx'; 
import Signin from './signin.jsx'; 
import Reset from './reset.jsx'; 
import EyeDisease from './eyedisease.jsx';
import History from './history.jsx';
import Dashboard from './dashboard.jsx';
import Header from './header.jsx';
import About from './about.jsx';
import Chatbot from './chatbot.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated } from "./signin.jsx";

const PrivateRoute = ({ element }) => {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/signin" /> 
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<Reset />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/eyedisease" element={<PrivateRoute element={<EyeDisease />} path="/eyedisease" />}/>
          <Route path="/chatbot" element={<PrivateRoute element={<Chatbot />} path="/chatbot" />}/>
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} path="/dashboard" />}/>
          <Route path="/history" element={<PrivateRoute element={<History />} path="/history" />}/>
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
