import axios from "axios";

const URL = "http://localhost:2000/post";
const transport = axios.create({
  withCredentials: true
})


export const fetchAll = async() => axios.get(`${URL}/getAll`)
export const getPostsById = async (id) => transport.get(`${URL}/getByUser/${id}`)

// export const newPost = async (data) => {
//   const response = await fetch(`${URL}/create`, {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${
//         JSON.parse(localStorage.getItem("currentUser")).token
//       }`,
//     },
//   });
//   const { post } = await response.json();
//   return post;
// };

export const newPost = async(data) => transport.post(`${URL}/create`,data);

// export const updatePostRequest = async (data, id) => {
//   const response = await fetch(`${URL}/update/${id}`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: `Bearer ${
//         JSON.parse(localStorage.getItem("currentUser")).token
//       }`,
//     },
//   });

//   return response.json();
// };

export const updatePostRequest = async(data,id) => transport.put(`${URL}/update/${id}`,data);

// export const removePostRequest = async (id) => {
//   const response = await fetch(`${URL}/delete/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: `Bearer ${
//         JSON.parse(localStorage.getItem("currentUser")).token
//       }`,
//     },
//   });

//   return response.json();
// };
export const removePostRequest = async(id) => transport.delete(`${URL}/delete/${id}`);

// export const addPostReactionRequest = async (data) => {
//   const response = await fetch(`${URL}/postReact`, {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: `Bearer ${
//         JSON.parse(localStorage.getItem("currentUser")).token
//       }`,
//     },
//   });
//   return response.json();
// };

export const addPostReactionRequest = async (data) => transport.post(`${URL}/postreact`,data);

// export const removePostReactionRequest = async (id) => {
//   const response = await fetch(`${URL}/postReact/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: `Bearer ${
//         JSON.parse(localStorage.getItem("currentUser")).token
//       }`,
//     },
//   });
//   return response.json();
// };

export const removePostReactionRequest = async(id) => transport.delete(`${URL}/postReact/${id}`);

export const searchPost = async(searchQuery) => axios.get(`${URL}/getBySearch?value=${searchQuery}`)

export const hidePost = async(id) => transport.put(`${URL}/hide/${id}`);
 
