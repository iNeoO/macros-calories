import Vue from 'vue';
import Vuikit from 'vuikit';
import VuikitIcons from '@vuikit/icons';
import Notifications from 'vue-notification';
import V2Datepicker from 'v2-datepicker';
import VueChartkick from 'vue-chartkick';
import Highcharts from 'highcharts';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'v2-datepicker/lib/index.css';
import '@vuikit/theme/dist/vuikit.min.css';
import 'typeface-roboto/index.css';

import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import filters from './filters';
import api from './modules/api';
import './assets/style/style.css';
import './assets/style/helper.css';

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(V2Datepicker);
Vue.use(Notifications);
Vue.use(Vuikit);
Vue.use(VuikitIcons);
Vue.use(VueChartkick, { adapter: Highcharts });
Vue.filter('capitalize', filters.capitalize);

Vue.prototype.$API = api();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
