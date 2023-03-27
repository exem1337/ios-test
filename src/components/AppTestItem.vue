<template>
  <div 
    class="test-item"
    :class="{ 'active' : active }"
    @click="onTestClick"
  >
    <span v-if="active">{{ test.Name }}</span>
    <q-icon 
      v-else
      name="quiz" 
    />
  </div>
</template>

<script lang="ts" setup>
import { ITest } from 'src/models/test.model';
import { useRouter } from 'vue-router';

const props = defineProps<{
  test: ITest;
  active: boolean;
}>();

const router = useRouter();

function onTestClick() {
  router.push(`/expert/test/${props.test.Key}`);
}
</script>

<style lang="scss" scoped>
.test-item {
  font-size: 16px;
  font-weight: 500;
  background-color: #1976D2;
  color: #fff;
  padding: 4px 16px;
  height: 36px;
  width: fit-content;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .3s ease;

  &:hover {
    background-color: lighten(#1976D2, 5%);
  }

  &:not(.active) {
    width: 100%;
    background-color: #eeeeee;

    .q-icon {
      color: #616161;
    }
  }
}
</style>