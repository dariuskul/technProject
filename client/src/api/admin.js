const url = "http://localhost:2000/admin";
const urlHelper = "http://localhost:2000/user/";
export const suspendPostRequest = async (data) => {
  const response = await fetch(`${url}/suspend/post`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    },
  });
  return response.json();
};

export const fetchAllUsers = async () => {
  const response = await fetch(`${urlHelper}/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    },
  });
  const { users } = await response.json();
  return users;
};

export const suspendUserRequest = async (data) => {
  const response = await fetch(`${url}/suspend/user`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    },
  });
  return response.json();
};

export const removeUserRequest = async (id) => {
  const response = await fetch(`${urlHelper}/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    },
  });

  return response.json();
};

export const fetchSuspendedPostsRequest = async () => {
  const response = await fetch(`${url}/suspensions/post`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    },
  });
  return response.json();
};

export const fetchSuspendedUsersRequest = async () => {
  const response = await fetch(`${url}/suspensions/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    },
  });
  return response.json();
};
export const unsuspendUserRequest = async (id) => {
  const response = await fetch(`${url}/unsuspend/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    },
  });
  return response.json();
};

export const unsuspendPostRequest = async (id) => {
  const response = await fetch(`${url}/unsuspend/post/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    },
  });
  return response.json();
};

export const suspendCommentRequest = async (data) => {
  const response = await fetch(`${url}/suspend/comment`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    },
  });
  return response.json();
};
