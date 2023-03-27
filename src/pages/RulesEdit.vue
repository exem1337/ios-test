<template>
  <div class="rule">
    <div class="chart">
      <AppRuleEditItem />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppRuleEditItem from 'components/AppRuleEditItem.vue';
</script>

<style lang="scss" scoped>
.rule {
  .chart {
    div {
      width: 500px !important;
      height: 300px !important;

      canvas {
        width: 500px !important;
        height: 300px !important;
      }
    }
  }
}
</style>