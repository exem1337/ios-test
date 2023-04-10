<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { AuthManager } from './services/auth.service';
import { useRouter } from 'vue-router';

const router = useRouter();

onBeforeMount(async () => {
  await AuthManager.refresh(router);
})
</script>
