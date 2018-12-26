import alimentModal from '@/components/alimentModal/alimentModal.vue';
import alimentTab from '@/components/alimentTab/alimentTab.vue';

export default {
  name: 'aliments',
  data() {
    return {
      show: false,
      alimentId: null,
      isAlimentVisible: false,
    };
  },
  methods: {
    openModal(id) {
      this.alimentId = id;
      this.isAlimentVisible = true;
    },
  },
  mounted() {
    this.isAlimentVisible = false;
  },
  components: {
    alimentModal, alimentTab,
  },
};
