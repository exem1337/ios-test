<template>
  <div class="expert">
    <h4>Панель эксперта</h4>
    <div class="container"> 
      <RulesPanel 
        :active="isRulesActive" 
        @active="isRulesActive = true"
      />
      <TestPanel 
        :active="!isRulesActive" 
        @active="isRulesActive = false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import RulesPanel from 'components/RulesPanel.vue';
import TestPanel from 'components/TestPanel.vue';
import { ref } from 'vue';

const isRulesActive = ref(true);
</script>

<style lang="scss" scoped>
.expert {
  width: 100%;

  h4 {
    margin: 0 auto;
    width: fit-content;
    margin-top: 40px;
    color: #616161
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 20px;
    margin-top: 60px;
  }
}
</style>