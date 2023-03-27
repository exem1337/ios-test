<template>
  <q-card class="test-item">
    <q-input 
      v-model="questionName"
      outlined
      type="textarea"
    />
      
    <div
      v-for="answer in clonedQuestion?.Answer"
      :key="answer.Key" 
      class="answers"
    >
      <div class="answers__answer">
        <q-input 
          v-model="answer.Text"
        /> 
        
        <div class="answers__answer--actions">
          <q-radio
            v-model="selectedAnswerKey"
            :val="answer.Key"
          >
            Правильный ответ
          </q-radio>

          <q-icon 
            color="red-7"
            name="cancel"
            @click="onDeleteClick(answer)"
          />
        </div>
      </div>
    </div>

    <q-btn
      color="primary"
      @click="onAnswerCreate"
    >
      Создать ответ
    </q-btn>
  </q-card>
</template>

<script lang="ts" setup>
import { ITestQuestion, ITestQuestionAnswer } from 'src/models/test.model';
import { ref } from 'vue';
import { cloneDeep, indexOf } from 'lodash-es';

const props = defineProps<{
  question: ITestQuestion;
}>();

const emits = defineEmits<{
  (e: 'onDelete', value: number): void;
}>();

const questionName = ref(props.question.Header);
const clonedQuestion = ref<ITestQuestion>(cloneDeep(props.question));
const selectedAnswerKey = ref(props.question.Answer?.find((ans) => ans.IsCorrect)?.Key);

function onDeleteClick(answer: ITestQuestionAnswer) {
  clonedQuestion.value?.Answer?.splice(
    indexOf(clonedQuestion.value?.Answer, answer),
    1
  );
  emits('onDelete', answer.Key);
}

function onAnswerCreate() {
  clonedQuestion.value.Answer.push({
    name: ''
  })
}
</script>

<style lang="scss" scoped>
.test-item {
  padding: 20px;

  .q-btn {
    margin-top: 8px;
  }

  .answers {
    display: flex;
    flex-direction: column;

    &__answer {
      display: flex;
      .q-input {
        width: 80%;
      } 

      &--actions {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .q-icon {
          margin-left: 8px;
          font-size: 24px;
          cursor: pointer;
        }
      }
    }
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }
}
</style>