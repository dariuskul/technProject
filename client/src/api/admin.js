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
