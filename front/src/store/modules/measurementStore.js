import Vue from 'vue';

const state = {
  measurements: [],
  measurementsCount: 0,
  isMeasurementsLoading: false,
  measurementsDates: [],
  isMeasurementsDatesLoading: false,
  measurement: {},
  isMeasurementLoading: false,
  nearestMeasurement: {},
  isNearestMeasurementLoading: false,
};

const actions = {
  getMeasurements({ commit }, query) {
    commit('SET_IS_MEASUREMENTS_LOADING', true);
    const measurementsPromise = Vue.prototype.$API.get('measurements', { params: query });
    measurementsPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_MEASUREMENTS_COUNT', data.count);
        commit('SET_MEASUREMENTS', data.data);
        commit('UNSET_IS_MEASUREMENTS_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_MEASUREMENTS_LOADING');
    });
    return measurementsPromise;
  },

  getMeasurementsDates({ commit }) {
    commit('SET_IS_MEASUREMENTS_DATES_LOADING', true);
    const measurementsPromise = Vue.prototype.$API.get('measurements/dates');
    measurementsPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_MEASUREMENTS_DATES', data.data);
        commit('UNSET_IS_MEASUREMENTS_DATES_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_MEASUREMENTS_DATES_LOADING');
    });
    return measurementsPromise;
  },


  getMeasurement({ commit }, measurementId) {
    commit('SET_IS_MEASUREMENT_LOADING', true);
    const measurementPromise = Vue.prototype.$API.get(`measurement/${measurementId}`);
    measurementPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_MEASUREMENT', data.data);
        commit('UNSET_IS_MEASUREMENT_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_MEASUREMENT_LOADING');
    });
    return measurementPromise;
  },

  getNearestMeasurement({ commit }, date) {
    commit('SET_IS_NEAREST_MEASUREMENT_LOADING', true);
    const measurementPromise = Vue.prototype.$API.get('measurement/nearest', {
      params: {
        date,
      },
    });
    measurementPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_NEAREST_MEASUREMENT', data.data[0]);
        commit('UNSET_IS_NEAREST_MEASUREMENT_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_NEAREST_MEASUREMENT_LOADING');
    });
    return measurementPromise;
  },


  postMeasurement({ commit }, measurement) {
    commit('SET_IS_MEASUREMENT_LOADING', true);
    const measurementPromise = Vue.prototype.$API.post('measurement', measurement);
    measurementPromise.then(({
      data,
    }) => {
      if (data && data.data) {
        commit('SET_MEASUREMENT', data.data);
        commit('UNSET_IS_MEASUREMENT_LOADING');
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_MEASUREMENT_LOADING');
    });
    return measurementPromise;
  },

  patchMeasurement({ commit }, measurement) {
    commit('SET_IS_MEASUREMENT_LOADING', true);
    const measurementPromise = Vue.prototype.$API
      .patch(`measurement/${measurement._id}`, measurement);
    measurementPromise.then(({ data }) => {
      if (data && data.data) {
        commit('SET_MEASUREMENT', data.data);
        commit('UNSET_IS_MEASUREMENT_LOADING');
        Vue.notify({
          group: 'success',
          type: 'success',
          position: 'top right',
          text: 'Measurement has been edited',
          title: 'Success',
        });
      }
    }).catch((error) => {
      console.log(error);
      commit('UNSET_IS_MEASUREMENT_LOADING');
    });
    return measurementPromise;
  },
};

const getters = {
  measurements: state => state.measurements,
  measurementsCount: state => state.measurementsCount,
  isMeasurementsLoading: state => state.isMeasurementsLoading,
  measurementsDates: state => state.measurementsDates,
  isMeasurementsDatesLoading: state => state.isMeasurementsDatesLoading,
  measurement: state => state.measurement,
  isMeasurementLoading: state => state.isMeasurementLoading,
  nearestMeasurement: state => state.nearestMeasurement,
  isNearestMeasurementLoading: state => state.isNearestMeasurementLoading,
};

const mutations = {
  SET_MEASUREMENTS(state, measurements) {
    state.measurements = measurements;
  },
  UNSET_MEASUREMENTS(state) {
    state.measurements = [];
  },
  SET_MEASUREMENTS_COUNT(state, count) {
    state.measurementsCount = count;
  },
  UNSET_MEASUREMENTS_COUNT(state) {
    state.measurementsCount = 0;
  },
  SET_IS_MEASUREMENTS_LOADING(state, isMeasurementsLoading) {
    state.isMeasurementsLoading = isMeasurementsLoading;
  },
  UNSET_IS_MEASUREMENTS_LOADING(state) {
    state.isMeasurementsLoading = false;
  },
  SET_MEASUREMENTS_DATES(state, measurementsDates) {
    state.measurementsDates = measurementsDates;
  },
  UNSET_MEASUREMENTS_DATES(state) {
    state.measurementsDates = [];
  },
  SET_IS_MEASUREMENTS_DATES_LOADING(state, isMeasurementsDatesLoading) {
    state.isMeasurementsDatesLoading = isMeasurementsDatesLoading;
  },
  UNSET_IS_MEASUREMENTS_DATES_LOADING(state) {
    state.isMeasurementsDatesLoading = false;
  },
  SET_MEASUREMENT(state, measurement) {
    state.measurement = measurement;
  },
  UNSET_MEASUREMENT(state) {
    state.measurement = {};
  },
  SET_IS_MEASUREMENT_LOADING(state, isMeasurementLoading) {
    state.isMeasurementLoading = isMeasurementLoading;
  },
  UNSET_IS_MEASUREMENT_LOADING(state) {
    state.isMeasurementLoading = false;
  },
  SET_NEAREST_MEASUREMENT(state, nearestMeasurement) {
    state.nearestMeasurement = nearestMeasurement;
  },
  UNSET_NEAREST_MEASUREMENT(state) {
    state.nearestMeasurement = {};
  },
  SET_IS_NEAREST_MEASUREMENT_LOADING(state, isNearestMeasurementLoading) {
    state.isNearestMeasurementLoading = isNearestMeasurementLoading;
  },
  UNSET_IS_NEAREST_MEASUREMENT_LOADING(state) {
    state.isNearestMeasurementLoading = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
