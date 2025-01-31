import axios from 'axios';

const API_URL = 'http://localhost:5000'; 
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//login api
export const login = async (credentials) => {
  console.log(credentials);
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

//register api
export const register = async (userData) => {
  console.log(userData);
  const response = await api.post('/auth/register', userData);
  console.log(response);
  return response.data;
};


export const getAllMovies = async (page = 1, limit = 10) => {
  const response = await api.get(`/movies?page=${page}&limit=${limit}`);
  console.log(response);
  return response.data;
};

export const getSortedMovies = async (sortBy, page = 1, limit = 10) => {
  // console.log(sortBy);
  const response = await api.get(`/movies/sort?sortBy=${sortBy}&page=${page}&limit=${limit}`);
  // console.log(response);
  return response.data.movies;
};
export const getSearchedMovies = async (searchVal) => {
  console.log(searchVal);
  const response = await api.get(`/movies/search?title=${searchVal}`);
  console.log(response);
  return response.data.data;
};
export const getMovie = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};

export const addMovie = async (movieData) => {
  const response = await api.post('/movies', movieData);
  return response.data;
};

export const updateMovie = async (id, movieData) => {
  const response = await api.put(`/movies/${id}`, movieData);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await api.delete(`/movies/${id}`);
  return response.data;
};
