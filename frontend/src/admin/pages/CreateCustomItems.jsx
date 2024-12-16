import { Box, Button, Container, Input, useColorModeValue, VStack, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../../store/product';
import { useToast } from '@chakra-ui/react';

const CreateCustomItemsPage = () => {
  const [newCustomItem, setNewCustomItem] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    quantity: ""
  });
  const toast = useToast();

  const { createCustomItem } = useProductStore();
  const handleAddCustomItem = async () => {
    const { success, message } = await createCustomItem(newCustomItem);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true
      });
      setNewCustomItem({ name: "", price: "", image: "", description: "", quantity: "" });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Custom Item
        </Heading>

        <Box
          w={"full"} bg={useColorModeValue("white", "gray.800")}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder='Item Name'
              name='name'
              value={newCustomItem.name}
              onChange={(e) => setNewCustomItem({ ...newCustomItem, name: e.target.value })}
            />

            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newCustomItem.price}
              onChange={(e) => setNewCustomItem({ ...newCustomItem, price: e.target.value })}
            />

            <Input
              placeholder='Image URL'
              name='image'
              value={newCustomItem.image}
              onChange={(e) => setNewCustomItem({ ...newCustomItem, image: e.target.value })}
            />

            <Input
              placeholder='Description'
              name='description'
              value={newCustomItem.description}
              onChange={(e) => setNewCustomItem({ ...newCustomItem, description: e.target.value })}
            />

            <Input
              placeholder='Quantity'
              name='quantity'
              type='number'
              value={newCustomItem.quantity}
              onChange={(e) => setNewCustomItem({ ...newCustomItem, quantity: e.target.value })}
            />

            <Button colorScheme='blue' onClick={handleAddCustomItem} w='full'>
              Add Custom Item
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreateCustomItemsPage;
