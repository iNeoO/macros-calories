import { mapGetters } from 'vuex';
import isEmpty from 'lodash/isEmpty';
import {
  getFemaleKcal,
  getMaleKcal,
  proteinGtoKcal,
  proteinKcaltoG,
  carbohydrateGtoKcal,
  carbohydrateKcaltoG,
  fatGtoKcal,
  fatKcaltoG,
  objForm,
} from '@/helpers/programsTypes';

export default {
  name: 'macroTabsWeek',
  props: {
    alimentsDay: {
      type: Object,
      default: () => ({}),
    },
    date: {
      type: String,
      default: '',
    },
    id: {
      type: String,
    },
    index: {
      type: Number,
      default: 0,
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
    }),
    titleColumn() {
      return {
        '--titleMacrosColumn1': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.name'))}"`,
        '--titleMacrosColumn2': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.quantity'))}"`,
        '--titleMacrosColumn3': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.kcal'))}"`,
        '--titleMacrosColumn4': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.carbohydrate'))}"`,
        '--titleMacrosColumn5': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.fat'))}"`,
        '--titleMacrosColumn6': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.protein'))}"`,
        '--titleMacrosColumn7': `"${this.$options.filters
          .capitalize(this.$t('macros.tabs.fiber'))}"`,
      };
    },
    totalAlimentsForTheDay() {
      const { stats } = this.alimentsDay;
      return {
        name: this.$t('macros.tabs.total'),
        kcal: stats.kcal,
        carbohydrateG: stats.carbohydrate,
        carbohydrateKcal: carbohydrateGtoKcal(stats.carbohydrate),
        fatG: stats.fat,
        fatKcal: fatGtoKcal(stats.fat),
        proteinG: stats.protein,
        proteinKcal: proteinGtoKcal(stats.protein),
        fiber: stats.fiber,
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
    objInKcal() {
      const carbohydrate = Math.floor((this.dailyObj *
        this.alimentsDay.nutriments.carbohydrate) / 100);
      const protein = Math.floor((this.dailyObj *
        this.alimentsDay.nutriments.protein) / 100);
      const fat = Math.floor((this.dailyObj *
        this.alimentsDay.nutriments.fat) / 100);
      return {
        carbohydrate,
        protein,
        fat,
      };
    },
    objForTheDay() {
      return {
        name: this.$t('macros.tabs.daylyObj'),
        kcal: this.dailyObj,
        carbohydrateG: this.objInG.carbohydrate,
        carbohydrateKcal: this.objInKcal.carbohydrate,
        fatG: this.objInG.fat,
        fatKcal: this.objInKcal.fat,
        proteinG: this.objInG.protein,
        proteinKcal: this.objInKcal.protein,
        fiber: this.user.nutriments.fiber,
      };
    },
    diffForTheDay() {
      return {
        name: this.$t('macros.tabs.diff'),
        kcal: this.objForTheDay.kcal - this.totalAlimentsForTheDay.kcal,
        carbohydrateG: this.objForTheDay.carbohydrateG -
          this.totalAlimentsForTheDay.carbohydrateG,
        carbohydrateKcal: this.objForTheDay.carbohydrateKcal -
          this.totalAlimentsForTheDay.carbohydrateKcal,
        fatG: this.objForTheDay.fatG -
          this.totalAlimentsForTheDay.fatG,
        fatKcal: this.objForTheDay.fatKcal -
          this.totalAlimentsForTheDay.fatKcal,
        proteinG: this.objForTheDay.proteinG -
          this.totalAlimentsForTheDay.proteinG,
        proteinKcal: this.objForTheDay.proteinKcal -
          this.totalAlimentsForTheDay.proteinKcal,
        fiber: this.objForTheDay.fiber -
          this.totalAlimentsForTheDay.fiber,
      };
    },
  },
  methods: {
    isEmpty,
    rowClass(row) {
      return `cell-${row.mealType}`;
    },
    alignButton() {
      return {
        'uk-margin': true,
        'uk-text-right': this.alimentsDay && !!this.alimentsDay.aliments.length,
      };
    },
  },
  mounted() {
  },
  created() {
    const old = (new Date().getFullYear()) - new Date(this.user.birthdate).getFullYear();
    if (this.user.activityType.type === 'custom') {
      this.dailyObj = this.user.activityType.objKcal + this.user.activityType.variation;
    } else {
      let objKcal = 0;
      if (this.user.sexe === 'female') {
        objKcal = Math.floor(getFemaleKcal(
          this.alimentsDay.weight,
          this.alimentsDay.height,
          old,
        ));
      } else {
        objKcal = Math.floor(getMaleKcal(
          this.alimentsDay.weight,
          this.alimentsDay.height,
          old,
        ));
      }
      this.dailyObj = objForm[this.user.activityType.type].func(objKcal) +
        this.user.activityType.variation;
    }
  },
};
