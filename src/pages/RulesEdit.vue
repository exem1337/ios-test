<template>
  <div
    v-if="rule" 
    class="rule"
  >
    <div class="chart">
      <AppRuleEditItem 
        :dots="dots.Attentiveness"
        :item="rule.Attentiveness"
        :name="ERuleNames.Attentiveness" 
        term-name="Attentiveness"
        v-model="rule.Attentiveness"
      />
    </div>
    <div class="chart">
      <AppRuleEditItem 
        :dots="dots?.Discipline_Level"
        :item="rule.Discipline_Level" 
        :name="ERuleNames.Discipline_Level"
        term-name="Discipline_Level"
        v-model="rule.Discipline_Level"
      />
    </div>
    <div class="chart">
      <AppRuleEditItem 
        :dots="dots?.Perseverance"
        :item="rule.Perseverance"
        :name="ERuleNames.Perseverance" 
        term-name="Perseverance"
        v-model="rule.Perseverance"
      />
    </div>
    <div class="chart">
      <AppRuleEditItem 
        :dots="dots?.Responsibility"
        :item="rule.Responsibility"
        :name="ERuleNames.Responsibility" 
        term-name="Responsibility"
        v-model="rule.Responsibility"
      />
    </div>
    <div class="chart">
      <AppRuleEditItem 
        :dots="dots?.Self_Development"
        :item="rule.Self_Development"
        :name="ERuleNames.Self_Development" 
        term-name="Self_Development"
        v-model="rule.Self_Development"
      />
    </div>
    <div class="chart">
      <AppRuleEditItem 
        :dots="dots?.Stress"
        :item="rule.Stress"
        :name="ERuleNames.Stress" 
        term-name="Stress"
        v-model="rule.Stress"
      />
    </div>
    <div class="chart">
      <AppRuleEditItem 
        :dots="dots?.Result"
        :item="rule.Result"
        :name="ERuleNames.Result" 
        term-name="Result"
        v-model="rule.Result"
        saveable
        @save="onSave"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppRuleEditItem from 'components/AppRuleEditItem.vue';
import { api } from 'src/boot/axios';
import { ERuleNames } from 'src/enums/rule.enum';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IRule, IRuleDotsResponse } from '../models/rules.model';

const rule = ref<IRule>();
const route = useRoute();
const dots = ref<IRuleDotsResponse>();
const router = useRouter();

async function onSave() {
  await api.patch(`/updateRule/${route.params.id}`, rule.value);
  router.push('/expert');
}

onBeforeMount(async () => {
  const res = await api.get(`/getRule/${route.params.id}`)?.then((res) => res.data.Data)
  rule.value = res.rule;
  dots.value = res.dots;
})
</script>

<style lang="scss" scoped>
.rule {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .chart {
    margin-bottom: 200px;

    div {
      width: 500px !important;
      height: 300px !important;

      canvas {
        width: 500px !important;
        height: 300px !important;
      }
    }
  }
}
</style>