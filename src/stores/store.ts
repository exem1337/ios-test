import { defineStore } from 'pinia'
import { EUserRole } from 'src/enums/userRole.enum';
import { IUser } from 'src/models/user.model';

export const useStore = defineStore('user', {
  state: () => ({
    user: {} as IUser
  }),
  getters: {
    getUser: (state) => state.user,
    isExpert: (state) => state.user.role.Name === EUserRole.Expert,
    isLoggedIn: (state) => !!state.user.id,
  },
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
    logout() {
      this.user = {} as IUser;
    }
  }
})
