const URL = "http://localhost:2000/post";

export const newComment = async (data) => {
  const response = await fetch(`${URL}/comment`, {
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
