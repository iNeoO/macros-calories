import { mapGetters } from 'vuex';
import navMenu from '@/components/navMenu/navMenu.vue';


export default {
  name: 'navbarToggle',
  data() {
    return {
      isMenuVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      isLogged: 'authStore/isLogged',
    }),
  },
  methods: {
    isActiveRoute(route) {
      return this.$router.currentRoute.name === route;
    },
    changeRoute(route) {
      this.isMenuVisible = false;
      this.$router.push(route);
    },
  },
  components: {
    navMenu,
  },
};
