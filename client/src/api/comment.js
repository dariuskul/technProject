import axios from "axios";

const URL = "http://localhost:2000/post";
const transport = axios.create({
  withCredentials: true
})

export const newComment = async (data) => transport.post(`${URL}/comment`,data);
