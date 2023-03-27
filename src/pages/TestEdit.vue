<template>
  <div class="test">
    <q-input v-model="testName" /> 

    <TestEditItem
      v-for="question in test?.Questions"
      :key="question.Key"
      :question="question"
      @on-delete="onDeleteAnswer"
    />

    <q-btn
      size="md"
      color="primary"
      icon="save"
      @click="onSave"
    >
      Сохранить изменения
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { ITest } from 'src/models/test.model';
import { onBeforeMount, ref } from 'vue';
import TestEditItem from 'components/TestEditItem.vue';
import { api } from 'src/boot/axios';
import { useRoute, useRouter } from 'vue-router';

const test = ref<ITest>();
const route = useRoute();
const router = useRouter();
const testName = ref();
const deletedAnswers = ref<Array<number>>([]);

async function onSave() {
  if (deletedAnswers.value.length) {
    await api.delete('/deleteAnswers', {
      data: {
        answers: deletedAnswers.value
      }
    })
  }

  router.push('/expert')
}

function onDeleteAnswer(key: number) {
  deletedAnswers.value.push(key);
}

onBeforeMount(async () => {
  test.value = await api.get(`/getTest/${route.params.id}?GetCorrect=true`).then((res) => res.data.Data);
  testName.value = test?.value?.Name;
})
</script>

<style lang="scss" scoped>
.test {
  max-width: 75vw;
  width: 100%;
  margin: 0 auto;

  .q-input {
    margin-top: 20px;
    margin-bottom: 8px;
  }

  .q-btn {
    position: fixed;
    top: 80px;
    right: 40px;
    border-radius: 24px;

    :deep(.q-btn__content) {
      .q-icon {
        margin-right: 4px;
      }
    }
  }
}
</style>