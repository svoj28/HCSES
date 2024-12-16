import React, { useState } from 'react';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  useColorModeValue,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const ProductCard = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isReceiptOpen, onOpen: onReceiptOpen, onClose: onReceiptClose } = useDisclosure();
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const [formData, setFormData] = useState({
    customer_name: '',
    delivery_date: '',
    address: '',
    additional_info: '',
  });

  const [orderData, setOrderData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    const userString = localStorage.getItem("user");
    console.log("User string from localStorage:", userString);

    if (!userString) {
        console.error("User is not logged in.");
        window.location.href = '/login'; // Redirect to login page
        return;
    }

    try {
        const parsedUser = JSON.parse(userString);
        console.log("Parsed User:", parsedUser);

        let token;
        if (parsedUser.data && parsedUser.data.token) {
            token = parsedUser.data.token;
        } else if (parsedUser.user && parsedUser.user.token) {
            token = parsedUser.user.token;
        } else if (parsedUser.success && parsedUser.data && parsedUser.data.token) {
            token = parsedUser.data.token;
        } else if (parsedUser.user && parsedUser.user.token) {
            token = parsedUser.user.token;
        }

        console.log("Token found:", token);

        if (!token) {
            console.error("Token is missing from localStorage.");
            return;
        }

        const response = await fetch('http://localhost:5000/api/cart/process-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productID: product._id,
                formData: {
                    customer_name: formData.customer_name,
                    delivery_date: formData.delivery_date,
                    address: formData.address,
                    additional_info: formData.additional_info,
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error processing order:', errorData);
            throw new Error(errorData.message || 'Unknown error');
        }

        const data = await response.json();
        console.log('Order processed successfully:', data);

        setOrderData(data.cartItem);
        setIsModalOpen(true);

    } catch (error) {
        console.error('Error in handleSubmit:', error);
        alert('An error occurred while processing your order. Please try again.');
    }
};

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write(`
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; }
            .receipt-card {
              width: 300px;
              padding: 20px;
              margin: 0 auto;
              border: 1px solid #ddd;
              border-radius: 10px;
              text-align: center;
            }
            .receipt-card h2 {
              font-size: 24px;
              margin-bottom: 10px;
            }
            .receipt-card p {
              font-size: 16px;
              margin: 5px 0;
            }
            .receipt-card .bold {
              font-weight: bold;
            }
            .receipt-card .price {
              color: green;
              font-size: 20px;
            }
          </style>
        </head>
        <body>
          <div class="receipt-card">
            <h2>Receipt</h2>
            <p><span class="bold">Order ID:</span> ${orderData?.orderID}</p>
            <p><span class="bold">Customer Name:</span> ${orderData?.customer_name}</p>
            <p><span class="bold">Product:</span> ${orderData?.name}</p>
            <p><span class="bold">Delivery Date:</span> ${orderData?.delivery_date}</p>
            <p><span class="bold">Address:</span> ${orderData?.address}</p>
            <p><span class="bold">Additional Info:</span> ${orderData?.additional_info}</p>
            <p class="price"><span class="bold">Total:</span> ₱${orderData?.price}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image src={product.Image} alt={product.name} h={48} w="full" objectFit="cover" />

      <Box p={4}>
        <Heading as="h3" size="md" mb={4}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ₱{product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<AddIcon />}
            colorScheme="green"
            aria-label="Add to cart"
            onClick={onOpen}
          />
        </HStack>
      </Box>

      {/* Modal for the form */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="center" mb={6}>
              <Image
                src={product.Image}
                alt={product.name}
                boxSize="150px"
                objectFit="cover"
                borderRadius="md"
              />
              <Heading as="h3" size="lg">
                {product.name}
              </Heading>
              <Text fontWeight="bold" fontSize="xl" color={textColor}>
                ₱{product.price}
              </Text>
            </VStack>

            {/* Form Fields */}
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Delivery Date</FormLabel>
              <Input
                type="date"
                name="delivery_date"
                value={formData.delivery_date}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Address</FormLabel>
              <Textarea
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Others</FormLabel>
              <Textarea
                placeholder="Additional information"
                name="additional_info"
                value={formData.additional_info}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Receipt Modal */}
      <Modal isOpen={isReceiptOpen} onClose={onReceiptClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Receipt</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="center">
              <Image
                src={product.Image}
                alt={product.name}
                boxSize="150px"
                objectFit="cover"
                borderRadius="md"
              />
              <Heading as="h3" size="lg">
                {product.name}
              </Heading>
              <Text fontWeight="bold" fontSize="xl" color={textColor}>
                ₱{product.price}
              </Text>
              <Text>
                <strong>Order ID:</strong> {orderData?.orderID}
              </Text>
              <Text>
                <strong>Customer:</strong> {orderData?.customer_name}
              </Text>
              <Text>
                <strong>Delivery Date:</strong> {orderData?.delivery_date}
              </Text>
              <Text>
                <strong>Address:</strong> {orderData?.address}
              </Text>
              <Text>
                <strong>Additional Info:</strong> {orderData?.additional_info}
              </Text>
              <Text fontWeight="bold" fontSize="lg" color="green">
                Total: ₱{orderData?.price}
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" onClick={handlePrint}>
              Print Receipt
            </Button>
            <Button variant="ghost" onClick={onReceiptClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      
    </Box>
  );
};

export default ProductCard;
