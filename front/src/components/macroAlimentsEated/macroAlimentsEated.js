import { mapGetters } from 'vuex';
import {
  getFemaleKcal,
  getMaleKcal,
  proteinKcaltoG,
  carbohydrateKcaltoG,
  fatKcaltoG,
  objForm,
} from '@/helpers/programsTypes';
import groupBy from 'lodash/groupBy';

export default {
  name: 'macroAlimentsEated',
  props: {
    aliments: {
      default: () => [],
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    activityType: {
      type: Object,
      default: () => ({}),
    },
    nutriments: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      alimentsSorted: [],
      dailyObj: 0,
    };
  },
  computed: {
    ...mapGetters({
      user: 'userStore/user',
    }),
    objForTheDay() {
      return {
        name: this.$t('macros.tabs.daylyObj'),
        quantity: '-',
        kcal: this.dailyObj,
        carbohydrate: this.objInG.carbohydrate,
        fat: this.objInG.fat,
        protein: this.objInG.protein,
        fiber: this.nutriments.fiber,
      };
    },
    objInKcal() {
      const carbohydrate = Math.floor((this.dailyObj *
        this.nutriments.carbohydrate) / 100);
      const protein = Math.floor((this.dailyObj *
        this.nutriments.protein) / 100);
      const fat = Math.floor((this.dailyObj *
        this.nutriments.fat) / 100);
      return {
        carbohydrate,
        protein,
        fat,
      };
    },
    objInG() {
      const obj = this.objInKcal;
      return {
        carbohydrate: carbohydrateKcaltoG(obj.carbohydrate),
        protein: proteinKcaltoG(obj.protein),
        fat: fatKcaltoG(obj.fat),
      };
    },
    titleColumn() {
      return {
        '--titleMeasurementColumn1': `"${this.$options.filters
          .capitalize(this.$t('macro.alimentsEated.name'))}"`,
        '--titleMeasurementColumn2': `"${this.$options.filters
          .capitalize(this.$t('macro.alimentsEated.quantityEated'))}"`,
        '--titleMeasurementColumn3': `"${this.$options.filters
          .capitalize(this.$t('macro.alimentsEated.kcal'))}"`,
        '--titleMeasurementColumn4': `"${this.$options.filters
          .capitalize(this.$t('macro.alimentsEated.carbohydrate'))}"`,
        '--titleMeasurementColumn5': `"${this.$options.filters
          .capitalize(this.$t('macro.alimentsEated.fat'))}"`,
        '--titleMeasurementColumn6': `"${this.$options.filters
          .capitalize(this.$t('macro.alimentsEated.protein'))}"`,
        '--titleMeasurementColumn7': `"${this.$options.filters
          .capitalize(this.$t('macro.alimentsEated.fiber'))}"`,
        '--titleMeasurementColumn8': `"${this.$options.filters
          .capitalize(this.$t('macro.alimentsEated.quantityEated'))}"`,
      };
    },
  },
  watch: {
    aliments: {
      handler(newValue) {
        if (newValue) {
          this.displayData();
        }
      },
      deep: true,
    },
  },
  methods: {
    rowClass(row) {
      return `cell-${row.mealType}`;
    },
    displayData() {
      const groups = groupBy(this.aliments, 'mealType');
      const alimentsSorted = [].concat(groups.breakfast ||
        [], groups.lunch || [], groups.diner || []);
      const some = alimentsSorted.reduce((acc, aliment) => {
        acc.kcal += aliment.kcal;
        acc.carbohydrate += aliment.carbohydrate;
        acc.fat += aliment.fat;
        acc.protein += aliment.protein;
        acc.fiber += aliment.fiber;
        return acc;
      }, {
        name: 'total',
        quantity: '-',
        kcal: 0,
        carbohydrate: 0,
        fat: 0,
        protein: 0,
        fiber: 0,
      });
      this.alimentsSorted = [...alimentsSorted, some, this.objForTheDay];
    },
  },
  created() {
    this.aliments = this.aliments;
    const old = (new Date().getFullYear()) - new Date(this.user.birthdate).getFullYear();
    if (this.activityType) {
      if (this.activityType.type === 'custom') {
        this.dailyObj = this.activityType.objKcal +
        this.activityType.variation;
      } else {
        let objKcal = 0;
        if (this.user.sexe === 'female') {
          objKcal = Math.floor(getFemaleKcal(
            this.weight,
            this.height,
            old,
          ));
        } else {
          objKcal = Math.floor(getMaleKcal(
            this.weight,
            this.height,
            old,
          ));
        }
        this.dailyObj = objForm[this.activityType.type].func(objKcal) +
        this.activityType.variation;
        this.displayData();
      }
    }
  },
};
