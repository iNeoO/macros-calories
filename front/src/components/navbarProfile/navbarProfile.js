import { mapGetters } from 'vuex';

export default {
  name: 'navbarLogin',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      userId: 'authStore/userId',
      user: 'userStore/user',
      isUserLoading: 'userStore/isUserLoading',
    }),
  },
  methods: {
    goToProfileView() {
      this.$router.push('/profile');
    },
  },
};
