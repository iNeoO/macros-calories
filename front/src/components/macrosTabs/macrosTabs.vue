<template>
  <div>
    <div class="uk-margin">
      <macrosTabsWeeksTotal />
    </div>
    <div class="uk-margin">
      <wrapperDatepicker :inputclass="'uk-form-width-medium'"
        :inlineBlock="'uk-display-inline-block'"
        :placeholder="$t('macros.date')|capitalize"
        :options="options"
        v-model="date" />
    </div>
    <div v-for="(alimentsDay, index) in alimentsWeek" :key="alimentsDay._id">
      <macrosTabsWeek :aliments="alimentsDay.aliments"
        :alimentsDay="alimentsDay"
        :date="formatingDate(alimentsDay.date)"
        :id="alimentsDay._id"
        :index="index" />
    </div>
  </div>
</template>

<script src="./macrosTabs.js"></script>
<style scoped src="./macrosTabs.css"></style>
