import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
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
      const response = await axios.get(`http://127.0.0.1:8000/history/${user_id}`, {
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
    <Box bg="#FBFBFB" h="100%" p="20px" display="flex" justifyContent="center" alignItems="center">
      <Box
        p="20"
        borderWidth="2px"
        borderRadius="lg"
        w="100%"
        bg="white"
        color="black"
        boxShadow="0px 10px 50px rgba(0, 0, 0, 0.1)"
        textAlign="center" 
      >
        <Heading mb="8">Prediction History</Heading>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Box>
            {history.length === 0 ? (
              <Text>No predictions available</Text>
            ) : (
              history.map((prediction, index) => (
                <Box key={index} mb="8">
                  <Heading size="md" mb="2">{prediction.date}</Heading>
                  <Image src={`data:image/jpeg;base64,${prediction.image}`} alt="Prediction" mb="4" />
                  <Text>{prediction.disease}</Text>
                  <Text>{prediction.description}</Text>
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default History;
