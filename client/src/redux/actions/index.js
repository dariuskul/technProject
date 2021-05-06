import { fetchAll } from "../../api/post";
import { login, register } from "../../api/user";

export const loginAction = (payload, history) => async (dispatch) => {
  try {
    const user = await login(payload);
    localStorage.setItem("currentUser", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: user });
    history.push("/");
  } catch (error) {
    alert(error);
  }
};

export const registerAction = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const user = await register(payload);
    dispatch({ type: "REGISTER", payload: user });
    alert("Success, can login now");
  } catch (error) {}
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  dispatch({ type: "LOGOUT" });
  window.location.reload();
};

export const fetchPosts = () => async (dispatch) => {
  try {
    const posts = await fetchAll();
    console.log(posts);
    dispatch({ type: "FETCH_ALL", payload: posts });
  } catch (error) {
    alert(error);
  }
};
