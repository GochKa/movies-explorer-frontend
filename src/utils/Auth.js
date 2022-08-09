const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const register = (name, email, password) => {
  return fetch("https://api.movies.gocha.nomoredomains.xyz/signup", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then((res) => {
    return getResponse(res);
  });
};

export const authorize = (email, password) => {
  return fetch("https://api.movies.gocha.nomoredomains.xyz/signin", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export const getContent = (token) => {
  return fetch("https://api.movies.gocha.nomoredomains.xyz/users/me", {
    method: "GET",
    headers: {
      headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return getResponse(res);
  });
};