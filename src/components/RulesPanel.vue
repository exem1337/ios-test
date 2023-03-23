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
      >
        <span v-if="active">Создать правило</span>
      </q-btn>
      <div class="rules__container--wrapper">
        <AppRule 
          v-for="rule in rules"
          :key="rule.id"
          :rule="rule"
          :active="active"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppRule from 'components/AppRule.vue';
import { RULES } from 'src/constants/rules.const';
import { IRule } from 'src/models/rules.model';
import { ref } from 'vue';

const props = defineProps<{
  active: boolean;
}>();

const emits = defineEmits<{
  (e: 'active'): void;
}>();

const rules = ref<Array<IRule>>(RULES);

function onWrapperClick() {
  if (!props.active) {
    emits('active');
  }
}
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
      padding: 2px 4px;

      :deep(.rule) {
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>