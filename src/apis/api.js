
const BASE_URL = "http://127.0.0.1:8000"; // Your FastAPI server

export const callAPI = async (endpoint, payload) => {
  
  const isFileData = payload instanceof FormData;

  const options = {
    method: "POST",
    headers:{},
    body: isFileData ? payload: JSON.stringify(payload)
  };

  if(!isFileData){
    options.headers["Content-Type"] = "application/json"
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage;
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.detail || errorData.message || errorText;
    } catch {
      errorMessage = errorText;
    }
      throw new Error(`Error ${response.status}: ${errorMessage}`);
  }
    
  return await response.json();
  
};

export const chat = async (action, payload) => {
  switch (action) {
    case "send_text":
      return await callAPI("/receive_text", { text: payload });

    case "upload_file":
      const formData = new FormData();
      formData.append("file", payload);
      return await callAPI("/upload_file", formData);

    default:
      throw new Error(`Unsupported chat action: ${action}`);
  }
};


export const auth = async (action, payload) => {
  switch (action) {
    case "register":
      return await callAPI("/register", payload);

    case "login":
      return await callAPI("/login", payload);

    default:
      throw new Error(`Unsupported auth action: ${action}`);
  }
};