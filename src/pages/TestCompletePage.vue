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
import { api } from 'src/boot/axios';
import { useRoute } from 'vue-router';
import AppTestWrapper from 'components/AppTestWrapper.vue';
import AppLoader from 'components/AppLoader.vue';

useMeta({
  title: 'Тестирование'
})

const tests = ref();
const route = useRoute();
const isDataLoading = ref(true);

onBeforeMount(async () => {
  const testTypes = await api.get('/getDiffList').then((res) => res.data.Data?.filter((type) => type.Sh_Name === 'enter'));
  tests.value = await api.get('/getTestList').then((res) => res.data?.Data?.filter((test) => test.Test_Type_Key !== 26 && !!testTypes.find((type) => type.Key === test.Test_Type_Key && type.Sh_Name === 'enter')));
  const discipline = await api.get(`/getDisciplines?by=key&id=${route.params.id}`).then((res) => res.data.Data[0]);
  const disciplineTest = await api.get(`getTest/${discipline.Entry_Test_Key}`);
  tests.value.push();

  isDataLoading.value = false;
})
</script>

<style lang="scss" scoped>
</style>