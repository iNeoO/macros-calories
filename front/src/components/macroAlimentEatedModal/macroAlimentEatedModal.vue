<template>
  <vk-modal :show.sync="isAlimentEatedModalVisible">
    <vk-modal-close @click="isAlimentEatedModalVisible = false"></vk-modal-close>
    <vk-modal-title slot="header">{{ $t('aliments.addAliment')|capitalize }}</vk-modal-title>
    <form @submit.prevent="saveAliment">
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentEatedModalName">
          {{ $t('macro.alimentsEated.name')|capitalize }} *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue "
            v-model="alimentEated.name"
            id="alimentEatedModalName"
            type="text"
            autofocus
            :placeholder="$t('macro.alimentsEated.name')|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentEatedModalQuantity">
          {{ $t('macro.alimentsEated.quantity')|capitalize }} (g) *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number.number="alimentEated.quantity"
            id="alimentEatedModalQuantity"
            type="number"
            step="0.01"
            :placeholder="`${$t('macro.alimentsEated.quantity')} (g)`|capitalize">
        </div>
      </div>
      <div class="uk-margin" v-if="!alimentEatedEdit">
        <label class="uk-form-label" for="alimentEatedModalQuantityEated">
          {{ $t('macro.alimentsEated.quantityEated')|capitalize }} (g) *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number.number="alimentEated.quantityEated"
            id="alimentEatedModalQuantityEated"
            type="number"
            step="0.01"
            :placeholder="`${$t('macro.alimentsEated.quantityEated')} (g)`|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentEatedModalKcal">
          {{ $t('macro.alimentsEated.kcal')|capitalize }} *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number="alimentEated.kcal"
            :disabled="isInputDisabled"
            id="alimentEatedModalKcal"
            type="number"
            step="0.01"
            :placeholder="$t('macro.alimentsEated.kcal')|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentEatedModalCarbohydrate">
          {{ $t('macro.alimentsEated.carbohydrate')|capitalize }} (g) *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number="alimentEated.carbohydrate"
            :disabled="isInputDisabled"
            id="alimentEatedModalCarbohydrate"
            type="number"
            step="0.01"
            :placeholder="`${$t('macro.alimentsEated.carbohydrate')} (g)`|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentFat">
          {{ $t('macro.alimentsEated.fat')|capitalize }} (g) *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number="alimentEated.fat"
            :disabled="isInputDisabled"
            id="alimentEatedModalFat"
            type="number"
            step="0.01"
            :placeholder="`${$t('macro.alimentsEated.fat')} (g)`|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentEatedModalProtein">
          {{ $t('macro.alimentsEated.protein')|capitalize }} (g) *
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number="alimentEated.protein"
            :disabled="isInputDisabled"
            id="alimentEatedModalProtein"
            type="number"
            step="0.01"
            :placeholder="`${$t('macro.alimentsEated.protein')} (g)`|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentEatedModalFibre">
          {{ $t('macro.alimentsEated.fiber')|capitalize }} (g)
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            v-model.number="alimentEated.fiber"
            :disabled="isInputDisabled"
            id="alimentEatedModalFibre"
            type="number"
            step="0.01"
            :placeholder="`${$t('macro.alimentsEated.fiber')} (g)`|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentEatedModalDescription">
          {{ $t('macro.alimentsEated.description')|capitalize }}
        </label>
        <div class="uk-form-controls">
          <textarea class="uk-input input-blue"
            v-model="alimentEated.description"
            id="alimentEatedModalDescription"
            type="text"
            :placeholder="$t('macro.alimentsEated.description')|capitalize"></textarea>
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="alimentEatedModalMealType">
          {{ $t('macro.alimentsEated.mealType')|capitalize }} *
        </label>
        <div class="uk-form-controls">
          <select class="uk-select input-blue"
          id="alimentEatedModalMealType"
          v-model="alimentEated.mealType">
            <option v-for="(mealType, index) in mealsTypes"
              :key="index"
              :value="mealType.value">
              {{$t(mealType.text)}}
            </option>
          </select>
        </div>
      </div>
      <transition name="slide-fade">
        <div class="uk-alert-danger uk-alert" v-if="alimentEatedAlert.isVisble">
            <a class="uk-alert-close uk-close"></a>
            <p>{{ alimentEatedAlert.text }}</p>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="uk-alert-primary uk-alert" v-if="isInputDisabled">
            <a class="uk-alert-close uk-close"></a>
            <p>{{ $t('macro.alimentsEated.alertDisabled') }}</p>
        </div>
      </transition>
      <div slot="footer" class="uk-text-right">
        <vk-button class="uk-margin-small-right button-white"
          @click="isAlimentEatedModalVisible = false">{{ $t('default.cancel') }}</vk-button>
        <vk-button class="uk-margin-small-right button-white"
          v-if="alimentEatedEdit"
          @click="resetAliment">{{ $t('default.reset') }}</vk-button>
        <vk-button type="primary"
          htmlType="submit"
          class="button-blue">{{ $t('default.save') }}</vk-button>
      </div>
        </form>
  </vk-modal>
</template>

<script src="./macroAlimentEatedModal.js"></script>
<style scoped src="./macroAlimentEatedModal.css"></style>
