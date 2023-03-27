<template>
  <div class="rule-edit">
    <LineChart 
      :chartData="testData" 
    />
    <q-select 
      v-model="model" 
      :options="options" 
    />
  </div>
</template>

<script lang="ts" setup>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { ref } from 'vue';

const model = ref();
const options = ['sas', 'sas']
Chart.register(...registerables);
const testData = {
  labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
  datasets: [
    {
      label: 'sas',
      data: [0, 0, 0, 0, 100, 100, 0, 0, 0, 0, 0],
      backgroundColor: '#1976D2',
      borderColor: '#1976D2',
    },
  ],
  width: '500px',
};
</script>