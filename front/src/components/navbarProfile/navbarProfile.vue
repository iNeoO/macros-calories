<template>
  <li class="navbar-item">
    <a @click="$router.push('profile')">
      {{ user.username }}
    </a>
  </li>
</template>

<script src="./navbarProfile.js"></script>
<style scoped src="./navbarProfile.css"></style>
