import { mapGetters, mapActions } from 'vuex';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

export default {
  name: 'alimentModal',
  data() {
    return {
      query: {},
      aliments: [],
    };
  },
  computed: {
    ...mapGetters({
      alimentsStore: 'alimentStore/aliments',
      alimentsCount: 'alimentStore/alimentsCount',
      isAlimentsLoading: 'alimentStore/isAlimentsLoading',
    }),
    titleColumn() {
      return {
        '--titleAlimentColumn1': `"${this.$options.filters
          .capitalize(this.$t('aliments.aliment.name'))}"`,
        '--titleAlimentColumn2': `"${this.$options.filters
          .capitalize(this.$t('aliments.aliment.quantity'))}"`,
        '--titleAlimentColumn3': `"${this.$options.filters
          .capitalize(this.$t('aliments.aliment.kcal'))}"`,
        '--titleAlimentColumn4': `"${this.$options.filters
          .capitalize(this.$t('aliments.aliment.carbohydrate'))}"`,
        '--titleAlimentColumn5': `"${this.$options.filters
          .capitalize(this.$t('aliments.aliment.fat'))}"`,
        '--titleAlimentColumn6': `"${this.$options.filters
          .capitalize(this.$t('aliments.aliment.protein'))}"`,
        '--titleAlimentColumn7': `"${this.$options.filters
          .capitalize(this.$t('aliments.aliment.fiber'))}"`,
        '--titleAlimentColumn8': `"${this.$options.filters
          .capitalize(this.$t('aliments.aliment.description'))}"`,
      };
    },
  },
  methods: {
    ...mapActions({
      getAliments: 'alimentStore/getAliments',
    }),
    debouncer() {
      this.setQuery();
    },
    setQuery() {
      const query = {};
      if (this.query.search) {
        query.search = this.query.search;
        this.query.page = 1;
      }
      const key = Object.keys(this.query.sortedBy)[0];
      query.sort = this.query.sortedBy[key] === 'desc' ? `-${key}` : key;
      query.skip = (this.query.page * 10) - 10;
      query.limit = 10;
      this.$router.replace({ query });
      this.getAliments(query);
    },
  },
  mounted() {
    const params = this.$route.query;
    const query = {
      page: 1,
      search: '',
      sortedBy: { name: 'asc' },
    };
    if (params.sort) {
      const sort = {};
      if (params.sort.indexOf('-') === -1) {
        sort[params.sort] = 'asc';
      } else {
        sort[params.sort.substring(1)] = 'desc';
      }
      query.sortedBy = sort;
    }
    if (params.search) {
      query.search = params.search;
    }
    if (params.skip) {
      const skip = parseInt(params.skip, 10);
      query.page = (skip + 10) / 10;
    }
    this.query = query;
    this.setQuery();
  },
  created() {
    this.debouncer = debounce(this.debouncer, 400);
  },
  watch: {
    alimentsStore: {
      handler(newValue) {
        if (newValue) {
          this.aliments = cloneDeep(newValue);
        }
      },
    },
    query: {
      handler(newValue, oldValue) {
        if (!isEmpty(oldValue)) {
          this.debouncer.call(this);
        }
      },
      deep: true,
    },
  },
};
