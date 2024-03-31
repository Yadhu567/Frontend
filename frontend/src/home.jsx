import React from 'react';
import { Box, HStack, VStack, Text, Button, Image,Flex } from '@chakra-ui/react';
// import retinaimage from "./assets/retinaimage.png";
import eyes from "./assets/eyes.png";
import "./stylesbutton.css";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="#FBFBFB"
      height="90vh" // Set the height to 100% of the viewport height
    >
      <HStack pl="150px " pr="138px">
     
        <VStack display="flex" align="left" spacing={4} style={{ marginTop: '-30px' }} >
        <Text width="500px" fontSize="64px" lineHeight="70px" fontWeight="bold" color="#234046" >
          Detect Early
        <Text as="span" display="block" color="#00ef98" mt="4">
          See Clearly
        </Text>
        </Text>

          <Text  fontSize="16px" lineHeight="25px" color="#234046" style={{ marginTop: '10px' }}>
          See the future of eye care: Detecting diseases through advanced retina image analysis for a healthier vision journey.       </Text>
          <Link style={{ marginTop: '25px' }} to="/signin"><Button class="box__link button-animation" w="150px" h="50px" bg="#00cc94" border="2px solid #00ef98" borderRadius="30px"  variant="ghost" >Try Now</Button></Link>
          
        </VStack>

        {/* Right Side: Image */}
        <Image height="600px" width="800px" src={eyes} alt="Logo" />
        {/* <Image height="370px" width="550px" src={retinaimage} alt="Logo"/> */}

      </HStack>
    </Flex>
  );
}

export default Home;
