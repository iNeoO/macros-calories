import Vue from 'vue';

const state = {
  user: {},
  isUserLoading: false,
};

const actions = {
  getUser({ commit }) {
    commit('SET_IS_USER_LOADING', true);
    const userPromise = Vue.prototype.$API.get('user');
    userPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_USER', data.data);
        commit('UNSET_IS_USER_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_USER_LOADING');
    });
    return userPromise;
  },

  postUser({ commit }, user) {
    commit('SET_IS_USER_LOADING', true);
    const userPromise = Vue.prototype.$API.post('user', user);
    userPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_USER', data.data);
        commit('UNSET_IS_USER_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_USER_LOADING');
    });
    return userPromise;
  },

  patchUser({ commit }, user) {
    commit('SET_IS_USER_LOADING', true);
    const userPromise = Vue.prototype.$API.patch('user', user);
    userPromise.then(({ data }) => {
      if (data && data.data) {
        commit('SET_USER', data.data);
        commit('UNSET_IS_USER_LOADING');
        Vue.notify({
          group: 'success',
          type: 'success',
          position: 'top right',
          text: 'User has been edited',
          title: 'Success',
        });
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_USER_LOADING');
    });
    return userPromise;
  },

  patchUserPassword({ commit }, form) {
    commit('SET_IS_USER_LOADING', true);
    const userPromise = Vue.prototype.$API.patch('user/password', form);
    userPromise.then(() => {
    }).catch((error) => {
      console.log(error);
    });
    return userPromise;
  },
};

const getters = {
  user: state => state.user,
  isUserLoading: state => state.isUserLoading,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  UNSET_USER(state) {
    state.user = {};
  },
  SET_IS_USER_LOADING(state, isUserLoading) {
    state.isUserLoading = isUserLoading;
  },
  UNSET_IS_USER_LOADING(state) {
    state.isUserLoading = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
