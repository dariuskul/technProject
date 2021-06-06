import axios from "axios";

const URL = "https://coder-media-backend.herokuapp.com/post";
const transport = axios.create({
  withCredentials: true,
});

export const newComment = async (data) =>
  transport.post(`${URL}/comment`, data);
