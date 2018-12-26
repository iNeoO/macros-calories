<template>
  <div :class="`uk-margin ${inlineBlock}`">
    <label v-if="label" class="uk-form-label" :for="id">{{label}}</label>
    <div :class="`uk-form-controls ${inlineBlock}`">
      <v2-datepicker-range v-if="range"
        @change="$emit('change')"
        :id="id"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="date"
        :lang="lang"
        :picker-options="options">
      </v2-datepicker-range>
      <v2-datepicker v-else
        @change="$emit('change')"
        :id="id"
        :picker-options="options"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="date"
        :lang="lang">
      </v2-datepicker>
    </div>
  </div>
</template>

<script src="./wrapperDatepicker.js"></script>
<style src="./wrapperDatepicker.css"></style>
