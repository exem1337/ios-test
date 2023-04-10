<template>
  <div class="create-rule">
    <span>ЕСЛИ</span>
    <div class="create-rule__statement">
      Усидичивость
      <q-select 
        v-model="perseveranceSelect"
        :options="perseveranceSelectOptions" 
      />
    </div>
    <div class="create-rule__statement">
      Внимательность
      <q-select 
        v-model="attentivenessSelect"
        :options="attentivenessSelectOptions" 
      />
    </div>
    <div class="create-rule__statement">
      Уровень усвоения дисциплины
      <q-select 
        v-model="disciplineLevelSelect"
        :options="disciplineLevelSelectOptions" 
      />
    </div>
    <div class="create-rule__statement">
      Ответственность
      <q-select 
        v-model="responsibilitySelect"
        :options="responsibilitySelectOptions" 
      />
    </div>
    <div class="create-rule__statement">
      Стрессоустойчивость
      <q-select 
        v-model="stressSelect"
        :options="stressSelectOptions" 
      />
    </div>
    <div class="create-rule__statement">
      Стремление к самообучению
      <q-select 
        v-model="selfDevelopmentSelect"
        :options="selfDevelopmentSelectOptions" 
      />
    </div>
    <div class="create-rule__statement">
      ТО результат
      <q-select 
        v-model="resultSelect"
        :options="resultSelectOptions" 
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { ICreateRule } from 'src/models/rules.model';
import { computed, onBeforeMount, ref, watch } from 'vue';

defineProps<{
  modelValue: ICreateRule;
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: ICreateRule): void;
  (e: 'valid', value: boolean): void;
}>()

const perseveranceSelectOptions = ref();
const perseveranceSelect = ref();
const attentivenessSelectOptions = ref();
const attentivenessSelect = ref();
const disciplineLevelSelectOptions = ref();
const disciplineLevelSelect = ref();
const responsibilitySelectOptions = ref();
const responsibilitySelect = ref();
const stressSelectOptions = ref();
const stressSelect = ref();
const selfDevelopmentSelectOptions = ref();
const selfDevelopmentSelect = ref();
const resultSelectOptions = ref();
const resultSelect = ref();

const rule = computed<ICreateRule>(() => {
  return {
    Attentiveness: attentivenessSelect.value,
    Perseverance: perseveranceSelect.value,
    Discipline_Level: disciplineLevelSelect.value,
    Responsibility: responsibilitySelect.value,
    Stress: stressSelect.value,
    Self_Development: selfDevelopmentSelect.value,
    Result: resultSelect.value,
  }
})

watch(
  [
    () => perseveranceSelect.value,
    () => attentivenessSelect.value,
    () => disciplineLevelSelect.value,
    () => responsibilitySelect.value,
    () => stressSelect.value,
    () => selfDevelopmentSelect.value,
    () => resultSelect.value,
  ],
  () => {
    emits('update:modelValue', rule.value);
    emits(
      'valid', 
      !!stressSelect.value && 
      !!disciplineLevelSelect.value && 
      !!attentivenessSelect.value && 
      !!perseveranceSelect.value && 
      !!responsibilitySelect.value && 
      !!selfDevelopmentSelect.value && 
      !!resultSelect.value
    );
  }
)

onBeforeMount(async () => {
  attentivenessSelectOptions.value = await api.get(`/getTermLevels/Attentiveness`).then((res) => res.data.Data);
  perseveranceSelectOptions.value = await api.get(`/getTermLevels/Perseverance`).then((res) => res.data.Data);
  disciplineLevelSelectOptions.value = await api.get(`/getTermLevels/Discipline_Level`).then((res) => res.data.Data);
  responsibilitySelectOptions.value = await api.get(`/getTermLevels/Responsibility`).then((res) => res.data.Data);
  stressSelectOptions.value = await api.get(`/getTermLevels/Stress`).then((res) => res.data.Data);
  selfDevelopmentSelectOptions.value = await api.get(`/getTermLevels/Self_Development`).then((res) => res.data.Data);
  resultSelectOptions.value = await api.get(`/getTermLevels/Result`).then((res) => res.data.Data);
})
</script>

<style lang="scss" scoped>
.create-rule {
  width: 400px;

  &__statement {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .q-select {
      width: 50%;
    }
  }
}
</style>