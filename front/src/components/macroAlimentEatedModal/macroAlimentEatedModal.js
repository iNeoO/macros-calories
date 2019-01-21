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
    isInputDisabled() {
      return (this.alimentEatedEdit &&
        this.alimentEated.quantity !== this.alimentEatedEdit.quantity) || !this.alimentEatedEdit;
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
          if (this.alimentEated.quantity !== this.alimentEatedEdit.quantity) {
            this.alimentEated.kcal = Math.round(this.alimentEatedEdit.kcal *
              (this.alimentEated.quantity / this.alimentEatedEdit.quantity));
            this.alimentEated.carbohydrate = Math.round(this.alimentEatedEdit.carbohydrate *
              (this.alimentEated.quantity / this.alimentEatedEdit.quantity));
            this.alimentEated.fat = Math.round(this.alimentEatedEdit.fat *
              (this.alimentEated.quantity / this.alimentEatedEdit.quantity));
            this.alimentEated.protein = Math.round(this.alimentEatedEdit.protein *
              (this.alimentEated.quantity / this.alimentEatedEdit.quantity));
            this.alimentEated.fiber = Math.round(this.alimentEatedEdit.fiber *
              (this.alimentEated.quantity / this.alimentEatedEdit.quantity) || 0);
          }
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
