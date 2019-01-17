import { mapGetters, mapActions } from 'vuex';
import groupBy from 'lodash/groupBy';
import cloneDeep from 'lodash/cloneDeep';

import wrapperDatepicker from '@/components/wrapperDatepicker/wrapperDatepicker.vue';
import macroTypeheadTemplate from '@/components/macroTypeheadTemplate/macroTypeheadTemplate.vue';
import wrapperTypeHead from '@/components/wrapperTypeHead/wrapperTypeHead.vue';
import macroAlimentsEated from '@/components/macroAlimentsEated/macroAlimentsEated.vue';
import macroAlimentEatedModal from '@/components/macroAlimentEatedModal/macroAlimentEatedModal.vue';

export default {
  name: 'macroForm',
  data() {
    return {
      alertUserCompleteNeeded: false,
      alertAlimentEated: {
        isVisble: false,
        text: '',
      },
      alertMacro: {
        isVisble: false,
        text: '',
      },
      isAlimentEatedVisible: false,
      template: macroTypeheadTemplate,
      quantity: '',
      mealType: '',
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
      aliment: null,
      alimentSelected: {},
      alimentsEated: {
        weight: null,
        height: null,
        activityType: {
          type: '',
          objKcal: 0,
          variation: 0,
        },
        date: null,
        aliments: [],
      },
      inputAttrs: {
        placeholder: this.$t('macro.alimentsEated.typeHead'),
        class: 'input-blue uk-input',
      },
    };
  },
  computed: {
    ...mapGetters({
      user: 'userStore/user',
      nearestMeasurement: 'measurementStore/nearestMeasurement',
      aliments: 'alimentStore/aliments',
      isAlimentLoading: 'alimentStore/isAlimentLoading',
      macrosDates: 'macroStore/macrosDates',
      macro: 'macroStore/macro',
    }),
    isValidUser() {
      return this.user &&
        this.user.nutriments &&
        typeof this.user.nutriments.carbohydrate === 'number' &&
        typeof this.user.nutriments.fat === 'number' &&
        typeof this.user.nutriments.protein === 'number' &&
        typeof this.user.nutriments.fiber === 'number';
    },
  },
  methods: {
    ...mapActions({
      getUser: 'userStore/getUser',
      getNearestMeasurement: 'measurementStore/getNearestMeasurement',
      getAliments: 'alimentStore/getAliments',
      getMacrosDates: 'macroStore/getMacrosDates',
      getMacro: 'macroStore/getMacro',
      patchMacro: 'macroStore/patchMacro',
      postMacro: 'macroStore/postMacro',
    }),
    getLabel(item) {
      return item ? item.name : null;
    },
    updateItems(search) {
      const query = {
        search,
        sort: 'name',
        limit: 5,
      };
      this.getAliments(query);
    },
    disabledDate(date) {
      for (let i = 0; i < this.macrosDates.length; i += 1) {
        const macroDate = new Date(this.macrosDates[i]);
        if (date.toDateString() === macroDate.toDateString()) {
          return true;
        }
      }
      return false;
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
    addAliment() {
      if (this.mealType &&
          this.quantity &&
          this.alimentSelected) {
        const alimentEated = {
          name: this.alimentSelected.name,
          mealType: this.mealType,
          quantity: this.quantity,
        };
        alimentEated.quantity = this.quantity;
        alimentEated.kcal = Math.round(this.alimentSelected.kcal *
          (alimentEated.quantity / this.alimentSelected.quantity));
        alimentEated.carbohydrate = Math.round(this.alimentSelected.carbohydrate *
          (alimentEated.quantity / this.alimentSelected.quantity));
        alimentEated.fat = Math.round(this.alimentSelected.fat *
          (alimentEated.quantity / this.alimentSelected.quantity));
        alimentEated.protein = Math.round(this.alimentSelected.protein *
          (alimentEated.quantity / this.alimentSelected.quantity));
        alimentEated.fiber = Math.round(this.alimentSelected.fiber *
          (alimentEated.quantity / this.alimentSelected.quantity));
        this.alertAlimentEated.isVisble = false;
        this.alimentsEated.aliments.push(alimentEated);
        this.alimentSelected = null;
        this.quantity = '';
      } else {
        this.alertAlimentEated.text = this.$t('macro.alimentsEated.alertInput');
        this.alertAlimentEated.isVisble = true;
      }
    },
    addAlimentEated(aliment) {
      this.isAlimentEatedVisible = false;
      const { quantity, quantityEated } = aliment;
      const newAliment = {
        name: aliment.name,
        quantity: quantityEated,
        kcal: Math.round(aliment.kcal * (quantity / quantityEated)),
        carbohydrate: Math.round(aliment.carbohydrate * (quantity / quantityEated)),
        fat: Math.round(aliment.fat * (quantity / quantityEated)),
        protein: Math.round(aliment.protein * (quantity / quantityEated)),
        fiber: Math.round(aliment.fiber * (quantity / quantityEated)),
        description: aliment.description,
        mealType: aliment.mealType,
      };
      this.alimentsEated.aliments.push(newAliment);
    },
    editAlimentEated([aliment, oldAliment]) {
      for (let i = 0; i < this.alimentsEated.aliments.length; i += 1) {
        if (this.isAlimentsEquals(this.alimentsEated.aliments[i], oldAliment)) {
          this.$set(this.alimentsEated.aliments, i, aliment);
        }
      }
      this.isAlimentEatedVisible = false;
    },
    removeAlimentEated(row) {
      this.alimentsEated.aliments =
        this.alimentsEated.aliments.filter(aliment => !this.isAlimentsEquals(aliment, row));
    },
    isAlimentsEquals(alimentA, alimentB) {
      const keys = Object.keys(alimentA);
      return keys.every(key => alimentA[key] === alimentB[key]);
    },
    openModal(aliment) {
      this.aliment = aliment;
      this.isAlimentEatedVisible = true;
      this.alertMacro.isVisble = false;
    },
    redirectAfterSave() {
      const date = new Date(this.alimentsEated.date);
      date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
      this.$router.push({ path: '/macros', query: { date: this.formatingDate(date) } });
    },
    preSaveMacro() {
      if (this.alimentsEated.activityType.type &&
        this.alimentsEated.date &&
        ((this.alimentsEated.activityType.type !== 'custom'
        && this.alimentsEated.activityType.objKcal === 0) ||
        (this.alimentsEated.activityType.type === 'custom'
        && this.alimentsEated.activityType.objKcal !== 0))) {
        const groups = groupBy(this.alimentsEated.aliments, 'mealType');
        const aliments = [].concat(groups.breakfast ||
          [], groups.lunch || [], groups.diner || []);
        const alimentsEated = {
          ...this.alimentsEated,
          aliments,
        };
        this.getNearestMeasurement(this.alimentsEated.date).then(() => {
          alimentsEated.height = this.nearestMeasurement.height;
          alimentsEated.weight = this.nearestMeasurement.weight;
          this.saveMacro(alimentsEated);
        });
      } else {
        this.alertMacro.text = this.$t('macro.alimentsEated.alertInput');
        this.alertMacro.isVisble = true;
      }
    },
    saveMacro(alimentsEated) {
      if (this.alimentsEated._id) {
        alimentsEated._id = this.alimentsEated._id;
        this.patchMacro(alimentsEated).then(this.redirectAfterSave);
      } else {
        this.postMacro(alimentsEated).then(this.redirectAfterSave);
      }
    },
  },
  mounted() {
    const query = {
      sort: 'name',
      limit: 5,
    };
    const params = this.$route.query;
    this.getMacrosDates().then(() => {
      if (params.date && !params.id) {
        for (let i = 0; i < this.macrosDates.length; i += 1) {
          if (params.date === this.formatingDate(this.macrosDates[i])) {
            return;
          }
        }
        this.alimentsEated.date = new Date(params.date);
      }
    });
    if (params.id) {
      this.getMacro(params.id).then(() => {
        this.alimentsEated = cloneDeep(this.macro);
      });
    }
    this.getUser().then(() => {
      if (!this.isValidUser) {
        this.alertUserCompleteNeeded = true;
      } else {
        this.alimentsEated.activityType = this.user.activityType;
        this.alimentsEated.nutriments = this.user.nutriments;
      }
    });
    this.getAliments(query);
  },
  components: {
    wrapperTypeHead, wrapperDatepicker, macroAlimentsEated, macroAlimentEatedModal,
  },
};
