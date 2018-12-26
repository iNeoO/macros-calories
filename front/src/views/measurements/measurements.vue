<template>
  <vk-card class="card-border-radius--4px margin-bottom--40">
    <vk-card-title class="card-title">{{ $t('measurements.title') }}</vk-card-title>
    <vk-button type="primary" @click="openModal()" class="button-blue button-display">
      <vk-icon icon="plus"></vk-icon> {{ $t('measurements.addMeasurement') }}
    </vk-button>
    <measurementModal :isMeasurementVisible="isMeasurementVisible"
      :measurementId="measurementId"
      @updateIsMeasurementVisible="isMeasurementVisible = false" />
    <measurementTab @updateMeasurement="openModal" />
  </vk-card>
</template>

<script src="./measurements.js"></script>
<style scoped src="./measurements.css"></style>
