import { defineStore } from "pinia";
import { supabase } from "src/supabase";

export const useCitiesStore = defineStore({
  id: "cities",
  state: () => ({
    cities: null,
    /* cityName: "",
    visitDate: "",
    cityHighlights: null, */
  }),

  actions: {
    async insertCity(userID) {
      const { data, error } = await supabase.from("cities").insert([
        {
          city_name: "Roma",
          user_id: userID,
        },
      ]);

      if (error) throw error;
    },

    async fetchCities() {
      const { data, error } = await supabase.from("cities").select();

      if (!data.value) {
        this.cities = [...data];
      }
    },
  },
});
