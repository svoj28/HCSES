import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, useDisclosure, Tabs, TabList, Tab, TabPanels, TabPanel, VStack, HStack, Spinner, Table, Thead, Tr, Th, Td, Tbody, Button, useToast, Text } from '@chakra-ui/react';
import ErrorBoundary from '../../../ErrorBoundary/ErrorBoundary';

const ApprovalPage = () => {
  // State variables
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

  // Chakra UI Disclosure hook
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = transactionHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactionHistory.length / itemsPerPage);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const toast = useToast();

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

  const handleApprove = async (_id) => {
    if (window.confirm("Are you sure you want to approve this order?")) {
      try {
        const response = await axios.put(`http://localhost:5000/api/cart/approve/${_id}`);

        // Update cart state
        setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart._id === _id ? { ...cart, order_status: 'approved' } : cart
          )
        );

        // Success toast notification
        toast({
          title: "Order Approved",
          description: response.data?.message || "Order has been approved successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error approving the order:", error);

        // Error toast notification
        toast({
          title: "Error",
          description: error.response?.data?.message || "Unable to approve the order.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }}};

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
    
    <Tabs variant="soft-rounded" colorScheme="blue">
      <Heading mb={6}>Approval Page</Heading>
     <TabList>
       <Tab>Approval</Tab>
       <Tab>Cancellation</Tab>
       <Tab>Event Tracking</Tab>
       <Tab>Admin Account</Tab>
     </TabList>

     <TabPanels>
       {/* Approval Tab */}
       <TabPanel>
  <ErrorBoundary>
    <VStack spacing={4}>
      {loading ? (
        <Spinner size="xl" />
      ) : carts.length === 0 ? (
        <Text>No records found</Text>
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
                      <Button colorScheme="green" onClick={() => handleApprove(cart._id)}>
                        Approve
                      </Button>
                    </Td>
                    <Td>
                      <Button colorScheme="red" onClick={() => handleDisapprove(cart._id)}>
                        Disapprove
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            );
          })}
        </>
      )}
    </VStack>
  </ErrorBoundary>
</TabPanel>


       {/* Cancellation Tab */}
       <TabPanel>
  <ErrorBoundary>
    <VStack spacing={4}>
      {loading ? (
        <Spinner size="xl" />
      ) : carts.length === 0 ? (
        <Text>No records found</Text>
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
                    <Button colorScheme="orange" onClick={() => handleCancel(cart._id)}>
                      Approve Cancellation
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          ))}
        </>
      )}
    </VStack>
  </ErrorBoundary>
</TabPanel>


 {/* Event Tracking Tab */}
 <TabPanel>
  <ErrorBoundary>
    <VStack spacing={4}>
      {loading ? (
        <Spinner size="xl" />
      ) : carts.length === 0 ? (
        <Text>No records found</Text>
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
                    <>
                      <Button colorScheme="blue" onClick={() => handleEventStatusChange(cart._id, 'upcoming')} mr={2}>
                        Upcoming
                      </Button>
                      <Button colorScheme="yellow" onClick={() => handleEventStatusChange(cart._id, 'ongoing')} mr={2}>
                        Ongoing
                      </Button>
                      <Button colorScheme="green" onClick={() => handleEventStatusChange(cart._id, 'completed')} mr={2}>
                        Completed
                      </Button>
                    </>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          ))}
        </>
      )}
    </VStack>
  </ErrorBoundary>
</TabPanel>

  {/* Admin Account Tab */}
<ErrorBoundary fallback={<p>Something went wrong while loading the admin accounts.</p>}>
  <TabPanel>
    <VStack spacing={4}>
      {loading ? (
        <Spinner size="xl" />
      ) : accApp?.length === 0 ? (
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
            {accApp.map((acc) => (
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
  );
};

export default ApprovalPage;
