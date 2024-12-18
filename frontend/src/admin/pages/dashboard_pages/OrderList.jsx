import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Spinner, Table, TableCaption, Thead, Tr, Td, Th, Tbody, Tab, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react';

const OrderList = () => {
  // Initialize state variables
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

  // You can use useEffect here if you need to fetch data on component mount
  useEffect(() => {
    // Fetch data or perform side effects here
    setLoading(false); // example of setting loading state after data is fetched
  }, []);

  return (
<VStack spacing={4}>
     {loading ? (
       <Spinner size="xl" />
     ) : (
       <Tabs>
        <Heading mb={6}>Order List</Heading>
         <TabList>
           <Tab>Walkin Orders</Tab>
           <Tab>Online Orders</Tab>
         </TabList>

         <TabPanels>
           <TabPanel>
             <Table variant="simple">
               <TableCaption>Walkin Orders</TableCaption>
               <Thead>
                 <Tr>
                   <Th>Order ID</Th>
                   <Th>Package Name</Th>
                   <Th>Price</Th>
                   <Th>Customer Name</Th>
                   <Th>Delivery Date</Th>
                   <Th>Address</Th>
                   <Th>Additional Info</Th>
                   <Th>Order Status</Th>
                   <Th>Event Status</Th>
                 </Tr>
               </Thead>
               <Tbody>
                 {carts.filter(cart => cart.user_id === "Walkin Customer").map((cart) => (
                   <Tr key={cart._id}>
                     <Td>{cart.orderID}</Td>
                     <Td>{cart.name}</Td>
                     <Td>{cart.price}</Td>
                     <Td>{cart.customer_name}</Td>
                     <Td>{new Date(cart.delivery_date).toLocaleDateString()}</Td>
                     <Td>{cart.address}</Td>
                     <Td>{cart.additional_info}</Td>
                     <Td>{cart.order_status.toUpperCase()}</Td>
                     <Td>{cart.event_status.toUpperCase()}</Td>
                   </Tr>
                 ))}
               </Tbody>
             </Table>
           </TabPanel>

           <TabPanel>
             <Table variant="simple">
               <TableCaption>Online Orders</TableCaption>
               <Thead>
                 <Tr>
                   <Th>Order ID</Th>
                   <Th>Package Name</Th>
                   <Th>Price</Th>
                   <Th>Customer Name</Th>
                   <Th>Delivery Date</Th>
                   <Th>Address</Th>
                   <Th>Additional Info</Th>
                   <Th>Order Status</Th>
                   <Th>Event Status</Th>
                 </Tr>
               </Thead>
               <Tbody>
                 {carts.filter(cart => cart.user_id !== "Walkin Customer").map((cart) => (
                   <Tr key={cart._id}>
                     <Td>{cart.orderID}</Td>
                     <Td>{cart.name}</Td>
                     <Td>{cart.price}</Td>
                     <Td>{cart.customer_name}</Td>
                     <Td>{new Date(cart.delivery_date).toLocaleDateString()}</Td>
                     <Td>{cart.address}</Td>
                     <Td>{cart.additional_info}</Td>
                     <Td>{cart.order_status.toUpperCase()}</Td>
                     <Td>{cart.event_status.toUpperCase()}</Td>
                   </Tr>
                 ))}
               </Tbody>
             </Table>
           </TabPanel>
         </TabPanels>
       </Tabs>
     )}
   </VStack>
  );
};

export default OrderList;
