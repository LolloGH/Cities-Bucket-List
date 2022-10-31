import { defineStore } from "pinia";
import router from "src/router";
import { supabase } from "src/supabase";

export const useCitiesStore = defineStore({
  id: "cities",
  state: () => ({
    cities: null,
    myLocation: [],
  }),

  actions: {
    async insertCity(cName, userID, vDate, cHighlights, cImage, cAttrib, cGeo) {
      const { data, error } = await supabase.from("cities").insert([
        {
          city_name: cName,
          user_id: userID,
          visit_date: vDate,
          city_highlights: cHighlights,
          image_URL: cImage,
          img_attribution_tag: cAttrib,
          city_geoCode: cGeo,
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

    async markVisitedUnvisited(cityID, visited) {
      console.log(cityID, visited);
      const { data, error } = await supabase
        .from("cities")
        .update({ is_visited: visited })
        .match({ id: cityID });

      if (error) throw error;

      console.log(data[0].is_visited);
    },

    async fetchCities() {
      const { data, error } = await supabase.from("cities").select();

      if (!data.value) {
        this.cities = [...data];
      }
    },

    getLocation() {
      const coords = [];
      navigator.geolocation.getCurrentPosition((success, error) => {
        if (error) {
          console.log(`Error: ${error}`);
          return [0, 0];
        } else {
          coords[0] = success.coords.longitude;
          coords[1] = success.coords.latitude;

          for (let i = 0; i < coords.length; i++) {
            this.myLocation.unshift(coords[i]);
          }
        }
      });
    },
  },
});
