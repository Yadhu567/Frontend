import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text, VStack, Box, Flex, Heading, HStack, Image, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import axios from 'axios';
import predictDiseaseImage from "./assets/predictDiseaseImage.png";
import showHistoryImage from "./assets/showHistoryImage.png";
import chatbotImage from "./assets/chatbotImage.png";
import { Avatar } from '@chakra-ui/react';

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
      axios.post('http://127.0.0.1:3000/dashboard/', { user_id: userIdFromStorage })
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
      <Box width="1200px" height="548px" p="3" borderRadius="xl" boxShadow="md" bg="white" position="relative">
        {/* Flex container for the header and logout button */}
        <Box boxShadow="md" bg="#e1f7ee" py="2" borderRadius="10px" paddingRight="20px" paddingLeft="20px" paddingBottom="1px" paddingTop="12px">
          <Flex justify="space-between" align="center" mb="4">
            {/* Avatar with popover */}
            <Popover>
              <PopoverTrigger>
                <Avatar bg='teal.500' />
              </PopoverTrigger>
              <PopoverContent bg="teal.50" color="teal.900" borderColor="teal.500">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader fontWeight="bold">User Info</PopoverHeader>
                <PopoverBody>
                  {userData && (
                    <VStack align="start">
                      <Text fontSize="md">Name: {userData.name}</Text>
                      <Text fontSize="md">Age: {userData.age}</Text>
                      <Text fontSize="md">Email: {userData.email}</Text>
                    </VStack>
                  )}
                </PopoverBody>
              </PopoverContent>
            </Popover>
            {/* Display user's name in heading */}
            <Heading fontSize="3xl" color="teal">
              {userData && <Text>{userData.name}</Text>}
            </Heading>
            {/* Logout button */}
            <Button as={Link} to="/" colorScheme="red">
              Logout
            </Button>
          </Flex>
        </Box>

        <HStack spacing="4" justifyContent="center" paddingTop="15px " paddingLeft="12px ">
          {/* Display eye health risk and status if available */}
          {eyeHealthRisk !== null && eyeHealthStatus !== null && (
            <>
              <Text fontWeight="bold" color="teal.500">Eye Health Risk:</Text>
              <Text fontWeight="bold">{eyeHealthRisk}</Text>
              <Text fontWeight="bold" color="teal.500">Eye Health Status:</Text>
              <Text fontWeight="bold">{eyeHealthStatus}</Text>
            </>
          )}
        </HStack>

        <HStack spacing="78">
          {/* Predict Disease image with button */}
          <Box>
            <Image src={predictDiseaseImage} alt="Predict Disease" />
            <Button as={Link} to="/eyedisease" colorScheme="teal"  left="23%" _hover={{ bg: "#00cc94" }}>
              Predict Disease
            </Button>
          </Box>

          {/* Show History image with button */}
          <Box>
            <Image src={showHistoryImage} alt="Show History" />
            <Button as={Link} to="/history" colorScheme="teal" left="33%" _hover={{ bg: "#00cc94" }}>
              Show History
            </Button>
          </Box>

          {/* Chatbot image with button */}
          <Box>
            <Image src={chatbotImage} alt="Chatbot"  />
            <Button as={Link} to="/chatbot" colorScheme="teal"  left="35%" _hover={{ bg: "#00cc94" }}>
              Chatbot
            </Button>
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Dashboard;
