<template>
  <div :class="`uk-margin ${inlineBlock}`">
    <label v-if="label" class="uk-form-label" :for="id">{{label}}</label>
    <vautocomplete :items="items"
      :input-attrs="inputAttrs"
      :inputClass="inputClass"
      :disabled="disabled"
      v-model="typeHeadValue"
      :minLen="1"
      :wait="200"
      :get-label="getLabel"
      :component-item='componentItem'
      @update-items="updateItems">
    </vautocomplete>
  </div>
</template>

<script src="./wrapperTypeHead.js"></script>
<style src="./wrapperTypeHead.css"></style>
