<template>
  <div>
    <div v-for="menu in menus" :key="menu.text" class="margin-bottom--10px">
      <router-link :to="menu.to"
        class="menus"
        active-class="menu-item-active"
        :exact="menu.to === '/'">
        <div class="menu-item" @click="$emit('closeMenu')">
          <font-awesome-icon :icon="menu.icon" class="menu-icon" /> {{menu.text}}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script src="./navMenu.js"></script>
<style scoped src="./navMenu.css"></style>
