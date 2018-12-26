import Vue from 'vue';
import router from '../../router';
import cookieHelper from '../../modules/cookieHelper';

const state = {
  token: {},
  isLogged: false,
  isLoginLoading: false,
};

const actions = {
  getToken({ commit }, token) {
    const tokenPromise = Vue.prototype.$API.get(`token/${token}`);
    tokenPromise.then(({ data }) => {
      if (data && data.data.valid) {
        commit('SET_TOKEN', data.data);
        commit('SET_IS_LOGGED', true);
        cookieHelper.setCookie(data.data);
      }
    }).catch((error) => {
      console.log(error);
    });
    return tokenPromise;
  },

  postToken({ commit }, form) {
    commit('SET_IS_LOGIN_LOADING', true);
    const tokenPromise = Vue.prototype.$API.post('token', form);
    tokenPromise.then(({
      data,
    }) => {
      if (data && data.data.valid) {
        commit('SET_TOKEN', data.data);
        commit('SET_IS_LOGGED', true);
        cookieHelper.setCookie(data.data);
        router.push({ name: 'home' });
      }
      commit('UNSET_IS_LOGIN_LOADING', true);
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_LOGIN_LOADING', true);
    });
    return tokenPromise;
  },

  deleteToken({ commit }, tokenId) {
    const tokenPromise = Vue.prototype.$API.delete(`token/${tokenId}`);
    tokenPromise.then(({
      data,
    }) => {
      if (data) {
        commit('UNSET_TOKEN');
        commit('SET_IS_LOGGED', true);
        cookieHelper.deleteCookie();
        window.location = '/login';
      }
    }).catch((error) => {
      console.log(error);
    });
    return tokenPromise;
  },
};

const getters = {
  token: state => state.token,
  isLogged: state => state.isLogged,
  isLoginLoading: state => state.isLoginLoading,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  UNSET_TOKEN(state) {
    state.token = {};
  },
  SET_IS_LOGGED(state, isLogged) {
    state.isLogged = isLogged;
  },
  UNSET_IS_LOGGED(state) {
    state.isLogged = false;
  },
  SET_IS_LOGIN_LOADING(state, isLoginLoading) {
    state.isLoginLoading = isLoginLoading;
  },
  UNSET_IS_LOGIN_LOADING(state) {
    state.isLoginLoading = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
