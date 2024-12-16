import React, { useState, useEffect } from 'react';
import { Container, VStack, Text, SimpleGrid, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Box, Image, Badge, Button } from "@chakra-ui/react";
import axios from 'axios'; 
import ProductCard from './ProductCard';
import { useProductStore } from '../../store/product';
import useJWTDecoder from '../../hooks/useJWTDecoder';


// Orders Component to fetch and display orders
const Orders = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jwtDecode = useJWTDecoder();
  useEffect(() => {
    const fetchCarts = async () => {
      setLoading(true);
      setError('');
  
      try {
        // Get user data from localStorage
        console.log("Fetching user data from localStorage...");
        const dataString = localStorage.getItem('user');
        if (!dataString) throw new Error('No data found in local storage');
  
        const userData = JSON.parse(dataString);
        console.log("Parsed user data:", userData);
  
        // Ensure the user object exists in the saved data
        if (!userData?.user?._id) {
          throw new Error('Invalid user data found in local storage');
        }
  
        const userId = userData.user._id;
        console.log("User ID from localStorage:", userId);
  
        // Fetch carts from API
        console.log("Fetching carts...");
        const response = await axios.get('http://localhost:5000/api/cart');
  
        // Ensure that response.data contains the expected structure
        if (!response.data || !response.data.data) {
          throw new Error('Unexpected response format from API');
        }
  
        const cartsData = response.data.data; 
        console.log("Received data:", cartsData);
  
        // Log all cart items for debugging
        console.log("Cart items:");
        cartsData.forEach((cart, index) => {
          console.log(`Cart ${index + 1}:`);
          console.log("  _id:", cart._id || "undefined");
          console.log("  User ID:", cart.user_id || "undefined");
          console.log("  Other cart details:", Object.keys(cart).join(", "));
        });
  
        // Filter carts for the user
        const userCarts = cartsData.filter(cart => 
          cart.user_id && cart.user_id.toLowerCase() === userId.toLowerCase()
        );
  
        console.log(`Found ${userCarts.length} matching carts for this user`);
  
        setCarts(userCarts); 
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
        setError(errorMessage);
        console.error('Error fetching carts:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCarts();
  }, []);

  // Loading spinner and error handling
  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500" fontSize="lg" textAlign="center">{error}</Text>;
  }

  return (
    <VStack spacing={8} align="stretch">
      <Text
        fontSize="30"
        fontWeight="bold"
        bgGradient="linear(to-r, cyan.400, blue.500)"
        bgClip="text"
        textAlign="center"
      >
        Orders
      </Text>

      {/* Rendering the carts data */}
      {carts.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }} 
          spacing={10}
          w="full"
        >
          {carts.map((cart) => (
            <Box key={cart._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
              <Image 
                src={cart.image} 
                alt={cart.name} 
                boxSize="200px" 
                objectFit="cover" 
                mb={4} 
              />
              <Text fontWeight="bold" fontSize="lg">{cart.name}</Text>
              <Text fontSize="sm" color="gray.500">{cart.orderID}</Text>
              <Text fontSize="md" fontWeight="semibold">${cart.price}</Text>
              <Badge colorScheme="blue" mt={2}>{cart.status}</Badge> 
              <Button colorScheme="blue" mt={4} w="full">
                View Details
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
          No Orders Found
        </Text>
      )}
    </VStack>
  );
};

// ClientStore Component to manage both Store and Orders tabs
const ClientStore = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Store</Tab>
          <Tab>Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={8}>
              <Text
                fontSize={"30"}
                fontWeight={"bold"}
                bgGradient={"linear(to-r, cyan.400, blue.500)"}
                bgClip={"text"}
                textAlign={"center"}
              >
                S T O R E
              </Text>

              <SimpleGrid
                columns={{
                  base: 1,
                  md: 2,
                  lg: 3,
                }}
                spacing={10}
                w={"full"}
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </SimpleGrid>

              {products.length === 0 && (
                <Text fontSize="xl" textAlign={"center"} fontWeight="bold" color="gray.500">
                  No Products Found
                </Text>
              )}
            </VStack>
          </TabPanel>
          <TabPanel>
            <Orders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default ClientStore;
