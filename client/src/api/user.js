import axios from 'axios';

const URL = "http://localhost:2000/user";
const URLCOMMUNICATION = "http://localhost:2000/communication"
export const register = async (newUser) => axios.post(`${URL}/register`,newUser);

export const login = async (userData) => axios.post(`${URL}/login`,userData);


export const getUser = async (id) => axios.get(`${URL}/getById/${id}`)

export const followUser = async(followData) => axios.post(`${URLCOMMUNICATION}/follow`,followData ,{
    headers: {
        'Authorization': `Bearer ${
            JSON.parse(localStorage.getItem("currentUser")).token
          }`,
        }
})

export const fetchFollowedUsers = async(id) => axios.get(`${URLCOMMUNICATION}/follows/${id}`,{
    headers: {
    'Authorization': `Bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    }
})
