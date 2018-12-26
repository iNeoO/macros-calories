<template>
  <form class="uk-form-stacked" @submit.prevent="saveMacro">
    <div v-if="isValidUser">
      <vk-grid class="uk-child-width-expand@s">
        <div class="uk-margin">
          <wrapperDatepicker :id="'date'"
            clear
            :inlineBlock="'uk-display-inline-block'"
            :options="{ disabledDate }"
            :disabled="!!alimentsEated.aliments.length"
            :label="`${$t('macro.alimentsEated.date')}`|capitalize"
            :placeholder="$t('macro.alimentsEated.date')|capitalize"
            v-model="alimentsEated.date" />
        </div>
      </vk-grid>
      <transition name="slide-fade">
        <div class="uk-alert-danger uk-alert" v-if="alertMacro.isVisble">
            <a class="uk-alert-close uk-close"></a>
            <p>{{ alertMacro.text }}</p>
        </div>
      </transition>
      <h4>{{ $t('macro.subTitle')|capitalize }}</h4>
      <vk-grid class="uk-child-width-expand@s">
        <div class="uk-form-stacked display-inline-block">
          <wrapperTypeHead :label="$t('macro.alimentsEated.typeHead')"
            :items="aliments"
            :input-attrs="inputAttrs"
            :id="'typeHead-aliments'"
            :inputClass="'input-blue uk-input'"
            v-model="alimentSelected"
            :get-label="getLabel"
            :component-item='template'
            @update-items="updateItems">
          </wrapperTypeHead>
        </div>
        <div class="uk-form-stacked display-inline-block">
          <div class="uk-margin">
            <label class="uk-form-label" for="quantity">
              {{ $t('macro.alimentsEated.quantity')|capitalize }} *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue "
                v-model.number="quantity"
                id="quantity"
                type="number"
                :placeholder="$t('macro.alimentsEated.quantity')|capitalize">
            </div>
          </div>
        </div>
        <div class="uk-form-stacked display-inline-block">
          <div class="uk-margin">
            <label class="uk-form-label" for="mealType">
              {{ $t('macro.alimentsEated.mealType')|capitalize }} *
            </label>
            <div class="uk-form-controls">
              <select class="uk-select input-blue"
              id="mealType"
              v-model="mealType">
                <option v-for="(mealType, index) in mealsTypes"
                  :key="index"
                  :value="mealType.value">
                  {{ $t(mealType.text) }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </vk-grid>
      <transition name="slide-fade">
        <div class="uk-alert-danger uk-alert" v-if="alertAlimentEated.isVisble">
            <a class="uk-alert-close uk-close"></a>
            <p>{{ alertAlimentEated.text }}</p>
        </div>
      </transition>
      <div class="uk-margin uk-text-right">
        <vk-button type="primary"
          class="button-blue uk-margin-small-left uk-margin-small-bottom"
          @click="addAliment">{{ $t('macro.alimentsEated.add') }}
        </vk-button>
        <vk-button class="button-white uk-margin-small-left uk-margin-small-bottom"
          @click="openModal()">{{ $t('macro.alimentsEated.manualAdd') }}
        </vk-button>
        <macroAlimentEatedModal :alimentEatedEdit="aliment"
          @updateIsAlimentEatedVisible="isAlimentEatedVisible = false"
          @editAlimentEated="editAlimentEated"
          @addAlimentEated="addAlimentEated"
          :isAlimentEatedVisible="isAlimentEatedVisible"/>
      </div>
      <div class="uk-margin">
        <macroAlimentsEated :aliments="alimentsEated.aliments"
          @removeAlimentEated="removeAlimentEated"
          @editAlimentEated="openModal"/>
      </div>
      <div class="uk-margin">
        <vk-button class="uk-margin-small-right button-white"
          @click="$router.back()">{{ $t('default.back') }}</vk-button>
        <vk-button type="primary"
          class="button-blue"
          htmlType="submit"
          :disabled="!alimentsEated.aliments.length">{{ $t('default.save') }}</vk-button>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="uk-alert-warning uk-alert" v-if="!isValidUser">
        <a class="uk-alert-close uk-close"></a>
        <p>{{ $t('macro.alimentsEated.invalidUser')|capitalize }}</p>
      </div>
    </transition>
  </form>
</template>

<script src="./macroForm.js"></script>
<style scoped src="./macroForm.css"></style>
