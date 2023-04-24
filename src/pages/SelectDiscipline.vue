<template>
  <div class="disc">
    <h4>Выберите дисциплину</h4>

    <p
      v-if="!disciplines?.length" 
      class="empty"
    >
      Диспциплин нет :c
    </p>
    <div v-else>
      <q-card
        v-for="discipline in disciplines"
        :key="discipline.Key"
        class="disc__item"
        :class="{ 'completed' : isCompleted(discipline.Key) }"
        @click="onChooseDiscipline(discipline.Key)"
      >
        <span>{{ discipline.Name }}</span>
        <span>{{ discipline.ShName }}</span>
        <p v-if="isCompleted(discipline.Key)">пройдено</p>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Cookies } from 'quasar';
import { api } from 'src/boot/axios';
import { IBasedResponse } from 'src/models/api.model';
import { AuthManager } from 'src/services/auth.service';
import { useStore } from 'src/stores/store';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const disciplines = ref();
const router = useRouter();
const store = useStore();
const route = useRoute();
const completeDisciplines = ref<Array<number>>([]);

function onChooseDiscipline(key: number) {
  router.push(store.isExpert ? `/expert/${key}` : `/student/discipline/${key}`);
}

function isCompleted(key: number) {
  return completeDisciplines.value?.includes(key);
}

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  AuthManager.useAuthGuard(router, route);

  disciplines.value = await api.get('/getMyDisciplines', {
    headers: {
      userkey: Cookies.get('UserKey'),
    }
  }).then((res) => res.data.Data);

  if (!store.isExpert) {
    completeDisciplines.value = await api.get<IBasedResponse<Array<number>>>(`/getCompleteDisciplines/${store.user.id}`).then((res) => res.data.Data);
  }
})
</script>

<style lang="scss" scoped>
.disc {
  width: 80vw;
  margin: 0 auto;

  h4 {
    font-size: 24px;
    color: #616161;
    line-height: 36px;
  }

  .empty {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    font-size: 24px;
    color: #616161;
  }

  &__item {
    margin-bottom: 8px;
    border-radius: 4px;
    padding: 14px;
    color: #fff;
    width: 33%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background-color: #1976D2;
    transition: .3s ease;
    cursor: pointer;
    
    span:first-child {
      font-size: 16px;
      font-weight: 500;
    }

    p {
      margin-bottom: 0;
      text-align: right;
    }

    &:hover {
      background-color: lighten(#1976D2, 5%);
    }

    &.completed {
      background-color: lighten(#1976D2, 15%);
      pointer-events: none;
    }
  }
}
</style>