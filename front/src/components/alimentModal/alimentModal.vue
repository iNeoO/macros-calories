<template>
  <vk-modal :show.sync="isAlimentModalVisible">
    <vk-modal-close @click="isAlimentModalVisible = false"></vk-modal-close>
    <vk-modal-title slot="header">{{ $t('aliments.addAliment')|capitalize }}</vk-modal-title>
    <form @submit.prevent="saveAliment">
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentName">
          {{ $t('aliments.aliment.name')|capitalize }} *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue "
            v-model="aliment.name"
            id="alimentName"
            type="text"
            autofocus
            :placeholder="$t('aliments.aliment.name')|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentQuantity">
          {{ $t('aliments.aliment.quantity')|capitalize }} *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number.number="aliment.quantity"
            id="alimentQuantity"
            type="number"
            :placeholder="$t('aliments.aliment.quantity')|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentKcal">
          {{ $t('aliments.aliment.kcal')|capitalize }} *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number="aliment.kcal"
            id="alimentKcal"
            type="number"
            :placeholder="$t('aliments.aliment.kcal')|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentCarbohydrate">
          {{ $t('aliments.aliment.carbohydrate')|capitalize }} (g) *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number="aliment.carbohydrate"
            id="alimentCarbohydrate"
            type="number"
            :placeholder="`${$t('aliments.aliment.carbohydrate')} (g)`|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentFat">
          {{ $t('aliments.aliment.fat')|capitalize }} (g) *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number="aliment.fat"
            id="alimentFat"
            type="number"
            :placeholder="`${$t('aliments.aliment.fat')} (g)`|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentProtein">
          {{ $t('aliments.aliment.protein')|capitalize }} (g) *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number="aliment.protein"
            id="alimentProtein"
            type="number"
            :placeholder="`${$t('aliments.aliment.protein')} (g)`|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentFibre">
          {{ $t('aliments.aliment.fiber')|capitalize }} (g)
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number="aliment.fiber"
            id="alimentFibre"
            type="number"
            :placeholder="`${$t('aliments.aliment.fiber')} (g)`|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentDescription">
          {{ $t('aliments.aliment.description')|capitalize }}
        </label>
        <div class="uk-form-controls">
          <textarea class="uk-input input-blue"
            v-model="aliment.description"
            id="alimentDescription"
            type="text"
            :placeholder="$t('aliments.aliment.description')|capitalize"></textarea>
        </div>
      </div>
      <vk-spinner v-if="isAlimentLoading"></vk-spinner>
      <transition name="slide-fade">
        <div class="uk-alert-danger uk-alert" v-if="alimentAlert.isVisble">
            <a class="uk-alert-close uk-close"></a>
            <p>{{ alimentAlert.text }}</p>
        </div>
      </transition>
      <div slot="footer" class="uk-text-right">
        <vk-button class="uk-margin-small-left button-white uk-margin-small-bottom"
          @click="isAlimentModalVisible = false">{{ $t('default.cancel') }}</vk-button>
        <vk-button class="uk-margin-small-left button-white uk-margin-small-bottom"
          v-if="alimentId"
          @click="resetAliment">{{ $t('default.reset') }}</vk-button>
        <vk-button type="primary"
          htmlType="submit"
          class="button-blue uk-margin-small-left uk-margin-small-bottom"
          :disabled="isAlimentLoading">{{ $t('default.save') }}</vk-button>
      </div>
    </form>
  </vk-modal>
</template>

<script src="./alimentModal.js"></script>
<style scoped src="./alimentModal.css"></style>
