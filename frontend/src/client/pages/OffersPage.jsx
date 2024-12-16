import { Grid, Box, Heading, Divider } from '@chakra-ui/react';
import React from 'react';

const OffersPage = () => {
    return (
        <Box bg="white" minHeight="100vh" p={8} >
            <Heading fontSize="2xl" fontWeight="bold" color="#6b3f00" mb={6} pt={140} mx={40}>Special Offers</Heading>
            <Divider borderColor="gray.400" borderWidth="2px" mx={40} width="100" />
            <Grid
                templateColumns="repeat(4, 1fr)"
                gap={4}
                mb={12}
                mx={40}
                mt={10}
            >
                {/* Special Offer Placeholder */}
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
            </Grid>

            <Heading fontSize="2xl" fontWeight="bold" color="#6b3f00" mb={6} mx={40}>Most Popular</Heading>
            <Divider borderColor="gray.400" borderWidth="2px" mx={40} width="100" />
            <Grid
                templateColumns="repeat(4, 1fr)"
                gap={4}
                mb={12}
                mx={40}
                mt={10}
            >
                           
                {/* Most Popular Placeholder */}
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
            </Grid>
            <Heading fontSize="2xl" fontWeight="bold" color="#6b3f00" mb={6} mx={40}>Categories</Heading>
            <Divider borderColor="gray.400" borderWidth="2px" mx={40} width="100" />
            <Grid
                templateColumns="repeat(4, 1fr)"
                gap={4}
                mb={12}
                mx={40}
                mt={10}
            >  
                {/* Categories Placeholder */}
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
                <Box bg="#d1d3d1" height="200px" borderRadius="md" boxShadow="md" />
            </Grid>
        </Box>
    );
};

export default OffersPage;
