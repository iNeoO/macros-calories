import Vue from 'vue';

const state = {
  aliments: [],
  alimentsCount: 0,
  isalimentsLoading: false,
  aliment: {},
  isAlimentLoading: false,
};

const actions = {
  getAliments({ commit }, query) {
    commit('SET_IS_ALIMENTS_LOADING', true);
    const alimentsPromise = Vue.prototype.$API.get('aliments', { params: query });
    alimentsPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_ALIMENTS_COUNT', data.count);
        commit('SET_ALIMENTS', data.data);
        commit('UNSET_IS_ALIMENTS_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_ALIMENTS_LOADING');
    });
    return alimentsPromise;
  },

  getAliment({ commit }, alimentId) {
    commit('SET_IS_ALIMENT_LOADING', true);
    const alimentPromise = Vue.prototype.$API.get(`aliment/${alimentId}`);
    alimentPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_ALIMENT', data.data);
        commit('UNSET_IS_ALIMENT_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_ALIMENT_LOADING');
    });
    return alimentPromise;
  },

  postAliment({ commit }, aliment) {
    commit('SET_IS_ALIMENT_LOADING', true);
    const alimentPromise = Vue.prototype.$API.post('aliment', aliment);
    alimentPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_ALIMENT', data.data);
        commit('UNSET_IS_ALIMENT_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_ALIMENT_LOADING');
    });
    return alimentPromise;
  },

  patchAliment({ commit }, aliment) {
    commit('SET_IS_ALIMENT_LOADING', true);
    const alimentPromise = Vue.prototype.$API
      .patch(`aliment/${aliment._id}`, aliment);
    alimentPromise.then(({ data }) => {
      if (data && data.data) {
        commit('SET_ALIMENT', data.data);
        commit('UNSET_IS_ALIMENT_LOADING');
        Vue.notify({
          group: 'success',
          type: 'success',
          position: 'top right',
          text: 'Aliment has been edited',
          title: 'Success',
        });
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_ALIMENT_LOADING');
    });
    return alimentPromise;
  },
};

const getters = {
  aliments: state => state.aliments,
  alimentsCount: state => state.alimentsCount,
  isAlimentsLoading: state => state.isAlimentsLoading,
  aliment: state => state.aliment,
  isAlimentLoading: state => state.isAlimentLoading,
};

const mutations = {
  SET_ALIMENTS(state, aliments) {
    state.aliments = aliments;
  },
  UNSET_ALIMENTS(state) {
    state.aliments = [];
  },
  SET_ALIMENTS_COUNT(state, count) {
    state.alimentsCount = count;
  },
  UNSET_ALIMENTS_COUNT(state) {
    state.alimentsCount = 0;
  },
  SET_IS_ALIMENTS_LOADING(state, isAlimentsLoading) {
    state.isAlimentsLoading = isAlimentsLoading;
  },
  UNSET_IS_ALIMENTS_LOADING(state) {
    state.isAlimentsLoading = false;
  },
  SET_ALIMENT(state, aliment) {
    state.aliment = aliment;
  },
  UNSET_ALIMENT(state) {
    state.aliment = {};
  },
  SET_IS_ALIMENT_LOADING(state, isAlimentLoading) {
    state.isAlimentLoading = isAlimentLoading;
  },
  UNSET_IS_ALIMENT_LOADING(state) {
    state.isAlimentLoading = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
