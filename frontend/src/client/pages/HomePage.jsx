import React from 'react';
import { Box, Heading, Text, VStack, Image, Grid, GridItem, Button } from '@chakra-ui/react';
import bannerImage from '../../assets/images/Homepage/Header.png'; // Replace with the correct path to your image file
import EventStyling from '../../assets/images/Homepage/Event Styling.png'
import CateringServices from '../../assets/images/Homepage/Catering Services.png'

const HomePage = () => {
  return (
    <Box bg="gray.50" minH="100vh" pt={140}>
      {/* Banner Image */}
      <Image
        src={bannerImage} 
        alt="Banner"
        width="100vw" 
        height="300px" 
        objectFit="cover" 
        m={0} 
        p={0}
        
      />

      {/* Our Service Section */}
      <Box py={8} textAlign="center">
        <Heading as="h1" size="xl" color="#451805" mb={6}>
          Our Service
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} px={6} mx={40}>
          <GridItem>
            <Box position="relative" overflow="hidden" borderRadius="md" >
              <Image
                src={CateringServices} // Replace with the actual image path
                alt="Catering Service"
                width="100%"
                height="auto"
                objectFit="cover"
              />
            </Box>
          </GridItem>
          <GridItem>
            <Box position="relative" overflow="hidden" borderRadius="md">
              <Image
                src={EventStyling}// Replace with the actual image path
                alt="Event Styling"
                width="100%"
                height="auto"
                objectFit="cover"
              />
            </Box>
          </GridItem>
        </Grid>
      </Box>

      {/* About Us Section */}
      <Box bg="#FFA726" py={6} px={6} textAlign="left" mx={40} borderRadius="md">
        <Heading as="h2" size="lg" color="white" mb={4}>
          About Us
        </Heading>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} px={6} mx={40}>
        <GridItem>
          <Box 
            height="100%" /* Adjust height as needed */
            placeItems="center" 
            py={10} /* Adds vertical padding inside the Box */
            mx={20}
          >
            <Text color="black" fontSize="md" my={4}> {/* Adds margin on top and bottom */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu hendrerit ligula. Suspendisse eget orci vitae nulla viverra cursus et eget eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </Text> 
          </Box>
        </GridItem>
        <GridItem>
          <Box 
            position="relative" 
            overflow="hidden" 
            borderRadius="md"
            my={4} /* Adds margin on top and bottom for the image */
          >
            <Image
              src={EventStyling} // Replace with the actual image path
              alt="Event Styling"
              width="100%"
              height="auto"
              objectFit="cover"
              borderRadius="md" /* Ensures consistent styling */
              my={4} /* Adds margin on top and bottom */
            />
          </Box>
        </GridItem>
      </Grid>

      {/* Areas We Serve Section */}
      <Box py={6} px={6} textAlign="left" borderTop="1px solid #ddd" mx={40}>
        <Heading as="h2" size="lg" color="#451805" mb={4}>
          Which Areas do we Serve?
        </Heading>
        <Text color="gray.700" fontSize="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu hendrerit ligula. Suspendisse eget orci vitae nulla viverra cursus et eget eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </Text>
      </Box>

      {/* Other Services Section */}
      <Box py={6} px={6} textAlign="left" borderTop="1px solid #ddd" mx={40}>
        <Heading as="h2" size="lg" color="#451805" mb={4}>
          Other Services
        </Heading>
        <Box bg="gray.300" width="100%" height="150px" borderRadius="md"></Box>
      </Box>

      {/* Footer */}
      <Box bg="#C84F04" color="white" py={6} textAlign="center" mt={10}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} px={6} mx={40}>
        <GridItem textAlign={'left'}>
        <Text fontSize="sm">Harvest Catering Services & Event Styling</Text>
        <Text fontSize="sm">Mendez, Cavite</Text>
        <Text fontSize="sm">Contact Number: 0938 351 2878</Text>
        <Text fontSize="sm">Email: ralphbrianm@gmail.com</Text>
        </GridItem>

        <GridItem
        placeItems={"bottom"}>
        <Text fontSize="sm">Copyright &copy;{new Date().getFullYear()}</Text>
        </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
