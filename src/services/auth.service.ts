import { EUserRole } from "src/enums/userRole.enum";
import { useStore } from "src/stores/store";
import { Router } from "vue-router";

export class AuthManager {
  static async login(email: string, password: string, router: Router): Promise<void> {
    const store = useStore();

    store.setUser({
      id: 0,
      name: 'sas',
      role: EUserRole.Expert,
    })

    if (store.getUser?.role === EUserRole.Expert) {
      router.push('/expert');
    }

    else router.push('/test');
  } 
}