import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      const userIdCopy = user_id;
      localStorage.setItem('user_id', userIdCopy);
      const response = await axios.post('http://127.0.0.1:3000/history/', { user_id }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        setHistory(response.data.prediction_history);
      } else {
        console.error('Error:', response.statusText);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <Box bg="#FBFBFB" h="100%" p="20px">
      <Heading textAlign="center" mb="8" color="green.500">Prediction History</Heading>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Box>
          {history.length === 0 ? (
            <Text>No prediction history available!</Text>
          ) : (
            history.map((prediction, index) => (
              <Box key={index} mb="8" boxShadow="md" p="4" borderRadius="md" width="800px">
                <Heading size="md" mb="2">{prediction.date}</Heading>
                <Flex justifyContent="center" alignItems="center">
                  <Image src={`data:image/jpeg;base64,${prediction.image}`} alt="Prediction" maxW="200px" maxH="200px" />
                </Flex>
                <Text mt="2">Disease: {prediction.disease}</Text>
                <Text mt="2">Description: {prediction.description}</Text>
              </Box>
            ))
          )}
        </Box>
      )}
    </Box>
  );
}

export default History;
