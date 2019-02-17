<template>
  <vk-modal :show.sync="isMeasurementModalVisible">
    <vk-modal-close @click="isMeasurementModalVisible = false"></vk-modal-close>
    <vk-modal-title slot="header">
      {{ $t('measurements.addMeasurement')|capitalize }}
    </vk-modal-title>
    <form @submit.prevent="saveMeasurement">
      <vk-grid gutter="large" class="uk-child-width-expand@s">
        <div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementHeight">
              {{ $t('measurements.measurement.height')|capitalize }} (cm) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.height"
                id="measurementHeight"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.height')} (cm)`|capitalize">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementWeight">
              {{ $t('measurements.measurement.weight')|capitalize }} (kg) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.weight"
                id="measurementWeight"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.weight')} (kg)`|capitalize">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementBreath">
              {{ $t('measurements.measurement.breath')|capitalize }} (cm) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.breath"
                id="measurementBreath"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.breath')} (cm)`|capitalize">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementUnderBreath">
              {{ $t('measurements.measurement.underBreath')|capitalize }} (cm) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.underBreath"
                id="measurementUnderBreath"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.underBreath')} (cm)`|capitalize">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementWaist">
              {{ $t('measurements.measurement.waist')|capitalize }} (cm) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.waist"
                id="measurementWaist"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.waist')} (cm)`|capitalize">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementWaistTurn">
              {{ $t('measurements.measurement.waistTurn')|capitalize }} (cm) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.waistTurn"
                id="measurementWaistTurn"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.waistTurn')} (cm)`|capitalize">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementAbdomen">
              {{ $t('measurements.measurement.abdomen')|capitalize }} (cm) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.abdomen"
                id="measurementAbdomen"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.abdomen')} (cm)`|capitalize">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementButt">
              {{ $t('measurements.measurement.butt')|capitalize }} (cm) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.butt"
                id="measurementButt"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.butt')} (cm)`|capitalize">
            </div>
          </div>
        </div>
        <div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementLeftLeg">
              {{ $t('measurements.measurement.leftLeg')|capitalize }} (cm) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.leftLeg"
                id="measurementLeftLeg"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.leftLeg')} (cm)`|capitalize">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementRightLeg">
              {{ $t('measurements.measurement.rightLeg')|capitalize }} (cm) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.rightLeg"
                id="measurementRightLeg"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.rightLeg')} (cm)`|capitalize">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementLeftArm">
              {{ $t('measurements.measurement.leftArm')|capitalize }} (cm) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.leftArm"
                id="measurementLeftArm"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.leftArm')} (cm)`|capitalize">
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementRightArm">
              {{ $t('measurements.measurement.rightArm')|capitalize }} (cm) *
            </label>
            <div class="uk-form-controls">
              <input class="uk-input input-blue"
                v-model.number="measurement.rightArm"
                id="measurementRightArm"
                type="number"
                step="0.01"
                :placeholder="`${$t('measurements.measurement.rightArm')} (cm)`|capitalize">
            </div>
          </div>
          <wrapperDatepicker :id="'Date'"
            :disabled="!!measurement._id"
            :options="{ disabledDate }"
            :label="`${$t('measurements.measurement.date')} *`|capitalize"
            :placeholder="`${$t('measurements.measurement.date')} *`|capitalize"
            v-model="measurement.date" />
          <div class="uk-margin">
            <label class="uk-form-label" for="measurementDescription">
              {{ $t('default.description')|capitalize }}
            </label>
            <div class="uk-form-controls">
              <textarea class="uk-input input-blue"
                v-model="measurement.description"
                id="measurementDescription"
                type="text"
                autofocus
                :placeholder="$t('default.description')|capitalize"></textarea>
            </div>
          </div>
        </div>
      </vk-grid>
      <transition name="slide-fade">
        <div class="uk-alert-danger uk-alert" v-if="MeasurementAlert.isVisble">
          <a class="uk-alert-close uk-close"></a>
          <p>{{ MeasurementAlert.text }}</p>
        </div>
      </transition>
      <div slot="footer" class="uk-text-right">
        <vk-button class="button-white uk-margin-small-bottom"
          @click="isMeasurementModalVisible = false">{{ $t('default.cancel') }}</vk-button>
        <vk-button class="uk-margin-small-left button-white uk-margin-small-bottom"
          v-if="measurementId"
          @click="resetMeasurement">{{ $t('default.reset') }}</vk-button>
        <vk-button type="primary"
          htmlType="submit"
          class="button-blue uk-margin-small-left uk-margin-small-bottom"
          :disabled="isMeasurementLoading || isNearestMeasurementLoading">
          {{ $t('default.save') }}
        </vk-button>
      </div>
    </form>
  </vk-modal>
</template>

<script src="./measurementModal.js"></script>
<style scoped src="./measurementModal.css"></style>
