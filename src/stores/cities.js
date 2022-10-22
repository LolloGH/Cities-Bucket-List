import { defineStore } from "pinia";
import router from "src/router";
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

    async deleteCity(cityID) {
      const { data, error } = await supabase
        .from("cities")
        .delete()
        .match({ id: cityID });

      if (error) throw error;
    },

    async editCity(cityID, visitDate, cityHighlights) {
      const { data, error } = await supabase
        .from("cities")
        .update({ visit_date: visitDate, city_highlights: cityHighlights })
        .match({ id: cityID });

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
