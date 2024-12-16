import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Input,
  Heading,
  HStack,
  Box,
  Tab,
  Tabs,
  Text,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  VStack,
  Badge,
  Spinner,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary.jsx';
import { useCartsStore } from '../../store/walkinOrders.js';
import { useProductStore } from '../../store/product.js';




const Dashboard = () => {
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



  const toast = useToast();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    quantity: "",
  })

  const {createProduct} = useProductStore()
  const handleAddProduct = async() => {
    const {success,message} = await createProduct(newProduct)
    if(!success){
      toast({
        title:"Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } else{
      toast({
        title:"Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true
      });
    }
    setNewProduct({ 
      name: "", 
      price: "", 
      image: "",     
      description: "",
      quantity: "",
    })
  }
  const { createWalkinOrder } = useCartsStore();
  const [newCarts, setNewCarts] = useState({
      name: "",
      price: "",
      customer_name: "",
      delivery_date: "",
      address: "",
      contact_number: "",
      additional_info: "",
  });
  
  const handleAddWalkinOrders = async () => {
      const { success, message } = await createWalkinOrder(newCarts);
      if (!success) {
          toast({
              title: "Error",
              description: message,
              status: "error",
              duration: 5000,
              isClosable: true,
          });
      } else {
          toast({
              title: "Success",
              description: message,
              status: "success",
              duration: 5000,
              isClosable: true,
          });
      }
      setNewCarts({
          name: "",
          price: "",
          customer_name: "",
          delivery_date: "",
          address: "",
          contact_number: "",
          additional_info: "",
      });
  };


  
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
    // Populate events based on transaction history
    const eventData = transactionHistory.map(item => ({
      date: new Date(item.delivery_date),
      name: item.name,
      details: item.details,
    }));
    setEvents(eventData);
  }, [transactionHistory]);

  const filterRankingsByTime = (period) => {
    let filtered = [];
    if (period === 'monthly') {
      filtered = transactionHistory.filter(item => {
        const transactionDate = new Date(item.delivery_date);
        const currentMonth = new Date().getMonth();
        return transactionDate.getMonth() === currentMonth;
      });
    } else if (period === 'yearly') {
      filtered = transactionHistory.filter(item => {
        const transactionDate = new Date(item.delivery_date);
        const currentYear = new Date().getFullYear();
        return transactionDate.getFullYear() === currentYear;
      });
    } else {
      filtered = transactionHistory;
    }

    const productCount = filtered.reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + 1;
      return acc;
    }, {});

    const rankedProducts = Object.entries(productCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    setFilteredRankings(rankedProducts);
  };

  const getStockColor = (quantity) => {
    if (quantity <= 15) return 'red';
    if (quantity <= 40) return 'yellow';
    return 'green';
  };

  const handleApprove = async (_id) => {
    if (window.confirm("Are you sure you want to approve this order?")) {
      try {
        const response = await axios.put(`http://localhost:5000/api/cart/approve/${_id}`);
        setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart._id === _id ? { ...cart, order_status: 'approved' } : cart
          )
        );
        toast({
          title: "Order approved",
          description: response.data.message,
          status: "success",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error approving the order:", error);
        toast({
          title: "Error",
          description: "Unable to approve the order.",
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  const handleDisapprove = async (_id) => {
    if (window.confirm("Are you sure you want to disapprove and delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cart/disapprove/${_id}`);
        toast({
          title: "Order disapproved",
          description: "Order has been deleted.",
          status: "success",
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Unable to delete the order.",
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  const handleEventStatusChange = async (_id, status) => {
    if (window.confirm(`Are you sure you want to mark this event as ${status}?`)) {
      try {
        const response = await axios.put(`http://localhost:5000/api/cart/update-event-status/${_id}`, {
          status: status,
        });
        setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart._id === _id ? { ...cart, event_status: status } : cart
          )
        );
        toast({
          title: "Event Status Updated",
          description: `The event has been marked as ${status}.`,
          status: "success",
          duration: 3000,
        });
      } catch (error) {
        console.error(`Error updating event status to ${status}:`, error);
        toast({
          title: "Error",
          description: "Unable to update the event status.",
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  const handleCancel = async (_id) => {
    if (window.confirm("Are you sure you want to approve this cancellation?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cart/disapprove/${_id}`);
        toast({
          title: "Order Canceled",
          description: "Order has been canceled.",
          status: "success",
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Unable to delete the order.",
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const eventDetails = events.find(event => event.date.toDateString() === date.toDateString());
    if (eventDetails) {
      setSelectedEventDetails(eventDetails);
      onOpen(); 
    }
  };







  // Handler to approve the document
  const handleAccApprove = async (_id) => {
    if (window.confirm("Are you sure you want to approve this document?")) {
        try {
            const response = await axios.put(`http://localhost:5000/api/adminAppr/approve/${_id}`);
            
            setAcc((prevAcc) =>
                prevAcc.filter((acc) => acc._id !== _id)
            );

            // Show success notification
            toast({
                title: "Success",
                description: response.data.message,
                status: "success",
                duration: 3000,
            });
        } catch (error) {
            console.error("Error approving the document:", error);

            // Show error notification
            toast({
                title: "Error",
                description: "Unable to approve the document.",
                status: "error",
                duration: 3000,
            });
        }
    }
};


// Handler to disapprove the document
const handleAccDisapprove = async (_id) => {
  if (window.confirm("Are you sure you want to disapprove and delete this document?")) {
    try {
      await axios.delete(`http://localhost:5000/api/adminAppr/${_id}`);
      setAcc((prevAcc) => prevAcc.filter((acc) => acc._id !== _id));
      toast({
        title: "Document disapproved",
        description: "Document has been deleted.",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to delete the document.",
        status: "error",
        duration: 3000,
      });
    }
  }
};




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };


   return (
     <Box p={5}>
       <Tabs variant="enclosed">
         <TabList>
           <Tab>Inventory</Tab>
           <Tab>Transaction History</Tab>
           <Tab>Product Ranking</Tab>
           <Tab>Approval Tab</Tab>
           <Tab>Event Tracking</Tab>
           <Tab>Order List</Tab>
           <Tab>Custom Package or Walk in Orders</Tab>
           <Tab>Create Package</Tab>
         </TabList>

{/* Inventory Tab */}
         <TabPanels>
            Inventory Tab 
           <TabPanel>
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
           </TabPanel>

           
           
           {/* Transaction History Tab */}
           <TabPanel>
   <VStack spacing={4}>
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
 </TabPanel>

 {/* Product Ranking Tab */}
 <TabPanel>
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
           </TabPanel>


                 {/* Approval Tab */}
           <TabPanel>
   <Tabs variant="soft-rounded" colorScheme="blue">
     <TabList>
       <Tab>Approval</Tab>
       <Tab>Cancellation</Tab>
       <Tab>Event Tracking</Tab>
       <Tab>Admin Account</Tab>
     </TabList>

     <TabPanels>
       {/* Approval Tab */}
        <TabPanel>
         <VStack spacing={4}>
           {loading ? (
             <Spinner size="xl" />
           ) : (
             <>
               {carts.map((cart) => {
                 const order = transactionHistory.find((order) => order.customer_name === cart.customer_name);
                
                 return (
                   <Table variant="simple" key={cart._id} mt={4}>
                     <Thead>
                       <Tr>
                         <Th>Product Name</Th>
                         <Th>Price</Th>
                         <Th>Customer Name</Th>
                         <Th>Order ID</Th>
                         <Th>Approve</Th>
                         <Th>Disapprove</Th>
                       </Tr>
                     </Thead>
                     <Tbody>
                       <Tr key={cart._id}>
                         <Td>{cart.name}</Td>
                         <Td>{cart.price}</Td>
                         <Td>{cart.customer_name}</Td>
                         <Td>{order ? order.orderID : 'No Order ID'}</Td>
                         <Td>
                           {cart && (
                             <Button colorScheme="green" onClick={() => handleApprove(cart._id)}>
                               Approve
                             </Button>
                           )}
                         </Td>
                         <Td>
                           {cart && (
                             <Button colorScheme="red" onClick={() => handleDisapprove(cart._id)}>
                               Disapprove
                             </Button>
                           )}
                         </Td>
                       </Tr>
                     </Tbody>
                   </Table>
                 );
               })}
             </>
           )}
         </VStack>
       </TabPanel>

       {/* Cancellation Tab */}
        <TabPanel>
         <VStack spacing={4}>
           {loading ? (
             <Spinner size="xl" />
           ) : (
             <>
               {carts.map((cart) => (
                 <Table variant="simple" key={cart._id} mt={4}>
                   <Thead>
                     <Tr>
                       <Th>Product Name</Th>
                       <Th>Price</Th>
                       <Th>Customer Name</Th>
                       <Th>Order ID</Th>
                       <Th>Cancel</Th>
                     </Tr>
                   </Thead>
                   <Tbody>
                     <Tr key={cart._id}>
                       <Td>{cart.name}</Td>
                       <Td>{cart.price}</Td>
                       <Td>{cart.customer_name}</Td>
                       <Td>{cart.orderID}</Td>
                       <Td>
                         {cart && (
                           <Button colorScheme="orange" onClick={() => handleCancel(cart._id)}>
                             Approve Cancellation
                           </Button>
                         )}
                       </Td>
                     </Tr>
                   </Tbody>
                 </Table>
               ))}
             </>
           )}
         </VStack>
       </TabPanel> 

 {/* Event Tracking Tab */}
  <TabPanel>
   <VStack spacing={4}>
     {loading ? (
       <Spinner size="xl" />
     ) : (
       <>
         
         {carts.map((cart) => (
           <Table variant="simple" key={cart._id} mt={4}>
             <Thead>
               <Tr>
                 <Th>Product Name</Th>
                 <Th>Price</Th>
                 <Th>Customer Name</Th>
                 <Th>Order ID</Th>
                 <Th>Track Event</Th>
               </Tr>
             </Thead>
             <Tbody>
               <Tr key={cart._id}>
                 <Td>{cart.name}</Td>
                 <Td>{cart.price}</Td>
                 <Td>{cart.customer_name}</Td>
                 <Td>{cart.orderID}</Td>
                 <Td>
                   {cart && (
                     <>
                       <Button 
                         colorScheme="blue" 
                         onClick={() => handleEventStatusChange(cart._id, 'upcoming')} 
                         mr={2}
                       >
                         Upcoming
                       </Button>
                       <Button 
                         colorScheme="yellow" 
                         onClick={() => handleEventStatusChange(cart._id, 'ongoing')} 
                         mr={2}
                       >
                         Ongoing
                       </Button>
                       <Button 
                         colorScheme="green" 
                         onClick={() => handleEventStatusChange(cart._id, 'completed')} 
                         mr={2}
                       >
                         Completed
                       </Button>
                     </>
                   )}
                 </Td>
               </Tr>
             </Tbody>
           </Table>
         ))}
       </>
     )}
   </VStack>
 </TabPanel> 

 {/* Admin Account Tab */}
  <ErrorBoundary fallback={<p></p>}>
       <TabPanel>
         <VStack spacing={4}>
           {loading ? (
             <Spinner size="xl" />
           ) : accApp && accApp.length === 0 ? (
             <Text>No accounts to approve</Text>
           ) : (
             <Table variant="simple">
               <TableCaption>Admin Account Approvals</TableCaption>
               <Thead>
                 <Tr>
                   <Th>Email</Th>
                   <Th>Role</Th>
                   <Th>Approve</Th>
                   <Th>Disapprove</Th>
                 </Tr>
               </Thead>
               <Tbody>
                 {accApp?.map((acc) => (
                   <Tr key={acc._id}>
                     <Td>{acc.email}</Td>
                     <Td>{acc.role}</Td>
                     <Td>
                       <Button colorScheme="green" onClick={() => handleAccApprove(acc._id)}>
                         Approve
                       </Button>
                     </Td>
                     <Td>
                       <Button colorScheme="red" onClick={() => handleAccDisapprove(acc._id)}>
                         Disapprove
                       </Button>
                     </Td>
                   </Tr>
                 ))}
               </Tbody>
             </Table>
           )}
         </VStack>
       </TabPanel>
     </ErrorBoundary> 




     </TabPanels>
   </Tabs>
 </TabPanel>
           {/* Event Tracking Tab */}
           <TabPanel>
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


               {loading ? (
                 <Spinner size="xl" />
               ) : (
                 <Table variant="simple" mt={4}>
                   <TableCaption>Carts</TableCaption>
                   <Thead>
                     <Tr>
                       <Th>Product Name</Th>
                       <Th>Price</Th>
                       <Th>Customer Name</Th>
                       <Th>Order ID</Th>
                       <Th>Delivery Date</Th>
                       <Th>Event Status</Th>
                     </Tr>
                   </Thead>
                   <Tbody>
                     {carts.map((cart) => (
                       <Tr key={cart._id}>
                         <Td>{cart.name}</Td>
                         <Td>{cart.price}</Td>
                         <Td>{cart.customer_name}</Td>
                         <Td>{cart.orderID}</Td>
                         <Td>{new Date(cart.delivery_date).toLocaleDateString()}</Td>
                         <Td>{cart.event_status}</Td>
                       </Tr>
                     ))}
                   </Tbody>
                 </Table>
               )}
             </VStack>
           </TabPanel>

 {/* Transaction History Tab */}
  <TabPanel>
   <VStack spacing={4}>
     {loading ? (
       <Spinner size="xl" />
     ) : (
       <Tabs>
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
 </TabPanel>



           <TabPanel>
           <Container maxW={"container.sm"}>
       <VStack spacing={8}>
         <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
           Fill up the form
         </Heading>

         <Box 
         >
           <VStack spacing={4}>
             <Input
              placeholder='Package Name'
              name='name'
              value={newCarts.name}
              onChange={(e) => setNewCarts({ ...newCarts, name: e.target.value })}
              />

             <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newCarts.price}
              onChange={(e) => setNewCarts({ ...newCarts, price: e.target.value })}
              />

             <Input
              placeholder='Customer Name'
              name='customer_name'
              value={newCarts.customer_name}
              onChange={(e) => setNewCarts({ ...newCarts, customer_name: e.target.value })}
              />
             <Input
              placeholder='Delivery Date'
              type='date'
              name='delivery_date'
              value={newCarts.delivery_date}
              onChange={(e) => setNewCarts({ ...newCarts, delivery_date: e.target.value })}
              />
             <Input
              placeholder='Address'
              name='address'
              value={newCarts.address}
              onChange={(e) => setNewCarts({ ...newCarts, address: e.target.value })}
              />

             <Input
              placeholder='Contact Number'
              name='contact_number'
              value={newCarts.contact_number}
              onChange={(e) => setNewCarts({ ...newCarts, contact_number: e.target.value })}
              />

             <Input
              placeholder='Additional Information'
              name='additional_info'
              value={newCarts.additional_info}
              onChange={(e) => setNewCarts({ ...newCarts, additional_info: e.target.value })}
              />

             <Button colorScheme='blue' onClick={handleAddWalkinOrders} w='full'>
               Add Product
             </Button>
           </VStack>
         </Box>
       </VStack>
     </Container>
     </TabPanel> 

{/* Add Package */}
 <TabPanel>
 <Container maxW={"container.sm"}>
       <VStack spacing={8}>
         <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
           Create New Product
         </Heading>

         <Box 
         >
           <VStack spacing={4}>
             <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />

             <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />

             <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
             <Input
              placeholder='Description'
              name='description'
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
             <Input
              placeholder='Quantity'
              name='quantity'
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              />

             <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
               Add Product
             </Button>
           </VStack>
         </Box>
       </VStack>
     </Container>
 </TabPanel>



         </TabPanels>
       </Tabs>

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


export default Dashboard;
