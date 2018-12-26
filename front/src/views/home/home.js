import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      scale: [{
        dataKey: `${this.$t('home.weight')} (g)`,
        min: 0,
      }, {
        dataKey: 'year',
        min: 0,
        max: 1,
      }],
      height: 400,
    };
  },
  computed: {
    ...mapGetters({
      measurementsStore: 'measurementStore/measurements',
      isMeasurementsLoading: 'measurementStore/isMeasurementsLoading',
    }),
    measurementStats() {
      return this.measurementsStore.reduce((stats, measurement) => {
        stats[measurement.date] = measurement.weight;
        return stats;
      }, {});
    },
  },
  methods: {
    ...mapActions({
      getMeasurements: 'measurementStore/getMeasurements',
    }),
  },
  mounted() {
    this.getMeasurements();
  },
};
