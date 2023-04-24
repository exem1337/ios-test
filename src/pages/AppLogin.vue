<template>
  <div class="container">
    <q-card class="login">
      <q-input 
        v-model="email"
        type="email"
        label="email" 
      />
      <q-input 
        v-model="password"
        type="password"
        label="пароль" 
      />
      
      <div class="login__button">
        <q-btn 
          class="login__button--item" 
          @click="onLogin"
        >
          Войти
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AuthManager } from '../services/auth.service';

const email = ref();
const password = ref();
const router = useRouter();
const route = useRoute();

async function onLogin() {
  await AuthManager.login(email.value, password.value, router);
}

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  AuthManager.useAuthGuard(router, route);
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .login {
    padding: 14px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -95px;
    width: 400px;

    &__button {
      .q-btn {
        margin-top: 14px;
        width: 100%;
      }
    }
  }
}
</style>
