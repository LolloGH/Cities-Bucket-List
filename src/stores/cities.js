import { defineStore } from "pinia";
import { supabase } from "src/supabase";

export const useCitiesStore = defineStore({
  id: "cities",
  state: () => ({
    cities: null,
  }),

  actions: {
    async insertCity(cName, userID, vDate, cHighlights) {
      const { data, error } = await supabase.from("cities").insert([
        {
          city_name: cName,
          user_id: userID,
          visit_date: vDate,
          city_highlights: cHighlights,
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
