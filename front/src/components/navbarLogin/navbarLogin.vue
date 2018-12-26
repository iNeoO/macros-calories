<template>
  <li class="navbar-item">
    <a @click="isLoginVisible = true">
      {{ $t('default.login') }}</a>

    <vk-modal :show.sync="isLoginVisible">
      <vk-modal-close @click="isLoginVisible = false"></vk-modal-close>
      <vk-modal-title slot="header">{{ $t('default.login')|capitalize }}</vk-modal-title>
      <form @submit.prevent="saveLoginForm">
        <div class="uk-margin">
          <label class="uk-form-label" for="usernameLogin">
            {{ $t('login.username')|capitalize }} *
          </label>
          <div class="uk-form-controls">
            <input class="uk-input input-blue input-blue-persistant"
              v-model="loginForm.username"
              autocomplete="username"
              id="usernameLogin"
              type="text"
              autofocus
              :placeholder="$t('login.username')|capitalize">
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="passwordLogin">
            {{ $t('login.password')|capitalize }} *
          </label>
          <div class="uk-form-controls">
            <input class="uk-input input-blue input-blue-persistant"
              autocomplete="current-password"
              v-model="loginForm.password"
              id="passwordLogin"
              type="password"
              :placeholder="$t('login.password')|capitalize">
          </div>
        </div>
        <vk-spinner v-if="isLoginLoading"></vk-spinner>
        <transition name="slide-fade">
          <div class="uk-alert-danger uk-alert" v-if="loginFormAlert.isVisble">
            <a class="uk-alert-close uk-close"></a>
            <p>{{ loginFormAlert.text }}</p>
          </div>
        </transition>
        <div slot="footer" class="uk-text-right">
          <vk-button class="uk-margin-small-right button-white"
            @click="isLoginVisible = false">{{ $t('default.cancel') }}</vk-button>
          <vk-button type="primary"
            htmlType="submit"
            class="button-blue"
            :disabled="isLoginLoading">{{ $t('default.login') }}</vk-button>
        </div>
      </form>
    </vk-modal>

  </li>
</template>

<script src="./navbarLogin.js"></script>
<style scoped src="./navbarLogin.css"></style>
