import { mapGetters, mapActions } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'alimentModal',
  props: {
    alimentId: null,
    isAlimentVisible: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      alimentAlert: {
        isVisble: false,
        text: '',
      },
      aliment: {},
    };
  },
  computed: {
    ...mapGetters({
      alimentStore: 'alimentStore/aliment',
      isAlimentLoading: 'alimentStore/isAlimentLoading',
    }),
    isAlimentModalVisible: {
      get() {
        return this.isAlimentVisible;
      },
      set(isVisble) {
        this.aliment = {};
        this.alimentAlert = {
          isVisble: false,
          text: '',
        };
        this.$emit('updateIsAlimentVisible', isVisble);
      },
    },
  },
  methods: {
    ...mapActions({
      getAliments: 'alimentStore/getAliments',
      getAliment: 'alimentStore/getAliment',
      patchAliment: 'alimentStore/patchAliment',
      postAliment: 'alimentStore/postAliment',
    }),
    resetAliment() {
      this.aliment = cloneDeep(this.alimentStore);
    },
    saveAliment() {
      this.alimentAlert.visible = false;
      if (this.aliment.name &&
        typeof this.aliment.quantity === 'number' &&
        typeof this.aliment.kcal === 'number' &&
        typeof this.aliment.carbohydrate === 'number' &&
        typeof this.aliment.fat === 'number' &&
        typeof this.aliment.protein === 'number') {
        if (this.aliment._id) {
          this.patchAliment(this.aliment).then(() => {
            this.getAliments(this.$route.query);
            this.isAlimentModalVisible = false;
          });
        } else {
          this.postAliment(this.aliment).then(() => {
            this.getAliments(this.$route.query);
            this.isAlimentModalVisible = false;
          });
        }
      } else {
        this.alimentAlert.text = this.$t('aliments.modal.alertInput');
        this.alimentAlert.isVisble = true;
      }
    },
  },
  watch: {
    isAlimentVisible: {
      handler(newValue) {
        if (newValue && this.alimentId) {
          this.getAliment(this.alimentId).then(() => {
            this.aliment = cloneDeep(this.alimentStore);
          });
        }
      },
    },
  },
};
