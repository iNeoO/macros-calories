<template>
  <vk-navbar-full class="navbar">
    <navbarToggle />

    <vk-navbar-nav slot="right">
        <vk-navbar-nav-item v-if="isLogged"
          :title="$t('menu.macros')"
          @click="goTo('macros')"
          class="navbar-item">
        </vk-navbar-nav-item>
        <vk-navbar-nav-item v-show="isLogged"
          class="navbar-item"
          :title="$t('default.logout')"
          @click="logout">
        </vk-navbar-nav-item>
        <navbarRegister v-show="!isLogged" />
        <navbarLogin v-show="!isLogged" />
    </vk-navbar-nav>
  </vk-navbar-full>
</template>

<script src="./navbar.js"></script>
<style scoped src="./navbar.css"></style>
