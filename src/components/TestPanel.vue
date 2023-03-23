<template>
  <div 
    class="tests"
    :class="{ 
      'active' : active,
      'unactive': !active 
    }"
    @click="onWrapperClick"
  >
    <p>тесты</p>
    <div class="tests__container">
      <q-btn 
        color="primary add"
        icon="add"
      >
        <span v-if="active">Создать тест</span>
      </q-btn>
      <div class="tests__container--wrapper">
        <AppTestItem
          v-for="test in tests"
          :key="test.id"
          :test="test"
          :active="active"
        />
        <AppTestItem
          v-for="test in tests"
          :key="test.id"
          :test="test"
          :active="active"
        />
        <AppTestItem
          v-for="test in tests"
          :key="test.id"
          :test="test"
          :active="active"
        />
        <AppTestItem
          v-for="test in tests"
          :key="test.id"
          :test="test"
          :active="active"
        />
        <AppTestItem
          v-for="test in tests"
          :key="test.id"
          :test="test"
          :active="active"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TEST } from 'src/constants/tests.const';
import { ITest } from 'src/models/test.model';
import { ref } from 'vue';
import AppTestItem from 'components/AppTestItem.vue';

const props = defineProps<{
  active: boolean;
}>();

const emits = defineEmits<{
  (e: 'active'): void;
}>();

const tests = ref<Array<ITest>>(TEST);

function onWrapperClick() {
  if (!props.active) {
    emits('active');
  }
}
</script>

<style lang="scss" scoped>
.tests {
  background-color: #1976D2;
  border-radius: 4px;
  width: 150px;
  padding: 14px;
  -webkit-transition: width .3s ease;
  -moz-transition: width .3s ease;
  -o-transition: width .3s ease;
  transition: width .3s ease;
  cursor: pointer;

  p {
    margin-bottom: 0;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 20px;
    margin: 0 auto;
    width: fit-content;
    color: #fff;
    user-select: none;
  }

  .add { 
    margin-top: 4px;
  }

  &.unactive {
    .tests__container {
      pointer-events: none;

      .add {
        width: 100%;
        background-color: #eeeeee !important;
        color: #616161 !important;
      }

      &--wrapper {
        margin-top: 4px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 8px;
      }
    }
  }

  &.active {
    width: 100%;
    background-color: #eeeeee;
    margin-left: 14px;

    p {
      color: #616161;
    }

    .tests__container {
      display: flex;
      gap: 8px;

      &--wrapper {
        margin-top: 4px;
        display: flex;
        gap: 8px;
      } 
    }
  }
}
</style>