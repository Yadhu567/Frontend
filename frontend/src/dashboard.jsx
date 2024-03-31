import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text, VStack, Box, Flex, Heading } from '@chakra-ui/react';

const Dashboard = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('user_id');
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
  }, []);

  return (
    <Flex align="center" justify="center" minH="70vh">
      <Box width="400px" p="9" borderRadius="xl" boxShadow="md" bg="white">
        <VStack spacing="4">
          <Heading fontSize="xl">Welcome to Your Dashboard</Heading>
          <Text>Your User ID: {userId}</Text>
          {/* Add other dashboard components and functionality here */}
          <Button as={Link} to="/eyedisease" colorScheme="blue">
            Predict Disease
          </Button>
          <Button as={Link} to="/history" colorScheme="green">
           Show History
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
