import { mapActions, mapGetters } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'macroAlimentEatedModal',
  props: {
    alimentEatedEdit: {
      default: null,
    },
    isAlimentEatedVisible: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      alimentEatedAlert: {
        isVisble: false,
        text: '',
      },
      mealsTypes: [
        {
          value: 'breakfast',
          text: 'macro.alimentsEated.mealsTypes.breakfast',
        },
        {
          value: 'lunch',
          text: 'macro.alimentsEated.mealsTypes.lunch',
        },
        {
          value: 'diner',
          text: 'macro.alimentsEated.mealsTypes.diner',
        },
      ],
      alimentEated: {},
    };
  },
  computed: {
    ...mapGetters({
      aliment: 'alimentStore/aliment',
    }),
    isAlimentEatedModalVisible: {
      get() {
        return this.isAlimentEatedVisible;
      },
      set(isVisble) {
        this.alimentEated = {};
        this.alimentEatedAlert = {
          isVisble: false,
          text: '',
        };
        this.$emit('updateIsAlimentEatedVisible', isVisble);
      },
    },
  },
  methods: {
    ...mapActions({
      postAliment: 'alimentStore/postAliment',
    }),
    resetAliment() {
      this.alimentEated = cloneDeep(this.alimentEatedEdit);
    },
    saveAliment() {
      this.alimentEatedAlert.isVisble = false;
      if (this.alimentEated.name &&
        typeof this.alimentEated.quantity === 'number' &&
        typeof this.alimentEated.kcal === 'number' &&
        typeof this.alimentEated.carbohydrate === 'number' &&
        typeof this.alimentEated.fat === 'number' &&
        typeof this.alimentEated.protein === 'number') {
        if (this.alimentEatedEdit) {
          this.$emit('editAlimentEated', [this.alimentEated, this.alimentEatedEdit]);
        } else {
          const aliment = {
            name: this.alimentEated.name,
            quantity: this.alimentEated.quantity,
            kcal: this.alimentEated.kcal,
            carbohydrate: this.alimentEated.carbohydrate,
            fat: this.alimentEated.fat,
            protein: this.alimentEated.protein,
            fiber: this.alimentEated.fiber,
            description: this.alimentEated.description,
          };
          this.postAliment(aliment).then(() => {
            this.$emit('addAlimentEated', this.alimentEated);
          });
        }
      } else {
        this.alimentEatedAlert.text = this.$t('macro.alimentsEated.alertInput');
        this.alimentEatedAlert.isVisble = true;
      }
    },
  },
  watch: {
    isAlimentEatedVisible: {
      handler(newValue) {
        if (newValue && this.alimentEatedEdit) {
          this.alimentEated = cloneDeep(this.alimentEatedEdit);
        } else {
          this.alimentEated = {};
        }
      },
    },
  },
};
