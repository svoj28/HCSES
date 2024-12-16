import { useState } from 'react';
import { useLogin } from '../../hooks/Admin/useLogin';
import { Button, FormControl, FormLabel, Input, VStack, Box, Heading, Text } from '@chakra-ui/react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logging in with", { email, password });

        await login(email, password); 
    };

    return (
        <Box maxW="lg" mx="auto" mt="8" p="4" borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <VStack spacing={4} align="stretch">
                <Heading as="h3" size="lg" textAlign="center">
                    ADMIN LOGIN
                </Heading>

                <form className="login" onSubmit={handleSubmit}>
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
                        Log In
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

export default AdminLogin;
