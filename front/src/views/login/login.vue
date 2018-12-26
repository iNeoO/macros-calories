<template>
  <div>
    <div class="gradient">
      <div class="absolute full-width background">
        <div class="wrapper">
          <ul class="bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li v-if="window.innerWidth > 1000"></li>
            <li v-if="window.innerWidth > 1000"></li>
            <li v-if="window.innerWidth > 1000"></li>
            <li v-if="window.innerWidth > 1000"></li>
            <li v-if="window.innerWidth > 1000"></li>
          </ul>
        </div>
      </div>
      <div class="relative title">
        <div class="title--text absolute">
          <h1 class="uk-heading-primary uk-light" >
            {{ $t('default.title') }}
          </h1>
          <p class="uk-light">
            {{ $t('login.subTitle') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./login.js"></script>
<style scoped src="./login.css"></style>
