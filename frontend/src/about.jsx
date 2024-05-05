import React from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import aboutImage from './assets/about-image.png'; // Add the path to your about image

function AboutPage() {
  return (
    <Box bg="#FBFBFB" p="10" display="flex" flexDirection={{ base: 'column', md: 'row' }} alignItems="center" textAlign="center">
      <Box flex="1" textAlign="justify" pr={{ base: '0', md: '8' }} mb={{ base: '8', md: '0' }}>
        <Heading mb="12" color="#0F342E">Our Mission</Heading>

        <Text color="#0F342E" fontSize="xl" mb="4">
        This is an advanced website for patients, focusing on early disease detection through the analysis of retinal images. 
        Using deep learning models and image processing techniques, the platform provides a user-friendly interface for individuals to assess their eye health proactively.
         The platform detects various eye diseases like glaucoma, cataract, and diabetic retinopathy in real-time. It integrates a chatbot feature for personalized responses to eye health queries.
        </Text>     
      </Box>

      <Box flex="1" textAlign="center">
        <Image src={aboutImage} alt="About Image" mb="8" />
      </Box>
    </Box>
  );
}

export default AboutPage;