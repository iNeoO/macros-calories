<template>
  <vk-navbar>
    <vk-navbar-nav class="navbarHome navbar-item">
      <vk-navbar-nav-item title="Macro-Calories" @click="$router.go('/')"></vk-navbar-nav-item>
    </vk-navbar-nav>
    <vk-navbar-toggle class="navbarToggle navbar-item"
      v-if="isLogged"
      title="Macro-Calories"
      @click="isMenuVisible = true" />
    <vk-offcanvas-content v-if="isLogged">
      <vk-offcanvas :show.sync="isMenuVisible">
        <navMenu @closeMenu="isMenuVisible = false" />
      </vk-offcanvas>
    </vk-offcanvas-content>
  </vk-navbar>
</template>

<script src="./navbarToggle.js"></script>
<style src="./navbarToggle.css"></style>
