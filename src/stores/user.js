// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    session: null,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      //  console.log(`User is ${user}`);
      if (user) this.user = user;
    },

    async fetchSession() {
      const { session, error } = await supabase.auth.getSession();
      //  console.log(`User is ${user}`);
      if (session) this.session = session;
    },

    async signUp(email, password, fullName) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: fullName,
          },
        },
      });
      if (error) throw error;
      //if (user) {
      this.user = user;
      console.log(`Signed up user is: ${this.user}`);
      // }
    },

    async signOut(email, password) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },

    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
