import { defineStore } from 'pinia';
import { ref } from 'vue';

// Define a type for user (adjust the properties as per your actual response)
type User = {
  id: number;
  name: string;
  email: string;
  // add any other user properties here
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null); // Update user to be either null or User object
  const token = ref<string>('');

  const apiUrl = 'https://ai-assistant-backend-cxb2.onrender.com';  // Your API base URL

  // Register a user
  const register = async (name: string, email: string, password: string) => {
    console.log("Register request payload:", { name, email, password });
    try {
      const response = await $fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        body: { name, email, password },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Registration successful", response);
      return response;  // Return response after successful registration
    } catch (error) {
      console.error('Error registering user', error);  // Log the error
      throw error;
    }
  };

  // Login a user
  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch<string>(`${apiUrl}/auth/login`, {
        method: 'POST',
        body: { email, password },
      });

      token.value = response;  // Assuming the token is returned as a string

      // Check if running in the client-side environment before using localStorage
      if (process.client) {
        localStorage.setItem('token', response);  // Store token in localStorage on the client
      }

      await fetchUserInfo();  // Fetch user info after login
    } catch (error) {
      console.error('Login error:', error);  // Log the actual error to debug it
      throw error;
    }
  };

  // Fetch current user information
  const fetchUserInfo = async () => {
    try {
      const response = await $fetch<User>(`${apiUrl}/auth/me`, { // Explicitly specify the User type
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      // Ensure response is of type User, and assign to user.value
      user.value = response;
    } catch (error) {
      console.error('Error fetching user info', error);
    }
  };

  // Logout a user
  const logout = () => {
    token.value = '';
    user.value = null;

    // Ensure localStorage is accessed only on the client-side
    if (process.client) {
      localStorage.removeItem('token');  // Remove token from localStorage
    }
  };

  // Initialize token from localStorage if available
  if (process.client) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      token.value = storedToken;
      fetchUserInfo();  // Fetch user info if token exists
    }
  }

  return {
    user,
    token,
    register,
    login,
    fetchUserInfo,
    logout,
  };
});
