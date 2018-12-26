import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'profileForm',
  data() {
    return {
      user: {},
      formAlert: {
        visible: false,
        text: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      userStore: 'userStore/user',
    }),
  },
  methods: {
    ...mapActions({
      getUser: 'userStore/getUser',
      patchUserPassword: 'userStore/patchUserPassword',
    }),
    savePassword() {
      this.formAlert.visible = false;
      if (this.user.password &&
        this.user.newPassword) {
        this.patchUserPassword(this.user);
      } else {
        this.formAlert.text = this.$t('profile.alertInput');
        this.formAlert.visible = true;
      }
    },
  },
};
