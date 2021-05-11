const URL = "http://localhost:2000/post";

export const fetchAll = async () => {
  const response = await fetch(`${URL}/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const { posts } = await response.json();
  return posts;
};

export const newPost = async (data) => {
  const response = await fetch(`${URL}/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    },
  });
  const { post } = await response.json();
  return post;
};

export const updatePostRequest = async (data, id) => {
  const response = await fetch(`${URL}/update/${id}`, {
    method: "PUT",
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

export const removePostRequest = async (id) => {
  const response = await fetch(`${URL}/delete/${id}`, {
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
