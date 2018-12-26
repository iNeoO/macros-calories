<template>
  <vk-card class="card-border-radius--4px margin-bottom--40px">
    <vk-card-title class="card-title" >{{ $t('aliments.title') }}</vk-card-title>
    <vk-button type="primary" @click="openModal()" class="button-blue button-display">
      <vk-icon icon="plus"></vk-icon> {{ $t('aliments.addAliment') }}
    </vk-button>
    <alimentModal :isAlimentVisible="isAlimentVisible"
      :alimentId="alimentId"
      @updateIsAlimentVisible="isAlimentVisible = false" />
    <alimentTab @updateAliment="openModal"/>
  </vk-card>
</template>

<script src="./aliments.js"></script>
<style scoped src="./aliments.css"></style>
