import groupBy from 'lodash/groupBy';

export default {
  name: 'macroAlimentsEated',
  props: {
    aliments: {
      default: () => [],
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      alimentsSorted: [],
    };
  },
  computed: {
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
          this.alimentsSorted = [...alimentsSorted, some];
        }
      },
      deep: true,
    },
  },
  methods: {
    rowClass(row) {
      return `cell-${row.mealType}`;
    },
  },
};
