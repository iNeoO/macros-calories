<template>
  <div class="uk-overflow-auto">
    <table class="uk-table uk-table-divider uk-table-small uk-table-responsive macroTabsWeekTotal">
      <tr>
        <th> {{ $t('macros.tabs.weekNumber')|capitalize }}</th>
        <td v-for="(weekNumber, index) in weeksNumbers.reverse()" :key="index">
          <span v-vk-tooltip="$d(new Date(macrosStats[weekNumber]['firstDate']), 'short')">
            {{ weekNumber}}
          </span>
        </td>
      </tr>
      <tr v-for="(title, index) in titles" :key="index">
        <th>{{ $t(`macros.totalTab.${title}`)|capitalize }}</th>
        <td v-for="(weekNumber, jndex) in weeksNumbers"
          :key="jndex">
          {{ macrosStats[weekNumber][title] }}
        </td>
      </tr>
      <tr>
        <th>{{ $t('macros.tabs.isFull')|capitalize }} </th>
        <td v-for="(weekNumber, index) in weeksNumbers.reverse()" :key="index">
          <vk-icon :icon="macrosStats[weekNumber]['full'] ? 'check' : 'close'" ratio="1"></vk-icon>
        </td>
      </tr>
      <tr>
        <th>{{ $t('default.edit')|capitalize }} </th>
        <td v-for="(weekNumber, index) in weeksNumbers.reverse()" :key="index">
          <vk-icon-button
            class="button-blue button-icon"
            icon="pencil"
            @click="$router.push({
              path: 'macros',
              query: { date: getDate(macrosStats[weekNumber]['firstDate']) }
            })">
          </vk-icon-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script src="./macrosTabsWeeksTotal.js"></script>
<style src="./macrosTabsWeeksTotal.css"></style>
