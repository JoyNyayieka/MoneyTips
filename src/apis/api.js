import { headers } from "next/headers";

const BASE_URL = " http://127.0.0.1:8000"; // Your FastAPI server

export const callAPI = async (endpoint, payload) => {
  try {
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
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};