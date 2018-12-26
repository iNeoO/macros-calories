<template>
  <div>
    <h3 class="display-inline-block margin-bottom--0">
      {{ `${$t('macros.day')} : ${index + 1}` }}
    </h3>
    <p class="display-inline-block margin-left--10px margin-bottom--0">
      {{ $d(new Date(date), 'short') }}
    </p>
    <div  v-if="alimentsDay.aliments && alimentsDay.aliments.length">
      <div class="uk-overflow-auto macrosTabsWeek">
          <table
            class="uk-table uk-table-small
              uk-table-divider weeksAliments-table uk-table-responsive"
            :style="titleColumn">
            <thead>
              <tr>
                <th>{{ $t('macros.tabs.name') }}</th>
                <th>{{ $t('macros.tabs.quantity') }}</th>
                <th>{{ $t('macros.tabs.kcal') }}</th>
                <th colspan="2">{{ $t('macros.tabs.carbohydrate') }}</th>
                <th colspan="2">{{ $t('macros.tabs.fat') }}</th>
                <th colspan="2">{{ $t('macros.tabs.protein') }}</th>
                <th>{{ $t('macros.tabs.fiber') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(aliment, index) in alimentsDay.aliments"
                :key="index"
                :class="`cell-${aliment.mealType}`">
                <td class="cellClassWeeksAliments">
                  <p>{{aliment.name}}</p>
                </td>
                <td class="cellClassWeeksAliments">
                  <p>{{aliment.quantity}}</p>
                </td>
                <td class="cellClassWeeksAliments">
                  <p>{{aliment.kcal}}</p>
                </td>
                <td colspan="2" class="cellClassWeeksAliments">
                  <p>{{aliment.carbohydrate}}g</p>
                </td>
                <td colspan="2" class="cellClassWeeksAliments">
                  <p>{{aliment.fat}}g</p>
                </td>
                <td colspan="2" class="cellClassWeeksAliments">
                  <p>{{aliment.protein}}g</p>
                </td>
                <td class="cellClassWeeksAliments">
                  <p>{{aliment.fiber}}g</p>
                </td>
              </tr>
              <tr v-for="(total, index) in [totalAlimentsForTheDay, objForTheDay, diffForTheDay]"
                :key="`total-${index}`">
                <td class="cellClassWeeksAliments">
                  <p>{{total.name}}</p>
                </td>
                <td class="cellClassWeeksAliments">
                </td>
                <td class="cellClassWeeksAliments">
                  <p>{{total.kcal}}</p>
                </td>
                <td class="cellClassDayTotal">
                  <p>{{total.carbohydrateG}}g</p>
                </td>
                <td class="cellClassDayTotal">
                  <p>{{total.carbohydrateKcal}} kcal</p>
                </td>
                <td class="cellClassDayTotal">
                  <p>{{total.fatG}}g</p>
                </td>
                <td class="cellClassDayTotal">
                  <p>{{total.fatKcal}} kcal</p>
                </td>
                <td class="cellClassDayTotal">
                  <p>{{total.proteinG}}g</p>
                </td>
                <td class="cellClassDayTotal">
                  <p>{{total.proteinKcal}} kcal</p>
                </td>
                <td class="cellClassDayTotal">
                  <p>{{total.fiber}}g</p>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
    <article class="uk-comment" v-else>
      <header class="uk-comment-header">
        <h4 class="uk-comment-title">{{ $t('macros.emptyData')|capitalize }}</h4>
      </header>
    </article>
    <div :class="alignButton()">
      <vk-button class="primary button-blue"
        :disabled="isDisabledButtonEdit()"
        @click="$router.push({ path: 'macros/macro', query: { date, id }})">{{ $t('default.edit') }}
      </vk-button>
    </div>
  </div>
</template>

<script src="./macrosTabsWeek.js"></script>
<style src="./macrosTabsWeek.css"></style>
