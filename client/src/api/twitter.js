import axios from "axios";

const URL = 'http://localhost:2000/outer_service/tweets';


export const getTweets = (query,page) => axios.get(`${URL}?search=${query}&count=${page || 0}`);