<template>
  <div class="uk-overflow-auto macrosTabsDayTotal">
    <h4 class="display-inline-block margin-bottom--0 margin-top--20px">
      {{ $t('macros.tabs.totalTitle')|capitalize }}
    </h4>
    <vk-table
      class="weeksTotal-table margin-top--0"
      :data="[totalAlimentsForTheDay, getNutriments, getDiff]"
      :style="titleColumn"
      responsive>
      <vk-table-column :title="$t('macros.tabs.title')"
        cell="title"
        cellClass="cellClassDayTotal"></vk-table-column>
      <vk-table-column :title="$t('macros.tabs.kcal')"
        cell="kcal"
        cellClass="cellClassDayTotal"></vk-table-column>
      <vk-table-column :title="`${$t('macros.tabs.carbohydrate')} (kcal)`"
        cell="carbohydrate"
        cellClass="cellClassDayTotal"></vk-table-column>
      <vk-table-column :title="`${$t('macros.tabs.fat')} (kcal)`"
        cell="fat"
        cellClass="cellClassDayTotal"></vk-table-column>
      <vk-table-column :title="`${$t('macros.tabs.protein')} (kcal)`"
        cell="protein"
        cellClass="cellClassDayTotal"></vk-table-column>
        <vk-table-column :title="`${$t('macros.tabs.fiber')} (g)`"
          cell="fiber"
          cellClass="cellClassDayTotal"></vk-table-column>
    </vk-table>
  </div>
</template>

<script src="./macrosTabsDayTotal.js"></script>
<style src="./macrosTabsDayTotal.css"></style>
