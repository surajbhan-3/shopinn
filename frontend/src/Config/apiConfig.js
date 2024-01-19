
// development server
// const API_BASE_URL = 'http://localhost:4500';
// export const AUTH_BASE_URL ='http://localhost:4500';

// production server

const API_BASE_URL = 'https://dull-pink-clam-hat.cyclic.app';
export const AUTH_BASE_URL ='https://dull-pink-clam-hat.cyclic.app';


///  This  is because for the brower to get token i have refresh once after login
// localStorage.getItem("shopin-token") is called when the module is imported, so it will only be executed once. This means that the value of token will be set to the value that is in localStorage at the time of the import, and it won't be dynamically updated if the token changes later.

export  const Token = localStorage.getItem("shopin-token");


const apiConfig = {
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`,
  },
  // timeout: 5000, // Request timeout in milliseconds
};



export default apiConfig;


