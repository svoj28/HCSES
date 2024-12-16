import { Grid, Box, Heading, Divider, Button, VStack, Image, Text } from '@chakra-ui/react';
import Basic from "../../assets/images/Packages/Basic.png"
import Silver from "../../assets/images/Packages/Silver.png"
import Gold from "../../assets/images/Packages/Gold.png"
import Platinum from "../../assets/images/Packages/Platinum.png"
import React from 'react';

const OffersPage = () => {
    return (
        <Box bg="white" minHeight="100vh" p={8} >
            <Heading fontSize="2xl" fontWeight="bold" color="#6b3f00" mb={6} pt={140} mx={40}>Available Packages</Heading>
            <Divider borderColor="gray.400" borderWidth="2px" mx={40} width="100" />
            <Grid
    templateColumns="repeat(2, 1fr)"
    gap={4}
    mb={12}
    mx={40}
    mt={10}
>
   {/* First Box with Image and Button Below */}
<Box borderRadius="md" boxShadow="md" overflow="hidden">
    {/* Image */}
    <Image 
        src={Basic}
        alt="Box Image" 
        objectFit="cover" 
        width="100%" 
        height="auto"
    />
    
    {/* Button Below Image */}
    <VStack spacing={2} align="center" p={2}>
        <Button colorScheme="orange" size="sm">
            Order Now!
        </Button>
    </VStack>
</Box>
    
    {/* For Description */}
    <Box>
        <Heading>Basic Package</Heading>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu hendrerit ligula. Suspendisse eget orci vitae nulla viverra cursus et eget eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</Text>
    </Box>
</Grid>


            <Divider borderColor="gray.400" borderWidth="2px" mx={40} width="100" />
            <Grid
                templateColumns="repeat(2, 1fr)"
                gap={4}
                mb={12}
                mx={40}
                mt={10}
            >
                
                   {/* First Box with Image and Button Below */}
<Box borderRadius="md" boxShadow="md" overflow="hidden">
    {/* Image */}
    <Image 
        src={Silver}
        alt="Box Image" 
        objectFit="cover" 
        width="100%" 
        height="auto"
    />
    
    {/* Button Below Image */}
    <VStack spacing={2} align="center" p={2}>
        <Button colorScheme="orange" size="sm">
            Order Now!
        </Button>
    </VStack>
</Box>
    
    {/* For Description */}
    <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />


            </Grid>
            <Divider borderColor="gray.400" borderWidth="2px" mx={40} width="100" />
            <Grid
                templateColumns="repeat(2, 1fr)"
                gap={4}
                mb={12}
                mx={40}
                mt={10}
            >  
                   {/* First Box with Image and Button Below */}
<Box borderRadius="md" boxShadow="md" overflow="hidden">
    {/* Image */}
    <Image 
        src={Gold}
        alt="Box Image" 
        objectFit="cover" 
        width="100%" 
        height="auto"
    />
    
    {/* Button Below Image */}
    <VStack spacing={2} align="center" p={2}>
        <Button colorScheme="orange" size="sm">
            Order Now!
        </Button>
    </VStack>
</Box>
    
    {/* For Description */}
    <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
            </Grid>

            <Grid
                templateColumns="repeat(2, 1fr)"
                gap={4}
                mb={12}
                mx={40}
                mt={10}
            >  
                {/* Categories Placeholder */}
                   {/* First Box with Image and Button Below */}
<Box borderRadius="md" boxShadow="md" overflow="hidden">
    {/* Image */}
    <Image 
        src={Platinum}
        alt="Box Image" 
        objectFit="cover" 
        width="100%" 
        height="auto"
    />
    
    {/* Button Below Image */}
    <VStack spacing={2} align="center" p={2}>
        <Button colorScheme="orange" size="sm">
            Order Now!
        </Button>
    </VStack>
</Box>
    
    {/* For Description */}
    <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
            </Grid>
        </Box>
    );
};

export default OffersPage;
