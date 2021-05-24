import axios from "axios";

const url = "http://localhost:2000/admin";
const urlHelper = "http://localhost:2000/user/";

const transport = axios.create({
  withCredentials: true,
})

export const suspendPostRequest = async (data) => transport.post(`${url}/suspend/post`,data)
export const fetchAllUsers = async () => transport.get(`${urlHelper}/getAll`);
export const suspendUserRequest = async (data) => transport.post(`${url}/suspend/user`,data);
export const removeUserRequest = async (id) => transport.delete(`${urlHelper}/delete/${id}`);
export const fetchSuspendedPostsRequest = async () => transport.get(`${url}/suspensions/post`);
export const fetchSuspendedUsersRequest = async () => transport.get(`${url}/suspensions/user`);
export const unsuspendUserRequest = async (id) => transport.put(`${url}/unsuspend/user/${id}`);
export const unsuspendPostRequest = async (id) => transport.put(`${url}/unsuspend/post/${id}`);
export const suspendCommentRequest = async (data) => transport.post(`${url}/suspend/comment/`,data);
export const fetchSuspendedCommentsRequest = async () => transport.get(`${url}/suspensions/comment`);
export const unsuspendCommentRequest = async () => {};
export const removeCommentRequest = async () => {};
