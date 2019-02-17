<template>
  <div>
    <div class="uk-margin uk-display-inline-block">
      <wrapperDatepicker :inputclass="'uk-form-width-medium'"
        :range="true"
        :inlineBlock="'uk-display-inline-block'"
        :placeholder="$t('measurements.tab.dateRange')|capitalize"
        :options="options"
        v-model="query.date" />
    </div>
    <div class="uk-overflow-auto">
      <vk-table v-if="query.sortedBy"
        :data="measurements"
        :style="titleColumn"
        striped
        responsive
        narrowed
        :sorted-by.sync="query.sortedBy">
        <vk-table-column-sort :title="$t('measurements.measurement.date')"
          cell="date"
          unwrapped
          cellClass="cellClassMeasurement">
          <div slot-scope="{ cell }" v-if="cell" class="uk-display-inline-block">
            <span>{{ formatingDate(cell) }}</span>
          </div>
        </vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.weight')"
          cell="weight"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.breath')"
          cell="breath"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.underBreath')"
          cell="underBreath"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.abdomen')"
          cell="abdomen"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.waist')"
          cell="waist"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.waistTurn')"
          cell="waistTurn"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.butt')"
          cell="butt"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.leftLeg')"
          cell="leftLeg"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.rightLeg')"
          cell="rightLeg"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.leftArm')"
          cell="leftArm"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.rightArm')"
          cell="rightArm"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column-sort :title="$t('measurements.measurement.height')"
          cell="height"
          cellClass="cellClassMeasurement"></vk-table-column-sort>
        <vk-table-column :title="$t('default.description')"
          cell="description"
          cellClass="cellClassMeasurement">
          <div slot-scope="{ cell }" v-if="cell" class="uk-display-inline-block">
            <vk-icon icon="info" v-vk-tooltip="cell" ratio="1.5"></vk-icon>
          </div>
        </vk-table-column>
        <vk-table-column :title="$t('default.edit')"
          cellClass="cellClassMeasurement">
          <vk-icon-button slot-scope="{ row }"
            class="button-blue button-icon"
            icon="pencil"
            @click="$emit('updateMeasurement', row._id)">
          </vk-icon-button>
        </vk-table-column>
      </vk-table>
    </div>
    <div v-if="isMeasurementsLoading" class="uk-overlay-default uk-position-cover"></div>
    <vk-pagination :page.sync="query.page" :perPage="10" :total="measurementsCount" align="center">
      <vk-pagination-page-prev></vk-pagination-page-prev>
      <vk-pagination-pages></vk-pagination-pages>
      <vk-pagination-page-next></vk-pagination-page-next>
    </vk-pagination>
  </div>
</template>

<script src="./measurementTab.js"></script>
<style src="./measurementTab.css"></style>
