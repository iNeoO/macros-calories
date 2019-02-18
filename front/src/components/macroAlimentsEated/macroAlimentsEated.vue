<template>
  <div class="uk-overflow-auto">
    <vk-table v-if="aliments.length"
      class="alimentsEated-table"
      :rowClass="rowClass"
      :data="alimentsSorted"
      :style="titleColumn"
      responsive>
      <vk-table-column :title="$t('macro.alimentsEated.name')"
        cell="name"
        cellClass="cellClassAlimentEated"></vk-table-column>
      <vk-table-column :title="$t('macro.alimentsEated.quantityEated')"
        cell="quantity"
        cellClass="cellClassAlimentEated"></vk-table-column>
      <vk-table-column :title="$t('macro.alimentsEated.kcal')"
        cell="kcal"
        cellClass="cellClassAlimentEated"></vk-table-column>
      <vk-table-column :title="$t('macro.alimentsEated.carbohydrate')"
        cell="carbohydrate"
        cellClass="cellClassAlimentEated"></vk-table-column>
      <vk-table-column :title="$t('macro.alimentsEated.fat')"
        cell="fat"
        cellClass="cellClassAlimentEated"></vk-table-column>
      <vk-table-column :title="$t('macro.alimentsEated.protein')"
        cell="protein"
        cellClass="cellClassAlimentEated"></vk-table-column>
      <vk-table-column :title="$t('macro.alimentsEated.fiber')"
        cell="fiber"
        cellClass="cellClassAlimentEated"></vk-table-column>
      <vk-table-column :title="$t('default.edit')">
        <p v-vk-margin slot-scope="{ row }">
          <vk-icon-button
            v-if="row.quantity !== '-'"
            class="button-blue red-gradiant button-icon uk-margin-small-right"
            icon="trash"
            @click="$emit('removeAlimentEated', row)">
          </vk-icon-button>
          <vk-icon-button
            v-if="row.quantity !== '-'"
            class="button-blue button-icon"
            icon="pencil"
            @click="$emit('editAlimentEated', row)">
          </vk-icon-button>
        </p>
      </vk-table-column>
    </vk-table>
  </div>
</template>

<script src="./macroAlimentsEated.js"></script>
<style src="./macroAlimentsEated.css"></style>
