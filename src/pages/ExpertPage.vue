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
import { AuthManager } from 'src/services/auth.service';
import { useRouterGuard } from 'src/utils/routerGuard.util';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const isRulesActive = ref(true);
const router = useRouter()
const route = useRoute();

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  AuthManager.useAuthGuard(router, route);
  useRouterGuard()
})
</script>

<style lang="scss" scoped>
.expert {
  width: 100%;
  margin-bottom: 20px;

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