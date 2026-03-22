import tokenUtils from "./token.js";

const BASE_URL = import.meta.env.VITE_URL;

class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (!res.ok) {
      return res.json().then((err) => Promise.reject(err));
    }

    return res.json();
  }

  register({ name, email, password }) {
    return fetch(`${this._baseUrl}/user/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this._handleServerResponse);
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/user/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._handleServerResponse);
  }

  getUserProfile() {
    return fetch(`${this._baseUrl}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenUtils.getToken()}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleServerResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}/auth/v1/logout`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }
}

export const auth = new AuthApi({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
