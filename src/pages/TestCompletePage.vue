<template>
  <AppTest 
    v-for="test in TEST"
    :key="test.id"
    :test="test"
  />
</template>

<script lang="ts" setup>
import { TEST } from '../constants/tests.const';
import AppTest from 'src/components/AppTest.vue';
import { useMeta } from 'quasar';

useMeta({
  title: 'Тестирование'
})
</script>

<style lang="scss" scoped>
</style>