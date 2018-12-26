<template>
  <form class="uk-form-stacked display-inline-block" @submit.prevent="saveUser">
    <h3>{{ $t('profile.changeUserInfo')|capitalize }}</h3>
    <div class="uk-margin">
      <label class="uk-form-label" for="form-stacked-username">
        {{ $t('profile.username')|capitalize }} *
      </label>
      <div class="uk-form-controls">
        <input class="uk-input input-blue"
          disabled
          id="form-stacked-username"
          type="text"
          v-model="user.username"
          placeholder="Username" />
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="form-stacked-email">
        {{ $t('profile.email')|capitalize }} *
      </label>
      <div class="uk-form-controls">
        <input class="uk-input input-blue"
          id="form-stacked-email"
          v-model="user.email"
          type="email"
          placeholder="Email" />
      </div>
    </div>
    <div class="uk-margin">
      <wrapperDatepicker :id="'form-stacked-old'"
        :options="{ disabledDate }"
        @change="setKcal()"
        :label="`${$t('profile.dateOfBirth')} *`|capitalize"
        :placeholder="$t('profile.dateOfBirth')"
        v-model="user.birthdate" />
    </div>
    <div class="uk-margin">
      <label class="uk-form-label">
        {{ $t('register.sexe')|capitalize }} *
      </label>
      <label>
        <input class="uk-radio"
          @change="changeSexe()"
          v-model="user.sexe"
          type="radio"
          name="male"
          value="male">
          {{ $t('profile.male') }}
        </label>
      <label>
        <input class="uk-radio"
          @change="changeSexe()"
          v-model="user.sexe"
          type="radio"
          name="female"
          value="female">
          {{ $t('profile.female') }}
        </label>
    </div>
    <h3>{{ $t('profile.settingsKcal' )}}</h3>
    <transition name="slide-fade">
      <div class="uk-alert-warning uk-alert" v-if="alertMeasurementNeeded">
        <a class="uk-alert-close uk-close"></a>
        <p>{{ $t('profile.alertEmptyMeasure')|capitalize }}</p>
      </div>
    </transition>
    <div v-if="!isEmpty(nearestMeasurement)">
      <h4>{{ $t('profile.kcalObj' )}}</h4>
      <div class="uk-margin">
        <label class="uk-form-label" for="activityType">
          {{ $t('profile.activityType')|capitalize }} *
        </label>
        <select class="uk-select input-blue"
        id="activityType"
        v-model="user.activityType.type">
          <option v-for="(activityType, index) in activitiesTypes"
            :key="index"
            :value="activityType.value">
            {{ $t(activityType.text) }}
          </option>
        </select>
      </div>
      <i v-if="objForm[user.activityType.type]">
        <p>
          <span> {{ $tc(objForm[user.activityType.type].formule, sexe) }}</span>
        </p>
        <p>
          <span> {{ $tc(objForm[user.activityType.type].description, sexe) }}</span>
        </p>
      </i>
      <div class="uk-margin">
        <label class="uk-form-label" for="mealTypeValue">
          {{ $t('profile.objKcal')|capitalize }}
        </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            :disabled="user.activityType.type !== 'custom'"
            v-model.number="getObjKcal"
            id="objKcal"
            type="number"
            :placeholder="$t('profile.objKcal')|capitalize">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="programType">
          {{ $t('profile.programType')|capitalize }} *
        </label>
        <select class="uk-select input-blue"
        id="programType"
        v-model="programType"
        @change="programTypeChange">
          <option v-for="(key, index) in programsTypeskeys"
            :key="index"
            :value="key">
            {{ $t(programsTypes[key].text) }}
          </option>
        </select>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="variation">
          {{ $t('profile.variation')|capitalize }}
         </label>
        <div class="uk-form-controls">
          <input class="uk-input input-blue"
            :disabled="programType !== 'custom'"
            v-model.number="user.activityType.variation"
            id="variation"
            type="number"
            :placeholder="$t('profile.variation')|capitalize">
        </div>
        <!-- <i>
          <p>
            <span>{{ $t('profile.variationDescription') }}</span>
          </p>
        </i> -->
      </div>
      <div class="uk-form-horizontal objForm">
        <div class="uk-margin">
          <label class="uk-form-label blue" for="objectif">
            {{ $t('profile.objectif.title')|capitalize }} <i>(Kcal)</i>
          </label>
          <div class="uk-form-controls">
            <input class="uk-input input-blue blue"
              disabled
              v-model.number="objkcal"
              id="objectif"
              type="number">
          </div>
          <i>{{ $t('profile.objectif.formule')|capitalize }}</i>
        </div>
      </div>
      <h4>{{ $t('profile.nutritionnalsElements') }} </h4>
      <div class="uk-form-horizontal">
        <div class="uk-margin">
          <label class="uk-form-label" for="nutriments-fat">
            {{ $t('profile.nutriments.fat.title')|capitalize }} (Kcal)
          </label>
          <div class="uk-form-controls">
            <input class="uk-input input-blue"
              disabled
              v-model.number="nutriments.fat"
              id="nutriments-fat"
              type="number"
              :placeholder="$t('profile.nutriments.fat.title')|capitalize">
          </div>
          <i>{{ $t('profile.nutriments.fat.formule')|capitalize }}</i>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="nutriments-percent-fat">
            {{ $t('profile.nutriments.fat.title')|capitalize }} :
            {{percentNutriment.fat}}%,
            {{ fatKcaltoG(nutriments.fat) }}g
          </label>
          <input class="uk-range"
            id="nutriments-percent-fat"
            v-model.number="percentNutriment.fat"
            type="range"
            min="0"
            max="100"
            step="1">
        </div>
      </div>
      <div class="uk-form-horizontal">
        <div class="uk-margin">
          <label class="uk-form-label" for="nutriments-protein">
            {{ $t('profile.nutriments.protein.title')|capitalize }} (Kcal)
          </label>
          <div class="uk-form-controls">
            <input class="uk-input input-blue"
              disabled
              v-model.number="nutriments.protein"
              id="nutriments-protein"
              type="number"
              :placeholder="$t('profile.nutriments.protein.title')|capitalize">
          </div>
          <i>{{ $t('profile.nutriments.protein.formule')|capitalize }}</i>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="nutriments-percent-protein">
            {{ $t('profile.nutriments.protein.title')|capitalize }} :
            {{percentNutriment.protein}}%,
            {{ proteinKcaltoG(nutriments.protein) }}g
          </label>
          <input class="uk-range"
            id="nutriments-percent-protein"
            v-model.number="percentNutriment.protein"
            type="range"
            min="0"
            max="100"
            step="1">
        </div>
      </div>
      <div class="uk-form-horizontal">
        <div class="uk-margin">
          <label class="uk-form-label" for="nutriments-carbohydrate">
            {{ $t('profile.nutriments.carbohydrate.title')|capitalize }} (Kcal)
          </label>
          <div class="uk-form-controls">
            <input class="uk-input input-blue"
              disabled
              v-model.number="nutriments.carbohydrate"
              id="nutriments-carbohydrate"
              type="number"
              :placeholder="$t('profile.nutriments.carbohydrate.title')|capitalize">
          </div>
          <i>{{ $t('profile.nutriments.carbohydrate.formule')|capitalize }}</i>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="nutriments-percent-carbohydrate">
            {{ $t('profile.nutriments.carbohydrate.title')|capitalize }} :
            {{percentNutriment.carbohydrate}}%,
            {{ carbohydrateKcaltoG(nutriments.carbohydrate) }}g
          </label>
          <input class="uk-range"
            id="nutriments-percent-carbohydrate"
            v-model.number="percentNutriment.carbohydrate"
            type="range"
            min="0"
            max="100"
            step="1">
        </div>
      </div>
      <div class="uk-form-horizontal">
        <div class="uk-margin" v-if="user.nutriments">
          <label class="uk-form-label" for="fiber">
            {{ $t('profile.nutriments.fiber.title')|capitalize }} (g)
          </label>
          <div class="uk-form-controls">
            <input class="uk-input input-blue"
            v-model.number="user.nutriments.fiber"
            id="fiber"
            type="number"
            :placeholder="$t('profile.nutriments.fiber.title')|capitalize">
          </div>
        </div>
      </div>
      <transition name="slide-fade">
        <div class="uk-alert-warning uk-alert" v-if="isWarningRangeVisible">
          <p>{{ $t('profile.alertRange')|capitalize }}</p>
        </div>
      </transition>
    </div>
    <transition name="slide-fade">
      <div class="uk-alert-danger uk-alert" v-if="formAlert.visible">
        <a class="uk-alert-close uk-close"></a>
        <p>{{ formAlert.text }}</p>
      </div>
    </transition>
    <p v-vk-margin class="float-right">
      <vk-button class="uk-button uk-button-default button-blue"
        type="primary"
        htmlType="submit"
        :disabled="isWarningRangeVisible">
        {{ $t('default.save') }}
      </vk-button>
    </p>
  </form>
</template>

<script src="./profileInfo.js"></script>
<style scoped src="./profileInfo.css"></style>
