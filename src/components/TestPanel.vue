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
      <div class="tests__container--wrapper">
        <q-btn 
          color="primary add"
          icon="add"
          @click="onTestCreate"
        >
          <span v-if="active">Создать тест</span>
        </q-btn>
        <AppTestItem
          v-for="test in tests"
          :key="test.Key"
          :test="test"
          :active="active"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITest } from 'src/models/test.model';
import { onBeforeMount, ref } from 'vue';
import AppTestItem from 'components/AppTestItem.vue';
import { api } from 'src/boot/axios';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  active: boolean;
}>();

const emits = defineEmits<{
  (e: 'active'): void;
}>();

const tests = ref<Array<ITest>>();
const router = useRouter();
const route = useRoute();

function onWrapperClick() {
  if (!props.active) {
    emits('active');
  }
}

function onTestCreate() {
  router.push(`/expert/${route.params.discipline}/test`);
}

onBeforeMount(async () => {
  const testTypes = await api.get('/getDiffList').then((res) => res.data.Data?.filter((type) => type.Sh_Name === 'enter' && type.Key !== 26));
  tests.value = await api.get('/getTestList').then((res) => res.data?.Data?.filter((test) => testTypes.find((type) => type.Key === test.Test_Type_Key)));
  const test = await api.get(`/getDisciplines?by=key&id=${route.params.discipline}`).then((res) => res.data.Data?.Entry_Test_Key);
  if (test) {
    const testResponse = await api.get(`/getTest/${test}`).then((res) => res.data.Data);
    tests.value?.push(testResponse);
  }
})
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

      &--wrapper {
        .add {
          width: 100%;
          background-color: #eeeeee !important;
          color: #616161 !important;
        }

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
        flex-wrap: wrap;

        .add {
          margin-top: 0;
        }
      } 
    }
  }
}
</style>