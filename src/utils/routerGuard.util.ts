import { EUserRole } from "src/enums/userRole.enum";
import { useStore } from "src/stores/store";
import { useRoute, useRouter } from "vue-router";

export function useRouterGuard() {
  const route = useRoute();
  const store = useStore();
  const router = useRouter();

  if (route.path.includes('/expert') && store.user?.role?.Name === EUserRole.Student) {
    router.push('/');
  }

  if (route.path.includes('/proceed') && store.user?.role?.Name === EUserRole.Expert) {
    router.push('/expert');
  }
}