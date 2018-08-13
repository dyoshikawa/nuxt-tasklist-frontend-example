import axios from 'axios';

export const getInstance = () => {
  return axios.create({
    baseURL: 'https://laravel-tasklist-api-example.herokuapp.com/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
};
