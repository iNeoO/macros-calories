<template>
  <vk-card class="card-border-radius--4px margin-bottom--40px">
    <vk-card-title class="card-title">Profile : {{user.username}}</vk-card-title>
      <vk-grid gutter="large" class="uk-child-width-expand@s">
        <profileInfo />
        <profilePassword />
      </vk-grid>
  </vk-card>
</template>

<script src="./profile.js"></script>
<style scoped src="./profile.css"></style>
