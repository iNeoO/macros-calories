import Vue from 'vue';

const state = {
  macros: [],
  macrosCount: 0,
  isMacrosLoading: false,
  macrosDates: [],
  isMacrosDatesLoading: false,
  macrosStats: {},
  isMacrosStatsLoading: false,
  macro: {},
  isMacroLoading: false,
};

const actions = {
  getMacros({ commit }, query) {
    commit('SET_IS_MACROS_LOADING', true);
    const macrosPromise = Vue.prototype.$API.get('macros', { params: query });
    macrosPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_MACROS_COUNT', data.count);
        commit('SET_MACROS', data.data);
        commit('UNSET_IS_MACROS_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_MACROS_LOADING');
    });
    return macrosPromise;
  },

  getMacrosDates({ commit }) {
    commit('SET_IS_MACROS_DATES_LOADING', true);
    const macrosPromise = Vue.prototype.$API.get('macros/dates');
    macrosPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_MACROS_DATES', data.data);
        commit('UNSET_IS_MACROS_DATES_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_MACROS_DATES_LOADING');
    });
    return macrosPromise;
  },

  getMacrosStats({ commit }) {
    commit('SET_IS_MACROS_STATS_LOADING', true);
    const macrosPromise = Vue.prototype.$API.get('macros/stats');
    macrosPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_MACROS_STATS', data.data);
        commit('UNSET_IS_MACROS_STATS_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_MACROS_STATS_LOADING');
    });
    return macrosPromise;
  },

  getMacro({ commit }, macroId) {
    commit('SET_IS_MACRO_LOADING', true);
    const macroPromise = Vue.prototype.$API.get(`macro/${macroId}`);
    macroPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_MACRO', data.data);
        commit('UNSET_IS_MACRO_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_MACRO_LOADING');
    });
    return macroPromise;
  },

  postMacro({ commit }, macro) {
    commit('SET_IS_MACRO_LOADING', true);
    const macroPromise = Vue.prototype.$API.post('macro', macro);
    macroPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_MACRO', data.data);
        commit('UNSET_IS_MACRO_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_MACRO_LOADING');
    });
    return macroPromise;
  },

  patchMacro({ commit }, macro) {
    commit('SET_IS_MACRO_LOADING', true);
    const macroPromise = Vue.prototype.$API
      .patch(`macro/${macro._id}`, macro);
    macroPromise.then(({ data }) => {
      if (data && data.data) {
        commit('SET_MACRO', data.data);
        commit('UNSET_IS_MACRO_LOADING');
        Vue.notify({
          group: 'success',
          type: 'success',
          position: 'top right',
          text: 'Macro has been edited',
          title: 'Success',
        });
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_MACRO_LOADING');
    });
    return macroPromise;
  },
};

const getters = {
  macros: state => state.macros,
  macrosCount: state => state.macrosCount,
  isMacrosLoading: state => state.isMacrosLoading,
  macrosDates: state => state.macrosDates,
  isMacrosDatesLoading: state => state.isMacrosDatesLoading,
  macrosStats: state => state.macrosStats,
  isMacrosStatsLoading: state => state.isMacrosStatsLoading,
  macro: state => state.macro,
  isMacroLoading: state => state.isMacroLoading,
};

const mutations = {
  SET_MACROS(state, macros) {
    state.macros = macros;
  },
  UNSET_MACROS(state) {
    state.macros = [];
  },
  SET_MACROS_COUNT(state, count) {
    state.macrosCount = count;
  },
  UNSET_MACROS_COUNT(state) {
    state.macrosCount = 0;
  },
  SET_IS_MACROS_LOADING(state, isMacrosLoading) {
    state.isMacrosLoading = isMacrosLoading;
  },
  UNSET_IS_MACROS_LOADING(state) {
    state.isMacrosLoading = false;
  },
  SET_MACROS_DATES(state, macrosDates) {
    state.macrosDates = macrosDates;
  },
  UNSET_MACROS_DATES(state) {
    state.macrosDates = [];
  },
  SET_IS_MACROS_DATES_LOADING(state, isMacrosDatesLoading) {
    state.isMacrosDatesLoading = isMacrosDatesLoading;
  },
  UNSET_IS_MACROS_DATES_LOADING(state) {
    state.isMacrosDatesLoading = false;
  },
  SET_MACROS_STATS(state, macrosStats) {
    state.macrosStats = macrosStats;
  },
  UNSET_MACROS_Stats(state) {
    state.macrosStats = {};
  },
  SET_IS_MACROS_STATS_LOADING(state, isMacrosStatsLoading) {
    state.isMacrosStatsLoading = isMacrosStatsLoading;
  },
  UNSET_IS_MACROS_STATS_LOADING(state) {
    state.isMacrosStatsLoading = false;
  },
  SET_MACRO(state, macro) {
    state.macro = macro;
  },
  UNSET_MACRO(state) {
    state.macro = {};
  },
  SET_IS_MACRO_LOADING(state, isMacroLoading) {
    state.isMacroLoading = isMacroLoading;
  },
  UNSET_IS_MACRO_LOADING(state) {
    state.isMacroLoading = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
