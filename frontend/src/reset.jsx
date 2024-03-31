import React, { useState } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Text, Flex, Box, FormControl, Heading, FormLabel, Center, VStack, Stack, Card, CardBody } from "@chakra-ui/react";
import { sendPasswordResetEmail} from 'firebase/auth';

const Reset = () => {
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Password reset email sent. Check your inbox.');
      setResetEmail('');
      navigate('/signin');
    } catch (error) {
      displayErrorMessage('Error In Resetting Password');
    }
  };

  const displayErrorMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  return (
    <Flex align="center" justify="center" minH="60vh">
      <Box width="400px" p="9" borderRadius="xl" boxShadow="md" bg="white">
        <Center>
          <VStack spacing="4">
            <Heading fontSize="3xl" mb="4">Reset Password</Heading>
            <Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='150%'>
              <CardBody>
                <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
                  <Stack spacing='4'>
                    <FormControl>
                      <FormLabel size='sm'>Email</FormLabel>
                      <Input
                        placeholder="Email"
                        type='email'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={(e) => setResetEmail(e.target.value)}
                        value={resetEmail}
                        required
                      />
                    </FormControl>

                    <Button
                      bg='#2da44e'
                      color='white'
                      size='sm'
                      _hover={{ bg: '#2c974b' }}
                      _active={{ bg: '#298e46' }}
                      type="submit"
                    >
                      Reset Password
                    </Button>
                  </Stack>
                </form>
              </CardBody>
            </Card>
            {error && <Text color="red.500" mb="4">{error}</Text>}
          </VStack>
        </Center>
      </Box>
    </Flex>
  );
};

export default Reset;
