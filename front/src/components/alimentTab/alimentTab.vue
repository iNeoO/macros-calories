<template>
  <div>
    <div class="uk-margin">
      <input class="uk-input uk-form-width-medium input-blue input-blue-persistant"
        type="text"
        :placeholder="$t('aliments.tab.search')|capitalize"
        v-model="query.search">
    </div>
    <div class="uk-overflow-auto">
      <vk-table v-if="query.sortedBy"
        :data="aliments"
        :style="titleColumn"
        striped
        narrowed
        responsive
        :sorted-by.sync="query.sortedBy">
        <vk-table-column-sort :title="$t('aliments.aliment.name')"
          cell="name"
          cellClass="cellClassAliment"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('aliments.aliment.quantity')"
          cell="quantity"
          cellClass="cellClassAliment"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('aliments.aliment.kcal')"
          cell="kcal"
          cellClass="cellClassAliment"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('aliments.aliment.carbohydrate')"
          cell="carbohydrate"
          cellClass="cellClassAliment"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('aliments.aliment.fat')"
          cell="fat"
          cellClass="cellClassAliment"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('aliments.aliment.protein')"
          cell="protein"
          cellClass="cellClassAliment"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('aliments.aliment.fiber')"
          cell="fiber"
          cellClass="cellClassAliment"></vk-table-column-sort>
        <vk-table-column :title="$t('aliments.aliment.description')"
          cell="description"
          cellClass="cellClassAliment"></vk-table-column>
        <vk-table-column :title="$t('default.edit')">
          <vk-icon-button slot-scope="{ row }"
            class="button-blue button-icon"
            icon="pencil"
            @click="$emit('updateAliment', row._id)">
          </vk-icon-button>
        </vk-table-column>
      </vk-table>
    </div>
    <div v-if="isAlimentsLoading" class="uk-overlay-default uk-position-cover"></div>
    <vk-pagination :page.sync="query.page" :perPage="10" :total="alimentsCount" align="center">
      <vk-pagination-page-prev></vk-pagination-page-prev>
      <vk-pagination-pages></vk-pagination-pages>
      <vk-pagination-page-next></vk-pagination-page-next>
    </vk-pagination>
  </div>
</template>

<script src="./alimentTab.js"></script>
<style src="./alimentTab.css"></style>
