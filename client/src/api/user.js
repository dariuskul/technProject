import axios from 'axios';

const URL = "http://localhost:2000/user";
const URLCOMMUNICATION = "http://localhost:2000/communication"
const transport = axios.create({
  withCredentials: true
})

export const register = async (newUser) => axios.post(`${URL}/register`,newUser);
export const login = async (userData) => transport.post(`${URL}/login`,userData);
export const getUser = async (id) => axios.get(`${URL}/getById/${id}`)
export const getUserData = async() => transport.get(`${URL}/getByToken`)
export const followUser = async(followData) => transport.post(`${URLCOMMUNICATION}/follow`,followData)
export const fetchFollowedUsers = async(id) => transport.get(`${URLCOMMUNICATION}/follows/${id}`)


