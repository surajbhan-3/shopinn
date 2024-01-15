// apiConfig.js

const API_BASE_URL = 'http://localhost:4500';
export const AUTH_BASE_URL ='http://localhost:4500';


const token = localStorage.getItem("shopin-token");
console.log("hey token ", token)

const apiConfig = {
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  timeout: 5000, // Request timeout in milliseconds
};

export default apiConfig;
