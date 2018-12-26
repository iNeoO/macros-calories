import axios from 'axios';
import Vue from 'vue';
import store from '../store';
// import cookieHelper from './cookieHelper';

export default function setup() {
  // API CALL INSTANCE
  const apiCall = axios.create({
    baseURL: process.env.VUE_APP_API,
  });

  apiCall.defaults.headers.post['Content-Type'] = 'application/json';

  // SET IEFIX AND TOKEN DYNAMICALLY
  apiCall.interceptors.request.use((config) => {
    const token = store.getters['authStore/token'];
    if (token) {
      config.headers.authorization = token.token;
    }
    return config;
  }, error => Promise.reject(error));

  // INTERCEPTORS
  apiCall.interceptors.response.use(response => response, (error) => {
    if (error.response && error.response.status && error.response.data) {
      Vue.notify({
        group: 'error',
        type: 'error',
        position: 'top right',
        text: error.response.data.message,
        title: `Error ${error.response.status}`,
      });
    }
    if (error.response.status === 401) {
      // store.commit('authStore/UNSET_TOKEN');
      // store.commit('authStore/UNSET_TOKENID');
      // cookieHelper.deleteCookie();
      // window.location = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  });
  return apiCall;
}
