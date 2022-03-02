import React from "react";
import { makeObservable, action, observable, computed } from "mobx";
import dayjs from "dayjs";
import { UserStoreObject } from "../lib/UserStoreObject";
import { instance } from "../api/api";
import Cookies from "js-cookie";
class UserStore {
  id: number | null = null;
  email: string | null = null;
  token: string | null = null;
  tokenExpiry: string | null = null;
  tokenExpiryMilliseconds: number = 86400000;

  constructor() {
    makeObservable(this, {
      id: observable,
      email: observable,
      token: observable,
      tokenExpiry: observable,
      createSession: action.bound,
      refreshToken: action.bound,
      updateTokenExpiry: action.bound,
      onTokenRefresh: computed,
      getNewExpiry: computed,
      destroySession: action.bound,
    });
    const persistedStore: any = Cookies.get("userData");
    if (persistedStore !== '' && persistedStore !== undefined) {
      const parsedStore = JSON.parse(persistedStore);
      this.id = parsedStore.id;
      this.email = parsedStore.email;
      this.token = parsedStore.token;
      this.tokenExpiry = parsedStore.tokenExpiry;
      this.tokenExpiryMilliseconds =
        dayjs(parsedStore.tokenExpiry).diff(dayjs());
    }
  }

  createSession = (user: UserStoreObject) => {
    this.id = user.id;
    this.email = user.email;
    this.token = user.authentication_token;
    this.tokenExpiry = user.authentication_token_expire_at;
    this.tokenExpiryMilliseconds =
      dayjs(user.authentication_token_expire_at).diff(dayjs());
    this.setLocalStorage();
  };
  setLocalStorage = () => {
    document.cookie = `userData=${JSON.stringify({
      id: this.id,
      email: this.email,
      token: this.token,
      tokenExpiry: this.tokenExpiry,
    })}; expires=${this.tokenExpiry}; path=/`;
  };

  refreshToken = async () => {
    try {
      const { data, status } = await instance({
        url: "users/refresh_token",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        method: "POST",
      });
      if (status === 200 && data.hasOwnProperty("success") && data.success) {
        const {
          data: { user },
        } = data;
        this.createSession(user);
      }
    } catch (e) {
      // await this.destroySession();
      return false
    } finally {
      console.log("token refreshed");
    }
    return this.tokenExpiryMilliseconds;
  };
  get onTokenRefresh(){
      console.log(this.tokenExpiryMilliseconds);
      return this.tokenExpiryMilliseconds < 200000
  }
  updateTokenExpiry = (milSeconds: number) => {
        this.tokenExpiryMilliseconds = milSeconds;
  }
  get getNewExpiry(){
    return this.tokenExpiryMilliseconds;
  }
  destroySession = async () => {
    this.id = null;
    this.email = null;
    this.token = null;
    this.tokenExpiry = null;
    this.tokenExpiryMilliseconds = 86400000;
    Cookies.set('userData', "");
    return true;
  }

}

export const userStore = new UserStore();

export const UserContext = React.createContext(userStore);
export const useUserContext = () => React.useContext(UserContext);
