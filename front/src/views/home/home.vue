<template>
  <div>
    <vk-card class="uk-width-1-4@m">
      <vk-card-title>{{ $t('home.weight') }}</vk-card-title>
      <div>
        <area-chart
          :data="measurementStats"
          :xtitle="$t('home.date')"
          :ytitle="$t('home.weight')"
          :label="$t('home.weight')">
        </area-chart>
      </div>
    </vk-card>
  </div>
</template>

<script src="./home.js"></script>
<style scoped src="./home.css"></style>
