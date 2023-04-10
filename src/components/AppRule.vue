<template>
  <div 
    class="rule"
    :class="{ 'active' : active }"
    @click="onRuleClick"
  >
    <div
      v-if="!active" 
      class="icon"
    >
      <q-icon name="text_fields" />
    </div>
    <div v-else>
      <div class="rule__item">Результат: {{ rule.Result }} <br>Код правила: {{ rule.Key }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IRule } from 'src/models/rules.model';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  rule: IRule;
  active: boolean;
}>()

const router = useRouter();
const route = useRoute();

function onRuleClick() {
  router.push(`/expert/${route.params.discipline}/rules/${props.rule.Key}`);
}
</script>

<style lang="scss" scoped>
.rule {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:not(.active) {
    .icon {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #616161;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
    }

    border-bottom: none;
    background-color: #eeeeee;
    padding-bottom: 0;
    border-radius: 4px;
    max-width: 108px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 0;
    margin-top: 8px;
  }

  &:hover {
    background-color: #fafafa;
  }

  .rule__item {
    font-size: 16px;
    color: #FFF;
    border-radius: 4px;
    text-transform: uppercase;
    background-color: #1976D2;
    padding: 8px;
    transition: .3s ease;

    &:hover {
      background-color: lighten(#1976D2, 5%);
    }
  }
}
</style>
