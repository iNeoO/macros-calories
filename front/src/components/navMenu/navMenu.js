export default {
  name: 'navMenu',
  data() {
    return {
      menus: [
        {
          icon: 'home',
          name: 'home',
          text: this.$t('menu.home'),
          to: '/',
        },
        {
          icon: 'table',
          name: 'macros',
          text: this.$t('menu.macros'),
          to: '/macros',
        },
        {
          icon: 'weight',
          name: 'measurements',
          text: this.$t('menu.measurements'),
          to: '/measurements',
        },
        {
          icon: 'utensils',
          name: 'aliments',
          text: this.$t('menu.aliments'),
          to: '/aliments',
        },
        {
          icon: 'user',
          name: 'profile',
          text: this.$t('menu.profile'),
          to: '/profile',
        },
      ],
    };
  },
  computed: {
  },
};
