import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Button, FormControl, FormLabel, Input, VStack, Box, Heading, Text } from '@chakra-ui/react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data being sent:", { name, email, password });

        await signup(name, email, password);
    };
    
    

    return (
        <Box maxW="lg" mx="auto" mt="8" p="4" borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <VStack spacing={4} align="stretch">
            <Heading as="h3" size="lg" textAlign="center">
                CLIENT SIGN UP
            </Heading>

            <form className="signup" onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Email:</FormLabel>
                    <Input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email"
                    />
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel>Password:</FormLabel>
                    <Input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter your password"
                    />
                </FormControl>

                <Button
                    type="submit"
                    isLoading={isLoading}
                    colorScheme="teal"
                    size="lg"
                    width="full"
                    mt={4}
                >
                    Sign Up
                </Button>

                {error && (
                    <Text color="red.500" mt={4} textAlign="center">
                        {error}
                    </Text>
                )}
            </form>
        </VStack>
    </Box>
    );
};

export default Signup;
