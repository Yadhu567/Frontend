import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button, Input, Box, Text, Flex, Heading, VStack, FormControl, FormLabel, Center, HStack, Stack, Card, CardBody, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('user_id', response.user.uid);
      navigate('/dashboard');
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        displayErrorMessage('Invalid email or password');
      } else {
        displayErrorMessage('Error signing in.');
      }
    }
  };

  const displayErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  return (
    <Flex align="center" justify="center" minH="70vh">
      <Box width="400px" p="9" borderRadius="xl" boxShadow="md" bg="white">
        <Center>
          <VStack spacing="4">
            <Heading fontSize="xl">Sign in to Your Account</Heading>
            <Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='130%'>
              <CardBody>
                <form onSubmit={handleAuth}>
                  <Stack spacing='4'>
                    <FormControl>
                      <FormLabel size='sm'>Email</FormLabel>
                      <Input
                        type='email'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <HStack justify='space-between'>
                        <FormLabel size='sm'>Password</FormLabel>
                        <Button
                          as={Link}
                          to="/reset"
                          variant='link'
                          size='xs'
                          color='#0969da'
                          fontWeight='500'
                        >
                          Forgot password?
                        </Button>
                      </HStack>
                      <InputGroup size='sm'>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          bg='white'
                          borderColor='#d8dee4'
                          borderRadius='6px'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <InputRightElement>
                          <IconButton
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            variant="ghost"
                            onClick={() => setShowPassword(!showPassword)}
                            icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <Button
                      bg='#2da44e'
                      color='white'
                      size='sm'
                      _hover={{ bg: '#2c974b' }}
                      _active={{ bg: '#298e46' }}
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Stack>
                </form>
              </CardBody>
            </Card>
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          </VStack>
        </Center>
        <Center mt="4">
            <Text>New to Here?</Text>
            <Link to="/signup">
              <Button colorScheme="green" variant="link">Create an account</Button>
            </Link>
        </Center>
      </Box>
    </Flex>
  );
};

export default Signin;
