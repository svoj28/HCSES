import React, { useState } from 'react';
import { Container, VStack, Text, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // hook for navigation
  const location = useLocation(); // hook to access location state

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');

      // Redirect to the original page the user was trying to visit, or default to home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true }); // Navigate to the intended page
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container maxW='container.sm' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          L O G I N
        </Text>
        <VStack spacing={6} w="full">
          {error && <Text color="red.500">{error}</Text>}
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button
            w="full"
            colorScheme="blue"
            size="lg"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default LoginPage;
