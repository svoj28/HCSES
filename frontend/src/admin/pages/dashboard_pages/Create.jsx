import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Spinner, Table, TableCaption, Thead, Tr, Td, Th, Tbody, Tab, Tabs, TabList, TabPanels, TabPanel, useDisclosure, useToast, Container, Input, Button } from '@chakra-ui/react';
import { useCartsStore } from '../../../store/walkinOrders.js';
import { useProductStore } from '../../../store/product.js';
import { usePromoStore } from '../../../store/promopackages.js';
import axios from 'axios';

const Create = () => {
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [products, setProducts] = useState([]);
    const [promo, setPromo] = useState([]);
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

  const [newPromo, setNewPromo] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    quantity: "",
    product_type: "Promo"
  })
  
  const {createPromo} = usePromoStore()
  const handleAddPromo = async() => {
    const {success,message} = await createPromo(newPromo)
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
    setNewPromo({ 
      name: "", 
      price: "", 
      image: "",     
      description: "",
      quantity: "",
    })
  }
  
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

  return (
<VStack spacing={4}>
  <Heading mb={6}>Create Page</Heading>
     {loading ? (
       <Spinner size="xl" />
     ) : (
       <Tabs>
         <TabList>
           <Tab>Walkin Orders</Tab>
           <Tab>Create Package</Tab>
           <Tab>Create Promos</Tab>
         </TabList>

         <TabPanels>
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

           <TabPanel>
            <Container maxW={"container.sm"}>
                   <VStack spacing={8}>
                     <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
                       Create Package
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

           <TabPanel>
            <Container maxW={"container.sm"}>
                   <VStack spacing={8}>
                     <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
                       Create Promos
                     </Heading>
            
                     <Box 
                     >
                       <VStack spacing={4}>
                         <Input
                          placeholder='Promo Name'
                          name='name'
                          value={newPromo.name}
                          onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
                          />
            
                         <Input
                          placeholder='Price'
                          name='price'
                          type='number'
                          value={newPromo.price}
                          onChange={(e) => setNewPromo({ ...newPromo, price: e.target.value })}
                          />
            
                         <Input
                          placeholder='Image URL'
                          name='image'
                          value={newPromo.image}
                          onChange={(e) => setNewPromo({ ...newPromo, image: e.target.value })}
                          />
                         <Input
                          placeholder='Description'
                          name='description'
                          value={newPromo.description}
                          onChange={(e) => setNewPromo({ ...newPromo, description: e.target.value })}
                          />
                         <Input
                          placeholder='Quantity'
                          name='quantity'
                          value={newPromo.quantity}
                          onChange={(e) => setNewPromo({ ...newPromo, quantity: e.target.value })}
                          />
            
                         <Button colorScheme='blue' onClick={handleAddPromo} w='full'>
                           Add Product
                         </Button>
                       </VStack>
                     </Box>
                   </VStack>
                 </Container>
           </TabPanel>
         </TabPanels>
       </Tabs>
     )}
   </VStack>
  );
};

export default Create;
