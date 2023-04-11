<template>
  <div v-if="!isShowBanner">
    <AppTest 
      :key="currentTest"
      :test="tests[currentTest]"
      @comleted="onTestCompleted"
    />
  </div>
  <q-card 
    v-else
    class="complete-banner"
  >
    Вы прошли Тестирование
    <q-btn
      color="primary" 
      @click="onReturnToDisciplines"
    >
      Вернуться к списку дисциплин
    </q-btn>
  </q-card>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import AppTest from 'src/components/AppTest.vue';
import { ITest } from 'src/models/test.model';
import { useStore } from 'src/stores/store';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  tests: Array<ITest>
}>()

const currentTest = ref(0);
const isShowBanner = ref(false);
const store = useStore();
const route = useRoute();
const router = useRouter();

function onReturnToDisciplines() {
  router.push('/disciplines');
}

async function onTestCompleted(correct: number) {
  await api.post('/submitResult', {
    result: `${correct}/${props.tests[currentTest.value].Questions?.length}`,
    physKey: store.getUser.id,
    testKey: props.tests[currentTest.value].Key,
    discipKey: Number(route.params.id),
  })

  if (currentTest.value + 1 === props.tests.length) {
    isShowBanner.value = true;
    return;
  }

  currentTest.value++;
}
</script>

<style lang="scss" scoped>
.complete-banner {
  padding: 8px;
  margin: 0 auto;
  margin-top: calc(50% - 75px);
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: space-between;
  width: fit-content;

}
</style>