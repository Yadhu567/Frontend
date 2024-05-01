import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Box, Text, Flex, Heading, VStack, FormControl, FormLabel, Center, Stack, Card, CardBody, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { auth, firestore  } from "./firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, name, age } = data;
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      await sendEmailVerification(user);
      await setDoc(doc(firestore, "users", user.uid),{
        name,
        age,
        email,
      });
      navigate("/signin");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        displayErrorMessage('email already exists.');
      } else {
        displayErrorMessage('Error creating user.');
      }
    }
  };

  const displayErrorMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  return (
    <Flex align="center" justify="center" minH="100vh">
      <Box width="400px" p="9" borderRadius="xl" boxShadow="lg" bg="white">
        <Center>
          <VStack spacing="4">
            <Heading fontSize="xl">Create an Account</Heading>
            <Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='130%'>
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <Stack spacing='4'>
                    <FormControl>
                      <FormLabel size='sm'>Name</FormLabel>
                      <Input
                        type='text'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={handleChange}
                        value={data.name}
                        name="name"
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size='sm'>Age</FormLabel>
                      <Input
                        type='number'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={handleChange}
                        value={data.age}
                        name="age"
                        min="1"
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size='sm'>Email</FormLabel>
                      <Input
                        type='email'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={handleChange}
                        value={data.email}
                        name="email"
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size='sm'>Password</FormLabel>
                      <InputGroup size='sm'>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          bg='white'
                          borderColor='#d8dee4'
                          size='sm'
                          borderRadius='6px'
                          onChange={handleChange}
                          value={data.password}
                          name="password"
                          required
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                          title="Password must contain at least one number, one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long."
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
                      Sign Up
                    </Button>
                  </Stack>
                </form>
              </CardBody>
            </Card>
            {error && <Text color="red.500" mt="2">{error}</Text>}
          </VStack>
        </Center>
        <Center mt="4">
          <Text>Already have an account?</Text>
          <Link to="/signin">
            <Button colorScheme="green" variant="link">Sign In</Button>
          </Link>
        </Center>
      </Box>
    </Flex>
  );
};

export default Signup;
