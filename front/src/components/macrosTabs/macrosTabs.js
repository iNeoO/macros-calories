import { mapGetters, mapActions } from 'vuex';

import wrapperDatepicker from '@/components/wrapperDatepicker/wrapperDatepicker.vue';
import macrosTabsWeeksTotal from '@/components/macrosTabsWeeksTotal/macrosTabsWeeksTotal.vue';
import macrosTabsWeek from '@/components/macrosTabsWeek/macrosTabsWeek.vue';

export default {
  name: 'macroForm',
  data() {
    return {
      date: null,
    };
  },
  computed: {
    ...mapGetters({
      alimentsWeek: 'macroStore/macros',
    }),
    options() {
      return {
        disabledDate(time) {
          return time.getDay() !== 1;
        },
      };
    },
    queryDate() {
      return this.$route.query.date;
    },
  },
  methods: {
    ...mapActions({
      getMacros: 'macroStore/getMacros',
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
    setQuery() {
      const from = this.formatingDate(this.date);
      const weekLater = new Date(this.date);
      weekLater.setDate(weekLater.getDate() + 7);
      const to = this.formatingDate(weekLater);
      this.$router.replace({ query: { date: from } });
      const sort = 'date';
      this.getMacros({ from, to, sort });
    },
  },
  mounted() {
    if (this.$route.query.date) {
      this.date = new Date(this.$route.query.date);
    } else {
      const date = new Date();
      date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
      this.date = date;
    }
  },
  watch: {
    date() {
      this.setQuery();
    },
    queryDate(date) {
      const d = new Date(date);
      if (d !== this.date) {
        const from = this.formatingDate(d);
        const weekLater = new Date(d);
        weekLater.setDate(weekLater.getDate() + 7);
        const to = this.formatingDate(weekLater);
        const sort = 'date';
        this.getMacros({ from, to, sort });
      }
    },
  },
  components: {
    wrapperDatepicker, macrosTabsWeek, macrosTabsWeeksTotal,
  },
};
