import { mapGetters } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import {
  getFemaleKcal,
  getMaleKcal,
  proteinGtoKcal,
  carbohydrateGtoKcal,
  fatGtoKcal,
} from '@/helpers/programsTypes';

export default {
  name: 'macrosTabsDayTotal',
  props: {
    alimentsDay: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dailyObj: 0,
    };
  },
  computed: {
    ...mapGetters({
      user: 'userStore/user',
      nearestMeasurement: 'measurementStore/nearestMeasurement',
    }),
    totalAlimentsForTheDay() {
      const stats = cloneDeep(this.alimentsDay.stats);
      stats.title = this.$t('macros.tabs.total');
      stats.carbohydrate = carbohydrateGtoKcal(stats.carbohydrate);
      stats.fat = fatGtoKcal(stats.fat);
      stats.protein = proteinGtoKcal(stats.protein);
      return stats;
    },
    titleColumn() {
      return {
        '--titleMacrosDayTotalColumn1': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.title'))}"`,
        '--titleMacrosDayTotalColumn2': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.kcal'))}"`,
        '--titleMacrosDayTotalColumn3': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.carbohydrate'))}"`,
        '--titleMacrosDayTotalColumn4': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.fat'))}"`,
        '--titleMacrosDayTotalColumn5': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.protein'))}"`,
        '--titleMacrosDayTotalColumn6': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.fiber'))}"`,
      };
    },
    getNutriments() {
      const nutriment = {
        title: this.$t('macros.tabs.daylyObj'),
        kcal: this.dailyObj,
        carbohydrate: Math.floor((this.dailyObj * this.alimentsDay.nutriments.carbohydrate) / 100),
        protein: Math.floor((this.dailyObj * this.alimentsDay.nutriments.protein) / 100),
        fat: Math.floor((this.dailyObj * this.alimentsDay.nutriments.fat) / 100),
        fiber: this.user.nutriments.fiber,
      };
      return nutriment;
    },
    getDiff() {
      return {
        title: this.$t('macros.tabs.diff'),
        kcal: this.dailyObj - this.totalAlimentsForTheDay.kcal,
        fat: this.getNutriments.fat - this.totalAlimentsForTheDay.fat,
        carbohydrate: this.getNutriments.carbohydrate - this.totalAlimentsForTheDay.carbohydrate,
        protein: this.getNutriments.protein - this.totalAlimentsForTheDay.protein,
        fiber: this.getNutriments.fiber - this.totalAlimentsForTheDay.fiber,
      };
    },
  },
  methods: {
  },
  created() {
    const old = (new Date().getFullYear()) - new Date(this.user.birthdate).getFullYear();
    if (this.user.sexe === 'female') {
      this.dailyObj = Math.floor(getFemaleKcal(
        this.nearestMeasurement.weight,
        this.nearestMeasurement.height,
        old,
      )) + this.user.activityType.variation;
    }
    this.dailyObj = Math.floor(getMaleKcal(
      this.nearestMeasurement.weight,
      this.nearestMeasurement.height,
      old,
    )) + this.user.activityType.variation;
  },
  watch: {
  },
};
