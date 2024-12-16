import { useState } from 'react';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), 
            });

            const json = await response.json();
            console.log('Login Response Body:', json);

            if (!response.ok) {
                throw new Error(json.error || 'Login failed');
            }

            // Store token and admin details in localStorage
            localStorage.setItem('user', JSON.stringify(json));

            setIsLoading(false);
            return json; 
        } catch (error) {
            console.error('Login Error:', error);
            setError(error.message || 'An unexpected error occurred');
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
