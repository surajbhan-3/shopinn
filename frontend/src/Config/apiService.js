// apiService.js

import axios from 'axios';
import apiConfig from './apiConfig';


const apiService = axios.create(apiConfig);

export default apiService;
