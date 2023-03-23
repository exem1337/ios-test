<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <span>
        Адаптивная обучающая система
      </span>

      <div v-if="store?.getUser?.id != undefined">    
        <span>{{ store?.getUser?.name }}</span>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';
import { useStore } from 'src/stores/store';

useMeta({
  title: 'Войти в систему',
})

const store = useStore();
</script>

<style lang="scss" scoped>
.q-header {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 24px;
  }
}
</style>
