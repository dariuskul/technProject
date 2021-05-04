const URL = "http://localhost:2000/user";

export const register = async (params) => {
  const response = await fetch(`${URL}/register`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.json();
};

export const login = async (params) => {
  const response = await fetch("http://localhost:2000/user/login", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response;
};
