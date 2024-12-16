import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (email, password, role = "user") => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/adminAppr/signup', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }), 
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
