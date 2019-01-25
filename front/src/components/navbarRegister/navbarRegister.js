import { mapActions, mapGetters } from 'vuex';
import wrapperDatepicker from '@/components/wrapperDatepicker/wrapperDatepicker.vue';

export default {
  name: 'navbarRegister',
  data() {
    return {
      registerForm: {
        activityType: {
          type: '',
          objKcal: 0,
        },
        birthdate: new Date('1990'),
      },
      activitiesTypes: [
        {
          value: 'drying',
          text: 'register.activitiesTypes.drying',
        },
        {
          value: 'weightLoss',
          text: 'register.activitiesTypes.weightLoss',
        },
        {
          value: 'gainMuscularMass',
          text: 'register.activitiesTypes.gainMuscularMass',
        },
        {
          value: 'custom',
          text: 'register.activitiesTypes.custom',
        },
      ],
      registerFormAlert: {
        text: '',
        isVisble: false,
      },
      isRegisterVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoading: 'authStore/isUserLoading',
    }),
  },
  methods: {
    ...mapActions({
      postUser: 'userStore/postUser',
      postToken: 'authStore/postToken',
    }),
    disabledDate(date) {
      if (date.getTime() > Date.now()) {
        return true;
      }
      return false;
    },
    saveRegisterForm() {
      if (this.registerForm.username &&
        this.registerForm.password &&
        this.registerForm.email &&
        this.registerForm.birthdate &&
        this.registerForm.sexe) {
        this.registerFormAlert.isVisble = false;
        this.registerForm.activityType = {
          type: 'normalActivity',
        };
        this.registerForm.nutriments = {
          fiber: 25,
        };
        const registerForm = {
          ...this.registerForm,
        };
        registerForm.username = registerForm.username.toLowerCase();
        this.postUser(registerForm).then(() => {
          const form = {
            username: registerForm.username,
            password: registerForm.password,
          };
          this.postToken(form).then(() => {
            this.registerFormAlert.isVisible = false;
            this.isRegisterVisible = false;
            this.$router.push('/');
          });
        });
      } else {
        this.registerFormAlert.text = this.$t('register.alertInput');
        this.registerFormAlert.isVisble = true;
      }
    },
  },
  components: {
    wrapperDatepicker,
  },
};
