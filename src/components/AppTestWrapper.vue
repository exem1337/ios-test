<template>
  <AppTest 
    v-for="test in tests"
    :key="test.id"
    :test="test"
  />
</template>

<script lang="ts" setup>
import AppTest from 'src/components/AppTest.vue';
import { ITest } from 'src/models/test.model';

const props = defineProps<{
  tests: Array<ITest>
}>()

console.log(props.tests)
</script>