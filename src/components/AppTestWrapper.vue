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
    Вы прошли Тестирование <br>
    Ващ результат: {{ prop?.resultTerm }}
    <q-btn
      color="primary"
      @click="isShowModal = true"
    >
      Подробнее
    </q-btn>
    <q-btn
      color="primary" 
      @click="onReturnToDisciplines"
    >
      Вернуться к списку дисциплин
    </q-btn>
  </q-card>

  <AppDialog 
    v-model="isShowModal" 
    :options="modalProps" 
    :componentProps="prop"
    @close="isShowModal = false"
  />
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import AppTest from 'src/components/AppTest.vue';
import { ITest } from 'src/models/test.model';
import { useStore } from 'src/stores/store';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FuzzyResult from 'components/FuzzyResult.vue';
import AppDialog from 'components/AppDialog.vue'
import { IModalProps } from 'src/models/modal.model';

const props = defineProps<{
  tests: Array<ITest>
}>()

const modalProps: IModalProps = {
  hideFooter: true,
  headerText: 'Результаты тестирования',
  component: FuzzyResult,
}

const isShowModal = ref(false);
const currentTest = ref(0);
const isShowBanner = ref(false);
const store = useStore();
const route = useRoute();
const router = useRouter();
const currentStatus = ref();
const prop = ref();

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
    await getBannerData();
    return;
  }

  currentTest.value++;
}

async function getBannerData() {
  currentStatus.value = await api.get(`/getFuzzyResult?physKey=${store.getUser.id}&disciplineKey=${route.params.id}`);
  console.log(currentStatus.value)
  const ruleGraphs = [];

  const rules = Object.keys(currentStatus.value).filter((key) => key.includes('RuleId'));
  console.log(rules)

  rules.forEach((rule) => {
    ruleGraphs.push({ x: [...currentStatus.value[rule][0]], y: [...currentStatus.value[rule][1]] });
  })

  prop.value = {
    result: currentStatus.value.Result,
    resultTerm: currentStatus.value.Result_term,
    resultFunc: currentStatus.value.ResultFunc,
    graphs: ruleGraphs
  }
}
</script>

<style lang="scss" scoped>
.complete-banner {
  padding: 8px;
  margin: 0 auto;
  margin-top: calc(50% - 300px);
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: space-between;
  width: fit-content;

}
</style>