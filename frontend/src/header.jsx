import React, { useState } from 'react';
import { Box, Flex, Spacer, IconButton, useColorMode, Button, HStack, Image, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './assets/logo.jpg';

const Header = () => {
  // Add state for menu or any other functionality if needed

  return (
    <Flex w="100%"  bg="#FBFBFB" >
      <HStack w="100%" display="flex" justify-content="space-between" p="0px 30px" pt="20px" spacing={'5px'}>
        <HStack>
            <Link to="/"><Image src={Logo} alt="Logo" boxSize="60px"  /></Link>
            <Link to="/"><Text fontSize="24px" fontWeight="bold" color="#0F342E" mr="20px">
            RETINAMED PROGNOSIS
            </Text></Link>
        </HStack>
        <HStack spacing={4} ml="auto">
            <Link to="/"><Button colorScheme="teal" color="black" variant="ghost" _hover={{ bg: "#00cc94" }}>Home</Button></Link>
            <Link to="/about"><Button colorScheme="teal" color="black" variant="ghost" _hover={{ bg: "#00cc94" }}>About</Button></Link>
          
            <Link to="/signin"> <Button class="box__link button-animation" bg="#00cc94" border="2px solid #00ef98" borderRadius="20px"  variant="ghost" >Try Now</Button></Link>
           
        </HStack>
      </HStack>
      <Spacer />
      <HStack spacing={4}>
        
      </HStack>
    </Flex>


   
  );
};

export default Header;
