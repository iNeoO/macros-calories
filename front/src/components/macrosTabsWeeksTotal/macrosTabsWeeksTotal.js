import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'macrosTabsWeeksTotal',
  data() {
    return {
      titles: [
        'kcal',
        'carbohydrate',
        'fat',
        'protein',
        'fiber',
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: 'userStore/user',
      macrosStats: 'macroStore/macrosStats',
      isMacrosStatsLoading: 'macroStore/isMacrosStatsLoading',
    }),
    weeksNumbers() {
      return Object.keys(this.macrosStats);
    },
  },
  methods: {
    ...mapActions({
      getMacrosStats: 'macroStore/getMacrosStats',
    }),
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
    getDate(date) {
      const monday = new Date(date);
      monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
      return this.formatingDate(monday);
    },
  },
  mounted() {
    this.getMacrosStats();
  },
};
