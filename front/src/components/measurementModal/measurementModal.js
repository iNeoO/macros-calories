import { mapGetters, mapActions } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import wrapperDatepicker from '@/components/wrapperDatepicker/wrapperDatepicker.vue';

export default {
  name: 'measurementModal',
  props: {
    measurementId: null,
    isMeasurementVisible: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      MeasurementAlert: {
        isVisble: false,
        text: '',
      },
      measurement: {},
    };
  },
  computed: {
    ...mapGetters({
      measurementsDates: 'measurementStore/measurementsDates',
      measurementStore: 'measurementStore/measurement',
      isMeasurementLoading: 'measurementStore/isMeasurementLoading',
      nearestMeasurement: 'measurementStore/nearestMeasurement',
      isNearestMeasurementLoading: 'measurementStore/isNearestMeasurementLoading',
      measurementsCount: 'measurementStore/measurementsCount',
    }),
    isMeasurementModalVisible: {
      get() {
        return this.isMeasurementVisible;
      },
      set(isVisble) {
        this.measurement = {};
        this.MeasurementAlert = {
          isVisble: false,
          text: '',
        };
        this.$emit('updateIsMeasurementVisible', isVisble);
      },
    },
  },
  methods: {
    ...mapActions({
      getMeasurements: 'measurementStore/getMeasurements',
      getMeasurementsDates: 'measurementStore/getMeasurementsDates',
      getMeasurement: 'measurementStore/getMeasurement',
      getNearestMeasurement: 'measurementStore/getNearestMeasurement',
      patchMeasurement: 'measurementStore/patchMeasurement',
      postMeasurement: 'measurementStore/postMeasurement',
    }),
    resetMeasurement() {
      this.measurement = cloneDeep(this.measurementStore);
    },
    disabledDate(date) {
      if (date.getTime() > Date.now()) {
        return true;
      }
      for (let i = 0; i < this.measurementsDates.length; i += 1) {
        const measurementsDate = new Date(this.measurementsDates[i]);
        if (date.toDateString() === measurementsDate.toDateString()) {
          return true;
        }
      }
      return false;
    },
    saveMeasurement() {
      this.MeasurementAlert.visible = false;
      if (this.measurement.height &&
        this.measurement.weight &&
        this.measurement.breath &&
        this.measurement.underBreath &&
        this.measurement.abdomen &&
        this.measurement.waist &&
        this.measurement.butt &&
        this.measurement.leftLeg &&
        this.measurement.rightLeg &&
        this.measurement.leftArm &&
        this.measurement.rightArm &&
        this.measurement.date) {
        if (this.measurement._id) {
          this.patchMeasurement(this.measurement).then(() => {
            this.getMeasurements(this.$route.query);
            this.isMeasurementModalVisible = false;
          });
        } else {
          this.postMeasurement(this.measurement).then(() => {
            this.getMeasurements(this.$route.query);
            this.isMeasurementModalVisible = false;
          });
        }
      } else {
        this.MeasurementAlert.text = this.$t('measurements.modal.alertInput');
        this.MeasurementAlert.isVisble = true;
      }
    },
  },
  watch: {
    isMeasurementVisible: {
      handler(newValue) {
        if (newValue) {
          this.getMeasurementsDates();
          if (this.measurementId) {
            this.getMeasurement(this.measurementId).then(() => {
              const measurement = cloneDeep(this.measurementStore);
              measurement.date = new Date(measurement.date);
              this.measurement = measurement;
            });
          } else if (this.measurementsCount) {
            this.getNearestMeasurement().then(() => {
              const measurement = cloneDeep(this.nearestMeasurement);
              let dateFind = false;
              let date;
              for (let i = 1; !dateFind; i += 1) {
                date = new Date();
                date.setDate(date.getDate() - i);
                let isDateFind = true;
                for (let j = 0; j < this.measurementsDates.length; j += 1) {
                  const measurementDate = new Date(this.measurementsDates[j]);
                  if (date.toDateString() === measurementDate.toDateString()) {
                    isDateFind = false;
                    break;
                  }
                }
                if (isDateFind) {
                  dateFind = true;
                }
              }
              measurement.date = date;
              delete measurement._id;
              this.measurement = measurement;
            });
          }
        }
      },
    },
  },
  components: {
    wrapperDatepicker,
  },
};
