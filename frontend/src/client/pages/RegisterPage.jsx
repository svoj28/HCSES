import React, { useState, useContext } from 'react';
import { Container, VStack, Text, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useContext(AuthContext);

  const validateForm = () => {
    if (!name || !email || !password) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError('');
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', { name, email, password });
      const { email: userEmail, token } = response.data;
      localStorage.setItem('authToken', token);
      dispatch({ type: 'LOGIN', payload: { email: userEmail, token } });
      alert('Registration successful! You are now logged in.');
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxW="container.sm" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          R E G I S T E R
        </Text>
        <VStack spacing={6} w="full">
          {error && <Text color="red.500">{error}</Text>}
          <FormControl id="name" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            w="full"
            colorScheme="blue"
            size="lg"
            onClick={handleSubmit}
          >
            Register
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default RegisterPage;
