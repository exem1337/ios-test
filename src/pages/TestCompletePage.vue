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
import { useRoute, useRouter } from 'vue-router';
import AppTestWrapper from 'components/AppTestWrapper.vue';
import AppLoader from 'components/AppLoader.vue';
import { ITestResponse } from 'src/models/test.model';
import { TestService } from 'src/services/test.service';
import { AuthManager } from 'src/services/auth.service';

useMeta({
  title: 'Тестирование'
})

const tests = ref<Array<ITestResponse>>([]);
const route = useRoute();
const isDataLoading = ref(true);
const router = useRouter();

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  AuthManager.useAuthGuard(router, route);

  tests.value = await TestService.getStudentTests(Number(route.params.id), router);

  isDataLoading.value = false;
})
</script>

<style lang="scss" scoped>
</style>