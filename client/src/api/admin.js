const url = "http://localhost:2000/admin";

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
