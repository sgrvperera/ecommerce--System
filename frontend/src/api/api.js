import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api' });

export function setToken(token) { API.defaults.headers.common['Authorization'] = `Bearer ${token}`; }

export const auth = {
  login: (payload) => API.post('/auth/login', payload),
  register: (payload) => API.post('/auth/register', payload)
};

export const products = {
  list: () => API.get('/products'),
  get: (id) => API.get(`/products/${id}`),
  create: (p) => API.post('/products', p)
};

export const orders = {
  create: (payload) => API.post('/orders', payload),
  list: () => API.get('/orders')
};
