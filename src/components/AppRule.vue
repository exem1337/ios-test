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
      <span>ЕСЛИ</span>
      <div>
        <span>Внимательность: {{ rule.Attentiveness }}</span>
        <span>Уровень усвоения дисциплины: {{ rule.Discipline_Level }}</span>
        <span>Усидичивость: {{ rule.Perseverance }}</span>
        <span>Ответственность: {{ rule.Responsibility }}</span>
        <span>Стрессоустойчивость: {{ rule.Stress }}</span>
        <span>Стремление к самообучению: {{ rule.Self_Development }}</span>
      </div>
      <span>ТО {{ rule.Result }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IRule } from 'src/models/rules.model';
import { useRouter } from 'vue-router';

const props = defineProps<{
  rule: IRule;
  active: boolean;
}>()

const router = useRouter();

function onRuleClick() {
  router.push(`/expert/rules/${props.rule.Key}`);
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

  span {
    font-size: 16px;
    color: #616161;
    text-transform: uppercase;

    &:first-child {
      margin-left: 4px;
    }

    &:last-child {
      margin-right: 4px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #616161;
    transition: .3s display ease;
    overflow: hidden;

    span {
      white-space: nowrap;
      margin-right: 4px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
