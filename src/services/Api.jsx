import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      return Promise.reject({ ...error, isUnauthorized: true });
    }
    return Promise.reject(error);
  }
);

// ========== AUTH ==========
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data.data;
};

export const register = async (name, email, password, isHost) => {
  const response = await api.post('/auth/register', { name, email, password, isHost });
  return response.data.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data.data;
};

// ========== LISTINGS ==========

export const getAllListings = async (location = '') => {
  const response = await api.get(`/listings${location ? `?location=${location}` : ''}`);
  return response.data.data;
};

export const getListing = async (id) => {
  const response = await api.get(`/listings/${id}`);
  return response.data.data;
};

export const createListing = async (listingData) => {
  const response = await api.post('/listings/create', listingData);
  return response.data.data;
};

export const updateListing = async (id, listingData) => {
  const response = await api.put(`/listings/update/${id}`, listingData);
  return response.data.data;
};

export const deleteListing = async (id) => {
  const response = await api.delete(`/listings/delete/${id}`);
  return response.data.data;
};

export const getMyListings = async () => {
  const response = await api.get('/listings/my-listings');
  return response.data.data;
};

// ========== BOOKINGS ==========

export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings/create', bookingData);
  return response.data.data;
};

export const getUserBookings = async () => {
  const response = await api.get('/bookings/user');
  return response.data.data;
};
