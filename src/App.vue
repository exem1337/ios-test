<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { AuthManager } from './services/auth.service';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// onBeforeMount(async () => {
//   await AuthManager.refresh(router);
//   AuthManager.useAuthGuard(router, route);
// })
</script>
