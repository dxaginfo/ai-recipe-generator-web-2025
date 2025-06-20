import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const recipeService = {
  generateRecipes: async (ingredients: string[], dietaryPreferences: string[]) => {
    const response = await api.post('/recipes/generate', { ingredients, dietaryPreferences });
    return response.data;
  },
  getAllRecipes: async () => {
    const response = await api.get('/recipes');
    return response.data;
  },
  getRecipeById: async (id: string) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },
  getUserRecipes: async () => {
    const response = await api.get('/recipes/user');
    return response.data;
  },
  saveRecipe: async (recipeId: string) => {
    const response = await api.post(`/recipes/save/${recipeId}`);
    return response.data;
  },
};

export const userService = {
  getUserProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },
  updateUserProfile: async (profileData: any) => {
    const response = await api.put('/user/profile', profileData);
    return response.data;
  },
  getUserPreferences: async () => {
    const response = await api.get('/user/preferences');
    return response.data;
  },
  updateUserPreferences: async (preferences: any) => {
    const response = await api.put('/user/preferences', preferences);
    return response.data;
  },
};

export default api;