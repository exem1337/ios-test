<template>
  <AppLoader v-if="isDataLoading" />
  <AppTestWrapper
    v-else 
    :tests="tests"
  />
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppTestWrapper from 'components/AppTestWrapper.vue';
import AppLoader from 'components/AppLoader.vue';
import { ITestResponse } from 'src/models/test.model';
import { TestService } from 'src/services/test.service';

useMeta({
  title: 'Тестирование'
})

const tests = ref<Array<ITestResponse>>([]);
const route = useRoute();
const isDataLoading = ref(true);

onBeforeMount(async () => {
  tests.value = await TestService.getStudentTests(Number(route.params.id));

  isDataLoading.value = false;
})
</script>

<style lang="scss" scoped>
</style>