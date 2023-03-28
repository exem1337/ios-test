<template>
  <div class="create-rule">
    <span>ЕСЛИ</span>
    <div class="create-rule__statement">
      Усидичивость
      <q-select 
        v-model="perseveranceSelect"
        :options="options" 
      />
    </div>
    <div class="create-rule__statement">
      Внимательность
      <q-select 
        v-model="attentivenessSelect"
        :options="options" 
      />
    </div>
    <div class="create-rule__statement">
      Уровень усвоения дисциплины
      <q-select 
        v-model="disciplineLevelSelect"
        :options="options" 
      />
    </div>
    <div class="create-rule__statement">
      Ответственность
      <q-select 
        v-model="responsibilitySelect"
        :options="options" 
      />
    </div>
    <div class="create-rule__statement">
      Стрессоустойчивость
      <q-select 
        v-model="stressSelect"
        :options="options" 
      />
    </div>
    <div class="create-rule__statement">
      Стремление к самообучению
      <q-select 
        v-model="selfDevelopmentSelect"
        :options="options" 
      />
    </div>
    <div class="create-rule__statement">
      ТО результат
      <q-select 
        v-model="resultSelect"
        :options="options" 
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ICreateRule } from 'src/models/rules.model';
import { computed, ref, watch } from 'vue';

defineProps<{
  modelValue: ICreateRule;
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: ICreateRule): void;
  (e: 'valid', value: boolean): void;
}>()

const options = ['Низкий', 'Средний'];
const perseveranceSelect = ref();
const attentivenessSelect = ref();
const disciplineLevelSelect = ref();
const responsibilitySelect = ref();
const stressSelect = ref();
const selfDevelopmentSelect = ref();
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