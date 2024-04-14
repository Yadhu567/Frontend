import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text, VStack, Box, Flex, Heading } from '@chakra-ui/react';
import axios from 'axios';

const Dashboard = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [eyeHealthRisk, setEyeHealthRisk] = useState(null);
  const [eyeHealthStatus, setEyeHealthStatus] = useState(null);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('user_id');
    const userIdCopy = userIdFromStorage;
    localStorage.setItem('user_id', userIdCopy);
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);

      // Send request to fetch user data
      axios.post('http://127.0.0.1:8000/dashboard/', { user_id: userIdFromStorage })
        .then(response => {
          // Update user data state with response data
          setUserData(response.data);
          // Set eye health risk and status
          setEyeHealthRisk(response.data.eye_health_risk);
          setEyeHealthStatus(response.data.eye_health_status);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <Flex align="center" justify="center" minH="70vh">
      <Box width="600px" p="9" borderRadius="xl" boxShadow="md" bg="white">
        <VStack spacing="4">
          <Heading fontSize="xl">Welcome to Your Dashboard</Heading>
          <Text>Your User ID: {userId}</Text>

          {/* Display user data if available */}
          {userData && (
            <>
              <Text>Name: {userData.name}</Text>
              <Text>Age: {userData.age}</Text>
              <Text>Email: {userData.email}</Text>
            </>
          )}

          {/* Display eye health risk and status if available */}
          {eyeHealthRisk !== null && eyeHealthStatus !== null && (
            <>
              <Text>Eye Health Risk: {eyeHealthRisk}</Text>
              <Text>Eye Health Status: {eyeHealthStatus}</Text>
            </>
          )}

          <Button as={Link} to="/eyedisease" colorScheme="blue">
            Predict Disease
          </Button>
          <Button as={Link} to="/history" colorScheme="green">
            Show History
          </Button>
          <Button as={Link} to="/chatbot" colorScheme="purple">
            Chatbot
          </Button>
          <Button as={Link} to="/" colorScheme="red">
            Logout
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Dashboard;
