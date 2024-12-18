import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading, Text, Stat, StatLabel, StatNumber, StatHelpText, useBreakpointValue, useDisclosure, Tab, Spinner, Tabs, TabList, Table, TableCaption, Thead, Tr, Th, Tbody, Td, VStack, HStack, Button, Badge,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Tag,
 } from '@chakra-ui/react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HomeScreen = () => {
  const numColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  //Variables
  const [transactionHistory, setTransactionHistory] = useState([]);
    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState([]);
    const [accApp, setAcc] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productRankings, setProductRankings] = useState([]);
    const [filteredRankings, setFilteredRankings] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [events, setEvents] = useState([]); 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEventDetails, setSelectedEventDetails] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    
    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = transactionHistory.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(transactionHistory.length / itemsPerPage);
  
  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStockColor = (quantity) => {
    if (quantity <= 15) return 'red';
    if (quantity <= 40) return 'yellow';
    return 'green';
  };

  //For Fetching Dataa
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [transactionsRes, productsRes, cartsRes, accountsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/transactionHistory'),
          axios.get('http://localhost:5000/api/products'),
          axios.get('http://localhost:5000/api/cart'),
          axios.get('http://localhost:5000/api/adminAppr'),
        ]);
  
        // Set transaction history
        const transactionData = transactionsRes.data.data || [];
        setTransactionHistory(transactionData);
  
        // Calculate product rankings
        const productCount = transactionData.reduce((acc, item) => {
          acc[item.name] = (acc[item.name] || 0) + 1;
          return acc;
        }, {});
        const rankedProducts = Object.entries(productCount)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);
  
        setProductRankings(rankedProducts);
        setFilteredRankings(rankedProducts);
  
        // Set products, carts, and accounts
        setProducts(productsRes.data.data || []);
        setCarts(cartsRes.data.data || []);
        setAcc(accountsRes.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAllData();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const eventDetails = events.find(event => event.date.toDateString() === date.toDateString());
    if (eventDetails) {
      setSelectedEventDetails(eventDetails);
      onOpen(); 
    }
  };
  

  return (
    <Box p={4}>
      <Heading mb={6}>Home Dashboard</Heading>
      
      <Grid
        templateColumns={`repeat(${numColumns}, 1fr)`}
        gap={6}
        mb={8}
      >
        {/* Ranking Products Section */}
        <GridItem bg="#FFDEA7" p={4} borderRadius="lg" boxShadow="md">
          {loading ? (
                         <Spinner size="xl" />
                       ) : (
                         <>
                           {/* Sub-tabs for ranking periods */}
                           <Tabs variant="soft-rounded" colorScheme="blue" onChange={(index) => {
                             const periods = ['all', 'monthly', 'yearly'];
                             setSelectedPeriod(periods[index]);
                             filterRankingsByTime(periods[index]);
                           }}>
                             <TabList>
                               <Tab>Show All</Tab>
                               <Tab>Monthly</Tab>
                               <Tab>Yearly</Tab>
                             </TabList>
                           </Tabs>
          
                           <Table variant="simple" mt={4}>
                             <TableCaption>Product Rankings ({selectedPeriod})</TableCaption>
                             <Thead>
                               <Tr>
                                 <Th>Product Name</Th>
                                 <Th>Frequency</Th>
                               </Tr>
                             </Thead>
                             <Tbody>
                               {filteredRankings.map((item, index) => (
                                 <Tr key={index}>
                                   <Td>{item.name}</Td>
                                   <Td>{item.count}</Td>
                                 </Tr>
                               ))}
                             </Tbody>
                           </Table>
                         </>
                       )}
        </GridItem>

        {/* Inventory */}
        <GridItem bg="orange.300" p={4} borderRadius="lg" boxShadow="md" gridColumn="span 2">
          <VStack spacing={4}>
                         {loading ? (
                           <Spinner size="xl" />
                         ) : (
                           <Table variant="simple">
                             <TableCaption>Products in Inventory</TableCaption>
                             <Thead>
                               <Tr>
                                 <Th>Product Name</Th>
                                 <Th>Stock</Th>
                               </Tr>
                             </Thead>
                             <Tbody>
                               {products.map((product) => (
                                 <Tr key={product._id}>
                                   <Td>{product.name}</Td>
                                   <Td>
                                     <Badge colorScheme={getStockColor(product.quantity)}>
                                       {product.quantity}
                                     </Badge>
                                   </Td>
                                 </Tr>
                               ))}
                             </Tbody>
                           </Table>
                          
                         )}
                         <HStack spacing={4} mt={4} justify="center">
             <Button
               isDisabled={currentPage === 1}
               onClick={() => paginate(currentPage - 1)}
             >
               Previous
             </Button>
             <HStack>
               {Array.from({ length: totalPages }, (_, index) => (
                 <Button
                   key={index}
                   onClick={() => paginate(index + 1)}
                   variant={currentPage === index + 1 ? "solid" : "outline"}
                 >
                   {index + 1}
                 </Button>
               ))}
             </HStack>
             <Button
               isDisabled={currentPage === totalPages}
               onClick={() => paginate(currentPage + 1)}
             >
               Next
             </Button>
           </HStack>
          
                       </VStack>
        </GridItem>

        <GridItem bg="orange.100" p={4} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4} color="orange.800">
        Pending Events
      </Heading>
      {carts.length === 0 ? (
        <Text>No pending events available.</Text>
      ) : (
        carts.map((cart, index) => (
          <Box
            key={index}
            bg="white"
            p={4}
            mb={2}
            borderRadius="md"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="orange.200"
          >
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="semibold">
                {cart.name}
              </Text>
              <Tag colorScheme="orange" size="md">
                {new Date(cart.delivery_date).toLocaleDateString()}
              </Tag>
            </Flex>
          </Box>
        ))
      )}
    </GridItem>

        {/* Calendar */}
        <GridItem p={4} borderRadius="lg">
        <VStack spacing={4}>
               <Calendar 
                 onClickDay={handleDateClick} 
                 value={selectedDate} 
               />
               {selectedEventDetails && (
                 <Modal isOpen={isOpen} onClose={onClose}>
                   <ModalOverlay />
                   <ModalContent>
                     <ModalHeader>Event Details</ModalHeader>
                     <ModalCloseButton />
                     <ModalBody>
                       <p>{selectedEventDetails.name}</p>
                       <p>{selectedEventDetails.details}</p>
                     </ModalBody>
                   </ModalContent>
                 </Modal>
               )}
             </VStack>
        </GridItem>

        {/* Need Action */}
        <GridItem p={4} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={2}>Need Actions</Heading>
        </GridItem>
      </Grid>




      {/* Modal to show event details */}
             <Modal isOpen={isOpen} onClose={onClose}>
               <ModalOverlay />
               <ModalContent>
                 <ModalHeader>Event Details</ModalHeader>
                 <ModalCloseButton />
                 <ModalBody>
                   {selectedEventDetails ? (
                     <Box>
                       <p><strong>Event Name:</strong> {selectedEventDetails.name}</p>
                       <p><strong>Details:</strong> {selectedEventDetails.details}</p>
                       <p><strong>Date:</strong> {selectedEventDetails.date.toDateString()}</p>
                     </Box>
                   ) : (
                     <p>No event found for this date.</p>
                   )}
                 </ModalBody>
               </ModalContent>
             </Modal>
    </Box>
  );
};

export default HomeScreen;
