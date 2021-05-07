const URL = "http://localhost:2000/post";

export const fetchAll = async () => {
  const response = await fetch(`${URL}/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.json();
};

export const newPost = async (data) => {
  const response = await fetch(`${URL}/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  console.log(data);
  return response;
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