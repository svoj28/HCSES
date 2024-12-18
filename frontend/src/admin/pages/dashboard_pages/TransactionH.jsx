import React, { useState, useEffect, } from 'react'; 
import axios from 'axios';
import { Box, Heading, VStack, Spinner, Table, TableCaption, Thead, Tr, Td, Th, Tbody, HStack, Button } from '@chakra-ui/react';

const TransactionHistory = () => {
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
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentProducts = transactionHistory.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(transactionHistory.length / itemsPerPage);

// Function to handle page change
const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  return (
    <VStack spacing={4}>
              <Heading mb={6}>Transaction History</Heading>
         {loading ? (
           <Spinner size="xl" />
         ) : (
           <>
           
           
             <Table variant="simple">
               <TableCaption>Transaction History</TableCaption>
               <Thead>
                 <Tr>
                   <Th>Order ID</Th>
                   <Th>Package Name</Th>
                   <Th>Price</Th>
                   <Th>Customer Name</Th>
                   <Th>Delivery Date</Th>
                   <Th>Address</Th>
                 </Tr>
               </Thead>
               <Tbody>
                 {currentProducts.map((item) => (
                   <Tr key={item._id}>
                     <Td>{item.orderID}</Td>
                     <Td>{item.name}</Td>
                     <Td>{item.price}</Td>
                     <Td>{item.customer_name}</Td>
                     <Td>{new Date(item.delivery_date).toLocaleDateString()}</Td>
                     <Td>{item.address}</Td>
                   </Tr>
                 ))}
               </Tbody>
             </Table>
    
             {/* Pagination Controls */}
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
           </>
         )}
       </VStack>
  );
};

export default TransactionHistory;
