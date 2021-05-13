import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.APP_URL,
});
