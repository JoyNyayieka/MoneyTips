const BASE_URL = "http://localhost:8000"; 

// POST request handler
export const callAPI_POST = async (endpoint, body, isForm = false) => {
  const headers = isForm ? {} : { "Content-Type": "application/json" };
  const payload = isForm ? body : JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: payload,
    credentials: "include", // send cookies
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || "POST request failed");
  }

  return await response.json();
};

// GET request handler
export const callAPI_GET = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    credentials: "include", // send cookies
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      detail: response.statusText,
    }));
    const error = new Error(errorData.detail || "GET request failed");
    error.status = response.status; // attach HTTP status
    throw error;
  }

  return await response.json();
};

//PATCH request handler
export const callAPI_PATCH = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || 'PATCH request failed');
  }

  return await response.json();
};

// Chat operations
export const chat = async (action, payload) => {
  switch (action) {
    case "send_text":
      return await callAPI_POST("/receive_text", { text: payload });

    case "upload_file":
      const formData = new FormData();
      formData.append("file", payload);
      return await callAPI_POST("/upload_file", formData, true);

    default:
      throw new Error(`Unsupported chat action: ${action}`);
  }
};

// Auth operations
export const auth = async (action, payload) => {
  switch (action) {
    case "register":
      return await callAPI_POST("/register", payload);

    case "login":
      return await callAPI_POST("/login", payload);

    case "logout":
      return await callAPI_POST("/logout", {});

    default:
      throw new Error(`Unsupported auth action: ${action}`);
  }
};

// Profile data
export const profile = async (action, payload = {}) => {
  switch (action) {
    case "get":
      return await callAPI_GET("/profile");

    case "update":
      return await callAPI_PATCH("/profile", payload);

    case "password":
      return await callAPI_POST("/change-password", payload)

    default:
      throw new Error(`Unsupported profile action: ${action}`);
  }
};
