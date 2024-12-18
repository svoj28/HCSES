import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
  useToast,
} from "@chakra-ui/react";

const OrderForm = () => {
  const toast = useToast();

  // Ensure the product_name starts as an empty string
  const [formData, setFormData] = useState({
    product_name: "", // Initialize with empty string
    name: "",
    contact_number: "",
    email_address: "",
    home_address: "",
    delivery_date: "",
    additional_info: "",
    order_status: "",
    price_status: "",
    price: "PENDING",
    customized: false, 
  });

  const [promoProducts, setPromoProducts] = useState([]);
  const [nullProducts, setNullProducts] = useState([]);
  
  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        console.log("API Response:", response.data);
  
        if (response.data.success && Array.isArray(response.data.data)) {
          // Filter promo products
          const promoProductsList = response.data.data.filter(product => product.product_type === "Promo");
  
          // Filter products with null or empty product_type
          const nullProductsList = response.data.data.filter(
            product => product.product_type === null || product.product_type === ""
          );
  
          setPromoProducts(promoProductsList);
          setNullProducts(nullProductsList);
        } else {
          toast({
            title: "Error",
            description: "Invalid data format: No products found.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setPromoProducts([]);
        setNullProducts([]);
        toast({
          title: "Error",
          description: "Failed to fetch products.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    fetchProducts();
  }, []);
  

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        customized: checked,
        product_name: checked ? "customized" : "", 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting order with data:", formData);

    try {
      const response = await axios.post("http://localhost:5000/api/cart/process-order", formData);
      console.log("API Response:", response.data);

      toast({
        title: "Success",
        description: "Order added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        name: "",
        contact_number: "",
        email_address: "",
        home_address: "",
        delivery_date: "",
        additional_info: "",
        price_status: "",
        price: "PENDING",
        product_name: "",
        customized: false,
      });
    } catch (error) {
      console.error("Error adding order:", error);
      toast({
        title: "Error",
        description: "Failed to add order.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" p="6" borderWidth="1px" borderRadius="lg" boxShadow="lg" pt={140} bg="white">
      <Heading as="h2" size="lg" mb="6" textAlign="center">
        Add Event
      </Heading>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <FormControl isRequired mb="4">
          <FormLabel>Name:</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>

        {/* Contact Number */}
        <FormControl isRequired mb="4">
          <FormLabel>Contact Number:</FormLabel>
          <Input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
          />
        </FormControl>

        {/* Email Address */}
        <FormControl mb="4">
          <FormLabel>Email Address (optional):</FormLabel>
          <Input
            type="email"
            name="email_address"
            value={formData.email_address}
            onChange={handleChange}
          />
        </FormControl>

        {/* Home Address */}
        <FormControl isRequired mb="4">
          <FormLabel>Home Address:</FormLabel>
          <Textarea
            name="home_address"
            value={formData.home_address}
            onChange={handleChange}
          />
        </FormControl>

        {/* Delivery Date */}
        <FormControl isRequired mb="4">
          <FormLabel>Delivery Date:</FormLabel>
          <Input
            type="date"
            name="delivery_date"
            value={formData.delivery_date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </FormControl>

        {/* First Combobox for Promo Products */}
<FormControl isRequired mb="4">
  <FormLabel>Promo Products:</FormLabel>
  <Select
    placeholder="Select Promo product"
    name="product_name"
    value={formData.product_name || ""}
    onChange={handleChange}
    isDisabled={formData.customized}
  >
    {promoProducts.length > 0 ? (
      promoProducts.map((product) => (
        <option key={product.id || product._id} value={product.name}>
          {product.name}
        </option>
      ))
    ) : (
      <option disabled>No promo products available</option>
    )}
  </Select>
</FormControl>

{/* Second Combobox for Products with null product_type */}
<FormControl isRequired mb="4">
  <FormLabel>Products without Type:</FormLabel>
  <Select
    placeholder="Select product without type"
    name="product_name"
    value={formData.product_name || ""}
    onChange={handleChange}
    isDisabled={formData.customized}
  >
    {nullProducts.length > 0 ? (
      nullProducts.map((product) => (
        <option key={product.id || product._id} value={product.name}>
          {product.name}
        </option>
      ))
    ) : (
      <option disabled>No products without type available</option>
    )}
  </Select>
</FormControl>


        {/* Checkbox for Customized */}
        <FormControl display="flex" alignItems="center" mb="4">
          <Checkbox
            name="customized"
            isChecked={formData.customized}
            onChange={handleChange}
            mr="2"
          />
          <FormLabel mb="0">Customized</FormLabel>
        </FormControl>

        {/* Additional Information */}
        <FormControl mb="4">
          <FormLabel>Additional Information:</FormLabel>
          <Textarea
            name="additional_info"
            value={formData.additional_info}
            onChange={handleChange}
          />
        </FormControl>

        {/* Submit Button */}
        <Button colorScheme="teal" type="submit" width="full">
          Submit Order
        </Button>
      </form>
    </Box>
  );
};

export default OrderForm;
