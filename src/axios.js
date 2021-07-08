import axios from 'axios';

const token = window.localStorage.getItem('auth');

const instance = axios.create({
  baseURL: "http://localhost:1337/api"
});

// http://localhost:1337/api
// https://secret-cove-54253.herokuapp.com/api

instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if(error.response.status === 401){
      window.localStorage.clear();
      window.location.reload(true);         
  }
  return Promise.reject(error);
});

if (token) {

  instance.defaults.headers.common['authorization'] = "Bearer " + token;
}

instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;  