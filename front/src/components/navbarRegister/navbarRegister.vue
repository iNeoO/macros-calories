<template>
  <li class="navbar-item">
    <a @click="isRegisterVisible = true">
      {{ $t('default.register') }}</a>

    <vk-modal :show.sync="isRegisterVisible">
      <vk-modal-close @click="isRegisterVisible = false"></vk-modal-close>
      <vk-modal-title slot="header">{{ $t('default.register')|capitalize }}</vk-modal-title>
      <form class="uk-form-horizontal" @submit.prevent="saveRegisterForm">
        <div class="uk-margin">
          <label class="uk-form-label" for="username">
            {{ $t('register.username')|capitalize }} *
          </label>
          <div class="uk-form-controls">
            <input class="uk-input input-blue"
              v-model="registerForm.username"
              autocomplete="username"
              id="username"
              type="text"
              autofocus
              :placeholder="$t('register.username')|capitalize">
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="password">
            {{ $t('register.password')|capitalize }} *
          </label>
          <div class="uk-form-controls">
            <input class="uk-input input-blue"
              v-model="registerForm.password"
              autocomplete="current-password"
              id="password"
              type="password"
              :placeholder="$t('register.password')|capitalize">
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="email">
            {{ $t('register.email')|capitalize }} *
          </label>
          <div class="uk-form-controls">
            <input class="uk-input input-blue"
              v-model="registerForm.email"
              id="email"
              type="email"
              :placeholder="$t('register.email')|capitalize">
          </div>
        </div>
        <div class="uk-margin">
          <wrapperDatepicker :id="'birthdate'"
            :initialView="'year'"
            :options="{ disabledDate }"
            :label="`${$t('register.dateOfBirth')} *`|capitalize"
            :placeholder="$t('register.dateOfBirth')|capitalize"
            v-model="registerForm.birthdate" />
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="email">
            {{ $t('register.sexe')|capitalize }} *
          </label>
          <div class="uk-form-controls">
          <label>
            <input class="uk-radio"
              v-model="registerForm.sexe"
              type="radio"
              name="male"
              value="male">
              {{ $t('register.male') }}
          </label>
          <label>
            <input class="uk-radio"
              v-model="registerForm.sexe"
              type="radio"
              name="female"
              value="female">
              {{ $t('register.female') }}
          </label>
        </div>
        </div>
        <transition name="slide-fade">
          <div class="uk-alert-danger uk-alert" v-if="registerFormAlert.isVisble">
            <a class="uk-alert-close uk-close"></a>
            <p>{{ registerFormAlert.text }}</p>
          </div>
        </transition>
        <div slot="footer" class="uk-text-right">
          <vk-button class="uk-margin-small-right button-white"
            @click="isRegisterVisible = false">{{ $t('default.cancel') }}</vk-button>
          <vk-button type="primary"
            htmlType="submit"
            class="button-blue">{{ $t('default.register') }}</vk-button>
        </div>
      </form>
    </vk-modal>
  </li>
</template>

<script src="./navbarRegister.js"></script>
<style scoped src="./navbarRegister.css"></style>
