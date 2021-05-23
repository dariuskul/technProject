import {
  fetchAll,
  newPost,
  updatePostRequest,
  removePostRequest,
  addPostReactionRequest,
  removePostReactionRequest,
  getPostsById,
  searchPost,
  hidePost
} from "../../api/post";
import { fetchFollowedUsers, getUser, login, register,followUser } from "../../api/user";
import { newComment } from "../../api/comment";
import {
  suspendPostRequest,
  fetchAllUsers,
  suspendUserRequest,
  removeUserRequest,
  fetchSuspendedPostsRequest,
  unsuspendPostRequest,
  fetchSuspendedUsersRequest,
  unsuspendUserRequest,
  suspendCommentRequest,
  fetchSuspendedCommentsRequest,
} from "../../api/admin";
import { Button } from "@material-ui/core";
import { notification } from "../../utils/notification";
export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';


export const loginAction = (payload, history) => async (dispatch) => {
  try {
    const {data} = await login(payload);
    localStorage.setItem("currentUser", JSON.stringify(data));
    dispatch({ type: "LOGIN", payload: data });
    history.push("/");
  } catch (err) {
    if(err.response.status===403){
      notification('Your account is suspended', 'error',dispatch,enqueueSnackbar,closeSnackbar)
    }else{
      notification(err.response.data.message, 'error',dispatch,enqueueSnackbar,closeSnackbar)
    }
  }
};

export const registerAction = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const user = await register(payload);
    console.log("REGISTER",user);
    dispatch({ type: "REGISTER", payload: user });
    notification('Your account was created succesfully, You can now login', 'success',dispatch,enqueueSnackbar,closeSnackbar)
  } catch (error) {
    notification(error, 'error',dispatch,enqueueSnackbar,closeSnackbar)
  }
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  dispatch({ type: "LOGOUT" });
  window.location.reload();
};

export const fetchPosts = () => async (dispatch) => {
  try {
    const posts = await fetchAll();
    console.log("POSTS", posts);
    dispatch({ type: "FETCH_ALL", payload: posts });
  } catch (error) {
    alert(error);
  }
};

export const createPost = (data) => async (dispatch) => {
  try {
    const post = await newPost(data);
    dispatch({ type: "NEW_POST", payload: post });
    notification('Post created succesfully', 'success',dispatch,enqueueSnackbar,closeSnackbar)
  } catch (error) {
    alert(error);
  }
};

export const updatePost = (data, id) => async (dispatch) => {
  try {
    const post = await updatePostRequest(data, id);
    dispatch({ type: "UPDATE", payload: post });
    notification('Post updated succesfully', 'success',dispatch,enqueueSnackbar,closeSnackbar)
  } catch (error) {
    alert(error);
  }
};
export const removePost = (id) => async (dispatch) => {
  try {
    await removePostRequest(id);
    dispatch({ type: "REMOVE_POST", payload: id });
    dispatch({ type: "REMOVED", payload: "Post removed succesfully" });
  } catch (error) {
    alert(error);
  }
};

export const addComent = (content, id) => async (dispatch) => {
  try {
    const post = await newComment(content, id);
    dispatch({ type: "UPDATE", payload: post });
  } catch (error) {}
};

export const addReaction = (data) => async (dispatch) => {
  try {
    const react = await addPostReactionRequest(data);
    dispatch({ type: "ADD_REACTION", payload: react });
  } catch (error) {
    alert(error);
  }
};

export const removeReaction = (id, postId, userId) => async (dispatch) => {
  try {
    await removePostReactionRequest(id);
    dispatch({ type: "REMOVE_REACTION", payload: { id, postId, userId } });
  } catch (error) {
    alert(error);
  }
};

export const suspendPost = (data) => async (dispatch) => {
  try {
    await suspendPostRequest(data);
    dispatch({ type: "SUSPEND_POST", payload: data.postId });
  } catch (error) {
    alert(error);
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const users = await fetchAllUsers();
    dispatch({ type: "FETCH_USERS", payload: users });
  } catch (error) {
    alert(error);
  }
};

export const suspendUser = (data) => async (dispatch) => {
  try {
    await suspendUserRequest(data);
    dispatch({ type: "SUSPEND_USER", payload: data.userId });
  } catch (error) {
    alert(error);
  }
};

export const removeUser = (id) => async (dispatch) => {
  try {
    await removeUserRequest(id);
    dispatch({ type: "SUSPEND_USER", payload: id });
  } catch (error) {
    alert(error);
  }
};

export const fetchSuspendedPosts = () => async (dispatch) => {
  try {
    const posts = await fetchSuspendedPostsRequest();
    dispatch({ type: "FETCH_ALL_SUSPENDED_POSTS", payload: posts });
  } catch (error) {
    alert(error);
  }
};

export const fetchSuspendedUsers = () => async (dispatch) => {
  try {
    const users = await fetchSuspendedUsersRequest();
    dispatch({ type: "FETCH_SUSPENDED_USERS", payload: users });
  } catch (error) {}
};

export const unsuspendPost = (id) => async (dispatch) => {
  try {
    await unsuspendPostRequest(id);
    dispatch({ type: "UNSUSPEND_POST", payload: id });
  } catch (error) {}
};

export const unsuspendUser = (id) => async (dispatch) => {
  try {
    await unsuspendUserRequest(id);
    dispatch({ type: "UNSUSPEND_USER", payload: id });
  } catch (error) {}
};

export const suspendComment = (data, id) => async (dispatch) => {
  try {
    await suspendCommentRequest(data);
    dispatch({ type: "SUSPEND_COMMENT", payload: { data, id } });
  } catch (error) {}
};

export const fetchSuspendedComments = () => async (dispatch) => {
  try {
    const comments = await fetchSuspendedCommentsRequest();
    dispatch({ type: "FETCH_ALL_SUSPENDED_COMMENTS", payload: comments });
  } catch (error) {
    alert(error);
  }
};



export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = key => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: REMOVE_SNACKBAR,
    key,
});


export const getUserProfile = (id) => async(dispatch) => {
  try {
    console.log("AADASDASDSD",id)
    const {data} =  await getUser(id);
    const {data: {posts}} = await getPostsById(id);
    const userId = JSON.parse(localStorage.getItem('currentUser')).id
    const follows = await fetchFollowedUsers(userId);
    let fullProfile = {
      user: data,
      followers: follows.data
    }
    dispatch({type : "GET_PROFILE", payload: fullProfile});
    dispatch({type: "FETCH_ALL", payload: posts})
  } catch (error) {
    alert(error)
  }
}

export const follow = (form,id) => async(dispatch) => {
  try {
    const {data} = await followUser(form);
    console.log(id)
    dispatch({type: 'FOLLOW_USER', payload: {data,id}})

  } catch (error) {
    
  }
}

export const searchBytitle = (query) => async(dispatch) => {
  try {
    const {data: {posts}} = await searchPost(query);
    console.log(posts)
    if(posts.length > 0){
      dispatch({type: 'FETCH_ALL', payload: posts})
    }else{
      notification('We could not find anything :(', 'info',dispatch,enqueueSnackbar,closeSnackbar)
    }
    
  } catch (error) {
    
  }
}

export const hideUserPost = (id) => async(dispatch) => {
  try {
    const {data} = await hidePost(id);
    dispatch({type: 'UPDATE', payload: data});
  } catch (error) {
    alert(error);
  }
}