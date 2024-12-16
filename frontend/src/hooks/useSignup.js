import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (name, email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            console.log('Response Status:', response.status);
            const json = await response.json();
            console.log('Response Body:', json);

            if (!response.ok) {
                throw new Error(json.error || 'Something went wrong');
            }

            localStorage.setItem('user', JSON.stringify(json));
            setIsLoading(false);
            return json;
        } catch (error) {
            console.error('Signup Error:', error);
            setError(error.message || 'An unexpected error occurred');
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
