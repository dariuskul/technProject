import axios from 'axios';

const URL = "http://localhost:2000/user";
export const register = async (newUser) => axios.post(`${URL}/register`,newUser);

export const login = async (userData) => axios.post(`${URL}/login`,userData);
