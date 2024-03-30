// home.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './home.jsx';
import Signup from './signup.jsx'; 
import Signin from './signin.jsx'; 
import Reset from './reset.jsx'; 
import  EyeDisease from './eyedisease.jsx';
import Header from './Header.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from './About.jsx';

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
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
