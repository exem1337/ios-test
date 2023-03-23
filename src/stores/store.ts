import { defineStore } from 'pinia'
import { IUser } from 'src/models/user.model';

export const useStore = defineStore('counter', {
  state: () => ({
    user: {} as IUser
  }),
  getters: {
    getUser: (state) => state.user
  },
  actions: {
    setUser(user: IUser) {
      this.user = user;
    }
  }
})
