import { mapGetters } from 'vuex';
import profileInfo from '@/components/profileInfo/profileInfo.vue';
import profilePassword from '@/components/profilePassword/profilePassword.vue';

export default {
  name: 'profile',
  components: {
    profileInfo, profilePassword,
  },
  computed: {
    ...mapGetters({
      user: 'userStore/user',
    }),
  },
};
