import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: `http://${config.host}:${config.port}/api`,
});

export default api;