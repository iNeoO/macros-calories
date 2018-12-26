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
          this.alimentsSorted = [].concat(groups.breakfast ||
            [], groups.lunch || [], groups.diner || []);
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
