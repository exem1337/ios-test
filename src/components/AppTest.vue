<template>
  <div class="test">
    <q-card>
      <h4>{{ test.name }}</h4>

      <div 
        class="test__question"
      >
        <p>{{ test.questions?.[currentQuestionKey]?.questionName }}</p>
        <q-radio
          v-for="answer in test.questions?.[currentQuestionKey]?.answers" 
          :key="answer.id"
          v-model="currentAnswer" 
          :val="answer.id" 
          :label="answer.name" 
        />
      </div>
      
      <q-btn 
        :disable="!currentAnswer"
        color="primary"
        @click="onAnswer"
      >
        Продолжить
      </q-btn>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { ITest, ITestUserAnswer } from 'src/models/test.model';
import { ref } from 'vue';

const props = defineProps<{
  test: ITest;
}>();

const currentAnswer = ref();
const currentQuestionKey = ref(0);

const currentUserTestState = ref<ITestUserAnswer>({
  id: props.test.id,
  answers: [],
})

async function onTestSubmit() {
  return true;
}

async function onAnswer() {
  currentUserTestState.value.answers.push({
    id: props.test.questions?.[currentQuestionKey.value]?.id,
    answerId: currentAnswer.value,
  });

  currentAnswer.value = null;

  if (currentQuestionKey.value + 1 === props.test.questions.length) {
    return await onTestSubmit();
  }

  currentQuestionKey.value++;
}
</script>

<style lang="scss" scoped>
.test {
  width: 100%;

  .q-card {
    width: fit-content;
    min-width: 50vw;
    max-width: 80vw;
    margin: 0 auto;
    padding: 24px;
    margin-top: 200px;
    position: relative;

    h4 {
      margin-top: 0;
      overflow-wrap: break-word;
    }

    .test__question {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;

      .q-radio {
        margin-left: -10px;
      }
    }

    .q-btn {
      position: absolute;
      bottom: 14px;
      right: 14px;
    }
  }
}
</style>