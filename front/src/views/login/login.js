import navbar from '@/components/navbar/navbar.vue';

const table = require('../../assets/img/table.jpeg');

export default {
  name: 'login',
  computed: {
    window() {
      return window;
    },
    backgroundTable() {
      return {
        'background-image': `url(${table})`,
      };
    },
  },
  components: {
    navbar,
  },
};
