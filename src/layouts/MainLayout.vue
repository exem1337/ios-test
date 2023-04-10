<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <span>
        Адаптивная обучающая система
      </span>

      <div
        class="user-info" 
        v-if="store?.isLoggedIn"
      >    
        <span>{{ store?.getUser?.name }}</span>
        <q-btn
          class="logout-btn"
          outline
          @click="onLogout"
        >
          Выйти
        </q-btn>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';
import { AuthManager } from 'src/services/auth.service';
import { useStore } from 'src/stores/store';
import { useRouter } from 'vue-router';

useMeta({
  title: 'Войти в систему',
})

const store = useStore();
const router = useRouter();

function onLogout() {
  AuthManager.logout(store, router);
}
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

  .user-info {
    display: flex;
    align-items: center;
  }

  .logout-btn {
    margin-left: 8px;
  }
}
</style>
