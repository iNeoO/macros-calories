import { mapGetters, mapActions } from 'vuex';

import navbarLogin from '@/components/navbarLogin/navbarLogin.vue';
import navbarProfile from '@/components/navbarProfile/navbarProfile.vue';
import navbarRegister from '@/components/navbarRegister/navbarRegister.vue';
import navbarToggle from '@/components/navbarToggle/navbarToggle.vue';

export default {
  name: 'navbar',
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      logout: 'authStore/deleteToken',
    }),
    goTo(route) {
      this.$router.push(route);
    },
  },
  computed: {
    ...mapGetters({
      isLogged: 'authStore/isLogged',
    }),
  },
  components: {
    navbarLogin, navbarProfile, navbarRegister, navbarToggle,
  },
};
