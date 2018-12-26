<template>
  <div id="app" v-if="isTokenSet">
    <div class="navbar">
      <navbar/>
    </div>
    <notifications group="error" />
    <notifications group="success" />
    <div class="content-body" role="main">
      <main class="main-body" :class="isPaddingSet">
        <div :style="{ 'max-width': getMaxWidth }">
          <router-view/>
        </div>
      </main>
      <aside class="sidebar" v-if="isLogged">
        <div class="card">
          <navMenu />
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import navbar from '@/components/navbar/navbar.vue';
import navMenu from '@/components/navMenu/navMenu.vue';
import cookieHelper from '@/modules/cookieHelper';

export default {
  name: 'App',
  data() {
    return {
      isTokenSet: false,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    ...mapGetters({
      isLogged: 'authStore/isLogged',
    }),
    getMaxWidth() {
      if (this.$route.name === 'login') {
        return this.windowWidth;
      }
      if (this.windowWidth > 959) {
        return `${this.windowWidth - 310}px`;
      }
      return `${this.windowWidth - 40}px`;
    },
    isPaddingSet() {
      return this.$route.name !== 'login' ? 'padding--20px' : '';
    },
  },
  methods: {
    ...mapActions({
      getToken: 'authStore/getToken',
      getUser: 'userStore/getUser',
    }),
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        if (this.windowWidth !== window.innerWidth) {
          this.windowWidth = window.innerWidth;
        }
      });
    });
  },
  created() {
    const cookie = cookieHelper.getCookie();
    if (cookie) {
      this.getToken(cookie).then(({ data }) => {
        this.isTokenSet = true;
        if (data && data.data && data.data.userId) {
          this.getUser();
        }
      }).catch(() => {
        this.isTokenSet = true;
        cookieHelper.deleteCookie();
        this.$router.push('/login');
      });
    } else {
      this.isTokenSet = true;
      this.$router.push('/login');
    }
  },
  components: {
    navbar, navMenu,
  },
};
</script>

<style>
html, body, #app {
  background-color: #fbfbfb;
  height: 100vh;
  padding: 0;
  margin: 0;
  width: 100%;
  font-weight: 500;
}

#app {
  display: flex;
  flex-direction: column;
}

.navbar {
  box-shadow: 0 5px 15px rgba(0,0,0,0.16);
  min-height: 80px;
}

@media (max-width: 959px){
  .sidebar {
    display: none;
  }
}

.content-body {
  background-color: #fbfbfb;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}

.sidebar {
  width: 250px;
  min-width: 250px;
  padding: 20px;
  padding-right: 0;
  order: 1;
}

.card {
  border-radius: 4px;
  padding: 30px 30px;
  background: #fff;
  color: #666;
  -webkit-box-shadow: 0 5px 15px rgba(0,0,0,.08);
  box-shadow: 0 5px 15px rgba(0,0,0,.08);
}

.main-body {
  order: 2;
  flex-grow: 2;
}

</style>
