import measurementModal from '@/components/measurementModal/measurementModal.vue';
import measurementTab from '@/components/measurementTab/measurementTab.vue';

export default {
  name: 'measurements',
  data() {
    return {
      measurementId: null,
      isMeasurementVisible: false,
    };
  },
  methods: {
    openModal(id) {
      this.measurementId = id;
      this.isMeasurementVisible = true;
    },
  },
  mounted() {
    this.isMeasurementVisible = false;
  },
  components: {
    measurementModal, measurementTab,
  },
};
