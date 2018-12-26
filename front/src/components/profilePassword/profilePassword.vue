<template>
  <form class="uk-form-stacked display-inline-block" @submit.prevent="savePassword">
    <h4>{{ $t('profile.changeUserPassword')|capitalize }}</h4>
    <div class="uk-margin" v-show="false">
      <label class="uk-form-label" for="form-stacked-username-4-password">
        {{ $t('profile.username')|capitalize }} *
      </label>
      <div class="uk-form-controls">
        <input class="uk-input input-blue"
          disabled
          autocomplete="off"
          id="form-stacked-username-4-password"
          type="text"
          v-model="user.username"
          placeholder="Username" />
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="form-stacked-text">
        {{ $t('profile.password')|capitalize }}
      </label>
      <div class="uk-form-controls">
        <input class="uk-input input-blue"
          id="form-stacked-password"
          v-model="user.password"
          autocomplete="current-password"
          type="password"
          :placeholder="$t('profile.password')|capitalize">
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="form-stacked-newPassword">
        {{ $t('profile.newPassword')|capitalize }}
      </label>
      <div class="uk-form-controls">
        <input class="uk-input input-blue"
          id="form-stacked-newPassword"
          type="password"
          autocomplete="off"
          v-model="user.newPassword"
          :placeholder="$t('profile.newPassword')|capitalize">
      </div>
    </div>
    <transition name="slide-fade">
      <div class="uk-alert-danger uk-alert" v-if="formAlert.visible">
        <a class="uk-alert-close uk-close"></a>
        <p>{{ formAlert.text }}</p>
      </div>
    </transition>
    <p v-vk-margin class="float-right">
      <vk-button @click="savePassword" class="button-blue" type="primary" htmlType="submit">
        {{ $t('default.save') }}
      </vk-button>
    </p>
  </form>
</template>

<script src="./profilePassword.js"></script>
<style scoped src="./profilePassword.css"></style>
