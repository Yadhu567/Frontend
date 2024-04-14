import { AiOutlineSend } from 'react-icons/ai'; 
import React, { useState } from 'react';
import { Button, Flex, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';

const Message = ({ text, actor }) => {
  return (
    <Flex
      p={3}
      bg={actor === 'user' ? 'green.500' : 'gray.100'}
      color={actor === 'user' ? 'white' : 'gray.600'}
      borderRadius="lg"
      w="fit-content"
      alignSelf={actor === 'user' ? 'flex-end' : 'flex-start'}
    >
      <Text>{text}</Text>
    </Flex>
  );
};

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/chat/', { message: inputValue });
      const responseData = response.data.data;
      setMessages([...messages, { text: inputValue, actor: 'user' }, { text: responseData.response, actor: 'bot' }]);
      setInputValue('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Flex align="center" justify="center" h="80vh">
      <Flex
        flexDirection="column"
        w="2xl"
        h="70vh"
        borderWidth="1px"
        roundedTop="lg"
        roundedBottom="lg" 
        boxShadow="md"
        bg="white"
      >
        <HStack p={2} bg="green.500" justify="center" roundedTop="lg">
          <Heading size="lg" color="white">
            Eye Bot
          </Heading>
        </HStack>

        <Stack
          px={4}
          py={8}
          overflowY="auto"
          maxH="60vh"
          flex={1}
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          {messages.map((message, index) => (
            <Message key={index} text={message.text} actor={message.actor} />
          ))}
        </Stack>

        <HStack p={4} bg="gray.100">
          <Input bg="white" placeholder="Enter your queries" value={inputValue} onChange={handleInputChange} />
          <AiOutlineSend size={24} onClick={sendMessage} style={{ cursor: 'pointer' }} />
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Chatbot;
