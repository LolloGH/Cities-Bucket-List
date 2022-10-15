import { defineStore } from "pinia";

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alert: null,
    loading: false,
  }),

  actions: {
    success(message) {
      this.alert = { message, type: "alert-success" };
    },
    error(message) {
      this.alert = { message, type: "alert-danger" };
    },
    clear() {
      this.alert = null;
    },

    // loading widget actions
    startLoading() {
      this.loading = true;
    },

    stopLoading() {
      this.loading = false;
    },
  },
});
