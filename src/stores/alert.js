import { defineStore } from "pinia";

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alert: null,
  }),

  actions: {
    success(message) {
      this.alert = { message, type: "alert-success" };
      console.log(this.alert);
    },
    error(message) {
      this.alert = { message, type: "alert-danger" };
    },

    successFade(message) {
      this.alert = { message, type: "alert-success-fade" };
      console.log(this.alert);
    },
    errorFade(message) {
      this.alert = { message, type: "alert-danger-fade" };
    },
    clear() {
      this.alert = null;
    },
  },
});
