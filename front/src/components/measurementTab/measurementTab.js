import { mapGetters, mapActions } from 'vuex';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import wrapperDatepicker from '@/components/wrapperDatepicker/wrapperDatepicker.vue';

export default {
  name: 'measurementModal',
  data() {
    return {
      query: {},
      measurements: [],
    };
  },
  computed: {
    ...mapGetters({
      measurementsStore: 'measurementStore/measurements',
      measurementsCount: 'measurementStore/measurementsCount',
      isMeasurementsLoading: 'measurementStore/isMeasurementsLoading',
    }),
    options() {
      return {
        disabledDate(time) {
          return time > new Date();
        },
      };
    },
    titleColumn() {
      return {
        '--titleMeasurementColumn1': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.date'))}"`,
        '--titleMeasurementColumn2': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.weight'))}"`,
        '--titleMeasurementColumn3': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.breath'))}"`,
        '--titleMeasurementColumn4': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.underBreath'))}"`,
        '--titleMeasurementColumn5': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.abdomen'))}"`,
        '--titleMeasurementColumn6': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.waist'))}"`,
        '--titleMeasurementColumn7': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.butt'))}"`,
        '--titleMeasurementColumn8': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.leftLeg'))}"`,
        '--titleMeasurementColumn9': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.rightLeg'))}"`,
        '--titleMeasurementColumn10': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.leftArm'))}"`,
        '--titleMeasurementColumn11': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.rightArm'))}"`,
        '--titleMeasurementColumn12': `"${this.$options.filters
          .capitalize(this.$t('measurements.measurement.height'))}"`,
        '--titleMeasurementColumn13': `"${this.$options.filters
          .capitalize(this.$t('default.description'))}"`,
      };
    },
  },
  methods: {
    ...mapActions({
      getMeasurements: 'measurementStore/getMeasurements',
    }),
    debouncer() {
      this.setQuery();
    },
    formatingDate(date) {
      const d = new Date(date);
      let month = d.getMonth() + 1;
      let day = d.getDate();
      const year = d.getFullYear();
      if (month < 2) {
        month = `0${month}`;
      }
      if (day < 2) {
        day = `0${day}`;
      }
      return [year, month, day].join('-');
    },
    setQuery() {
      const query = {};
      if (this.query.date && this.query.date.length) {
        query.from = this.formatingDate(this.query.date[0]);
        query.to = this.formatingDate(this.query.date[1]);
      }
      const key = Object.keys(this.query.sortedBy)[0];
      query.sort = this.query.sortedBy[key] === 'desc' ? `-${key}` : key;
      query.skip = (this.query.page * 10) - 10;
      query.limit = 10;
      this.$router.replace({ query });
      this.getMeasurements(query);
    },
  },
  mounted() {
    const params = this.$route.query;
    const query = {
      page: 1,
      date: [],
      sortedBy: { date: 'desc' },
    };
    if (params.sort) {
      const sort = {};
      if (params.sort.indexOf('-') === -1) {
        sort[params.sort] = 'asc';
      } else {
        sort[params.sort.substring(1)] = 'desc';
      }
      query.sortedBy = sort;
    }
    if (params.from && params.to) {
      query.date = [new Date(params.from), new Date(params.to)];
    }
    if (params.skip) {
      const skip = parseInt(params.skip, 10);
      query.page = (skip + 10) / 10;
    }
    this.query = query;
    this.setQuery();
  },
  created() {
    this.debouncer = debounce(this.debouncer, 400);
  },
  watch: {
    measurementsStore: {
      handler(newValue) {
        if (newValue) {
          this.measurements = cloneDeep(newValue);
        }
      },
    },
    query: {
      handler(newValue, oldValue) {
        if (!isEmpty(oldValue)) {
          this.debouncer.call(this);
        }
      },
      deep: true,
    },
  },
  components: {
    wrapperDatepicker,
  },
};
