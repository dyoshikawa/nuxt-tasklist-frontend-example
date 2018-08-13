import axios from 'axios';

export const getInstance = () => {
  return axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
};
