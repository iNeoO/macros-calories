import { mapGetters, mapActions } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import wrapperDatepicker from '@/components/wrapperDatepicker/wrapperDatepicker.vue';
import {
  activitiesTypes,
  programsTypes,
  objForm,
  getFemaleKcal,
  getMaleKcal,
  proteinKcaltoG,
  carbohydrateKcaltoG,
  fatKcaltoG,
} from '@/helpers/programsTypes';

export default {
  name: 'profileInfo',
  data() {
    return {
      first: true,
      alertMeasurementNeeded: false,
      user: {
        activityType: {},
      },
      formAlert: {
        visible: false,
        text: '',
      },
      kcal: 0,
      percentNutriment: {
        carbohydrate: 33,
        fat: 33,
        protein: 33,
      },
      nutriments: {
        carbohydrate: 0,
        fat: 0,
        protein: 0,
      },
      programType: '',
      activitiesTypes,
      programsTypes,
      objForm,
    };
  },
  computed: {
    ...mapGetters({
      userStore: 'userStore/user',
      nearestMeasurement: 'measurementStore/nearestMeasurement',
    }),
    programsTypeskeys() {
      return Object.keys(this.programsTypes);
    },
    sexe() {
      return this.user.sexe === 'female' ? 1 : 2;
    },
    objkcal() {
      return this.getObjKcal + this.user.activityType.variation;
    },
    getObjKcal: {
      get() {
        if (this.user.activityType.type) {
          if (this.user.activityType.type !== 'custom') {
            this.setKcal();
          }
          return this.objForm[this.user.activityType.type].func(this.kcal);
        }
        return null;
      },
      set(kcal) {
        this.kcal = kcal;
      },
    },
    isWarningRangeVisible() {
      const percent = this.percentNutriment.carbohydrate +
        this.percentNutriment.fat +
        this.percentNutriment.protein;
      return percent < 98 || percent > 100;
    },
  },
  methods: {
    ...mapActions({
      getNearestMeasurement: 'measurementStore/getNearestMeasurement',
      getUser: 'userStore/getUser',
      patchUser: 'userStore/patchUser',
    }),
    proteinKcaltoG,
    carbohydrateKcaltoG,
    fatKcaltoG,
    debouncer() {
      if (this.first &&
        typeof this.user.nutriments.carbohydrate !== 'undefined' &&
        typeof this.user.nutriments.fat !== 'undefined' &&
        typeof this.user.nutriments.protein !== 'undefined') {
        this.percentNutriment.carbohydrate = this.user.nutriments.carbohydrate;
        this.percentNutriment.fat = this.user.nutriments.fat;
        this.percentNutriment.protein = this.user.nutriments.protein;
        this.changeFat();
        this.changeProtein();
        this.changeCarbohydrate();
      } else {
        this.nutriments.fat = Math.floor(this.nearestMeasurement.weight * 1 * 9);
        this.nutriments.protein = Math.floor(this.nearestMeasurement.weight * 1.6 * 4);
        this.nutriments.carbohydrate = this.objkcal - this.nutriments.fat - this.nutriments.protein;
        this.percentNutriment.fat = Math
          .floor((this.nutriments.fat / this.objkcal) * 100);
        this.percentNutriment.protein = Math
          .floor((this.nutriments.protein / this.objkcal) * 100);
        this.percentNutriment.carbohydrate = Math
          .floor((this.nutriments.carbohydrate / this.objkcal) * 100);
      }
      this.first = false;
    },
    programTypeChange() {
      if (this.programType !== 'custom') {
        this.user.activityType.variation = this.programsTypes[this.programType]
          .value[this.user.sexe];
      }
    },
    changeSexe() {
      this.programTypeChange();
      if (this.user.activityType.type !== 'custom') {
        this.setKcal();
      }
    },
    setKcal() {
      if (this.user.birthdate) {
        const old = (new Date().getFullYear()) - this.user.birthdate.getFullYear();
        if (isEmpty(this.nearestMeasurement)) {
          return;
        }
        if (this.user.sexe === 'female') {
          this.kcal = Math.floor(getFemaleKcal(
            this.nearestMeasurement.weight,
            this.nearestMeasurement.height,
            old,
          ));
        } else {
          this.kcal = Math.floor(getMaleKcal(
            this.nearestMeasurement.weight,
            this.nearestMeasurement.height,
            old,
          ));
        }
      }
    },
    changeProtein() {
      this.nutriments.protein = Math.floor(this.objkcal *
        (this.percentNutriment.protein / 100));
    },
    changeCarbohydrate() {
      this.nutriments.carbohydrate = Math.floor(this.objkcal *
        (this.percentNutriment.carbohydrate / 100));
    },
    changeFat() {
      this.nutriments.fat = Math.floor(this.objkcal *
        (this.percentNutriment.fat / 100));
    },
    disabledDate(date) {
      if (date.getTime() > Date.now()) {
        return true;
      }
      return false;
    },
    saveUser() {
      this.formAlert.visible = false;
      if (this.user.username &&
        this.user.email &&
        this.user.birthdate &&
        this.user.sexe) {
        if (this.nearestMeasurement && !isEmpty(this.nearestMeasurement)) {
          this.user.activityType.objKcal = this.user.activityType.type === 'custom' ? this.kcal : 0;
          this.user.nutriments.carbohydrate = this.percentNutriment.carbohydrate;
          this.user.nutriments.protein = this.percentNutriment.protein;
          this.user.nutriments.fat = this.percentNutriment.fat;
          this.user.nutriments.fiber = this.user.nutriments.fiber || 0;
        }
        this.patchUser(this.user);
      } else {
        this.formAlert.text = this.$t('profile.alertInput');
        this.formAlert.visible = true;
      }
    },
    init(userData) {
      const user = cloneDeep(userData);
      user.birthdate = new Date(user.birthdate);
      const keys = Object.keys(this.programsTypes);
      for (let i = 0; i < keys.length; i += 1) {
        if (this.programsTypes[keys[i]].value[user.sexe] === user.activityType.variation) {
          this.programType = keys[i];
          break;
        }
      }
      if (!this.programType) {
        this.programType = 'custom';
      }
      this.user = user;
      if (user.activityType.type === 'custom') {
        this.kcal = user.activityType.objKcal;
      } else {
        this.setKcal();
      }
    },
    isEmpty(object) {
      return isEmpty(object);
    },
  },
  created() {
    this.debouncer = debounce(this.debouncer, 400);
  },
  mounted() {
    this.getNearestMeasurement().then(() => {
      if (isEmpty(this.nearestMeasurement) || !this.nearestMeasurement) {
        this.alertMeasurementNeeded = true;
      }
    });
    if (!isEmpty(this.userStore)) {
      this.init(this.userStore);
    }
  },
  watch: {
    userStore(newValue, oldValue) {
      if (oldValue && newValue) {
        this.init(newValue);
      }
    },
    objkcal(newValue) {
      if (newValue) {
        this.debouncer.call(this);
      }
    },
    percentNutriment: {
      handler() {
        this.changeFat();
        this.changeProtein();
        this.changeCarbohydrate();
      },
      deep: true,
    },
  },
  components: {
    wrapperDatepicker,
  },
};
