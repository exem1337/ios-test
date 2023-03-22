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
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref();
const password = ref();
const router = useRouter();

function onLogin() {
  console.log(router)
  router.push('/test');
  return true;
}
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
