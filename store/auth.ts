import { defineStore } from 'pinia';
import { ref } from 'vue';

type User = {
  id: number;
  name: string;
  email: string;
};

type ApiError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string>('');

  const apiUrl = 'https://ai-assistant-backend-cxb2.onrender.com';

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await $fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.data?.message || 'Registration failed',
        errors: error.data?.errors,
      };
      throw apiError;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch<{ access_token: string; token_type: string }>(
        `${apiUrl}/auth/login`,
        {
          method: 'POST',
          body: { email, password },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      token.value = response.access_token;
  
      if (process.client) {
        localStorage.setItem('token', response.access_token);
      }
  
      await fetchUserInfo();
  
      // Redirect to the dashboard or any other page after successful login
      navigateTo('/dashboard'); // Redirect to the dashboard page
  
      return response;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.data?.message || 'Login failed',
        errors: error.data?.errors,
      };
      throw apiError;
    }
  };
  
  

  const fetchUserInfo = async () => {
    try {
      console.log("Current token:", token.value); // Debug log
      const response = await $fetch<User>(`${apiUrl}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
  
      user.value = response;
      console.log("User info fetched:", response); // Debug log
    } catch (error) {
      console.error('Error fetching user info', error);
      throw error;
    }
  };

  const logout = () => {
    token.value = '';
    user.value = null;

    if (process.client) {
      localStorage.removeItem('token');
    }
  };

  // Initialize token from localStorage if available
  if (process.client) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      token.value = storedToken;
      fetchUserInfo();
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