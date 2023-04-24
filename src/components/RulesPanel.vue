<template>
  <div 
    class="rules"
    :class="{ 
      'active' : active,
      'unactive': !active 
    }"
    @click="onWrapperClick"
  >
    <p>Правила</p>
    <div class="rules__container">
      <q-btn 
        color="primary add"
        icon="add"
        @click="onRuleCreate"
      >
        <span v-if="active">Создать правило</span>
      </q-btn>
      <AppDialog 
        v-model="isShowModal" 
        :options="modalProps" 
        @close="isShowModal = false"
        @ok="onCreateRule"
      />
      <div class="rules__container--wrapper">
        <AppRule 
          v-for="rule in rules"
          :key="rule.Key"
          :rule="rule"
          :active="active"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppRule from 'components/AppRule.vue';
import { IModalProps } from '../models/modal.model';
import { api } from 'src/boot/axios';
import { ICreateRule, IRule } from 'src/models/rules.model';
import { onBeforeMount, Ref, ref } from 'vue';
import CreateRule from 'components/CreateRule.vue';
import AppDialog from 'components/AppDialog.vue';

const props = defineProps<{
  active: boolean;
}>();

const emits = defineEmits<{
  (e: 'active'): void;
}>();

const isShowModal = ref(false);
const rules = ref<Array<IRule>>();
const modalProps: IModalProps = {
  component: CreateRule,
  headerText: 'Создать правило',
  okButtonText: 'Создать'
}

function onWrapperClick() {
  if (!props.active) {
    emits('active');
  }
}

function onRuleCreate() {
  isShowModal.value = true;
}

async function onCreateRule(rule: Ref<ICreateRule>) {
  await api.post('/postRule', {
    disciplineLevel: rule.value.Discipline_Level,
    selfDevelopment: rule.value.Self_Development,
    responsibility: rule.value.Responsibility,
    perseverance: rule.value.Perseverance,
    attentiveness: rule.value.Attentiveness,
    stress: rule.value.Stress,
    result: rule.value.Result,
  })
  isShowModal.value = false;
}

onBeforeMount(async () => {
  rules.value = await api.get('/getRuleList').then((res) => res.data.Data);
})
</script>

<style lang="scss" scoped>
.rules {
  background-color: #1976D2;
  border-radius: 4px;
  width: 150px;
  padding: 14px;
  -webkit-transition: width .3s ease;
  -moz-transition: width .3s ease;
  -o-transition: width .3s ease;
  transition: width .3s ease;

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

  .rules__container--wrapper {
    margin-top: 8px;
  }

  &.unactive {
    .rules__container {
      pointer-events: none;

      .add {
        width: 100%;
        background-color: #eeeeee !important;
        color: #616161 !important;
      }
    }
  }

  &.active {
    width: 100%;
    background-color: #eeeeee;
    margin-right: 14px;

    p {
      color: #616161;
    }

    .rules__container--wrapper {
      background-color: #fff;
      border-radius: 4px;
      padding: 0px 4px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 20px;

      :deep(.rule) {
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>