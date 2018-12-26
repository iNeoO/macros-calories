import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'navbarLogin',
  data() {
    return {
      loginForm: {},
      isLoginVisible: false,
      loginFormAlert: {
        isVisible: false,
        text: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      isLoginLoading: 'authStore/isLoginLoading',
    }),
  },
  methods: {
    ...mapActions({
      postToken: 'authStore/postToken',
      getUser: 'userStore/getUser',
    }),
    saveLoginForm() {
      if (this.loginForm.username &&
        this.loginForm.password) {
        this.loginFormAlert.isVisible = false;
        const loginForm = {
          ...this.loginForm,
        };
        loginForm.username = loginForm.username.toLowerCase();
        this.postToken(loginForm).then(({ data }) => {
          if (!data || !data.data) {
            this.loginFormAlertMsg = this.$t('login.alertWrongCredentials');
            this.loginFormAlert = true;
          } else {
            this.isLoginVisible = false;
            this.getUser();
            this.$router.push('/');
          }
        });
      } else {
        this.loginFormAlert.text = this.$t('login.alertInput');
        this.loginFormAlert.isVisible = true;
      }
    },
  },
};
