const BASE_URL = import.meta.env.VITE_BASE_URL;

class JobsApi {
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

  getJobs() {
    return fetch(`${this._baseUrl}/jobs`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._handleServerResponse(res));
  }

  createJob({ title, description, image }) {
    return fetch(`${this._baseUrl}/jobs`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        title,
        description,
        image,
      }),
    }).then((res) => this._handleServerResponse(res));
  }
}

export const job = new JobsApi({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
