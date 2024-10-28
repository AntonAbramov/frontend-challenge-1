import { makeAutoObservable } from "mobx";
import { getMe, UserInterface } from "~/services";

class UserStore {
  user: UserInterface | undefined;
  pending: boolean = true;

  constructor() {
    makeAutoObservable(this);

    this.init();
  }
  init() {
    getMe()
      .then((user) => {
        this.user = user;
      })
      .finally(() => {
        this.pending = false;
      });
  }

  setUser(user: UserInterface) {
    this.user = user;
  }
}

const userStore = new UserStore();
export default userStore;
