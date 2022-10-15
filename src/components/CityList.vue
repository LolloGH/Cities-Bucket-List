<script setup>
import { useCitiesStore } from "../stores/cities";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated } from "vue";
import citySearch from "components/CitySearch.vue";
//import countries from "../assets/countries.json";

const userStore = useUserStore();
const cityStore = useCitiesStore();
const { cities } = storeToRefs(cityStore);
const { user, session } = storeToRefs(userStore);

/*
const country = [];

countries.forEach((elem) => {
  country.push(elem.capital);
});

const allCities = country.flat();

console.log(allCities);
*/

async function newCity() {
  console.log(user.value.id);
  await cityStore.insertCity(user.value.id);
}

async function getCities() {
  // console.log(user.value.id);
  await cityStore.fetchCities();
}

onMounted(() => {
  getCities();
});

onUpdated(() => {
  getCities();
});
</script>

<template>
  <div>Welcome to myCities</div>
  <q-btn color="amber" glossy label="New City" @click="newCity" />
  <q-btn color="red" glossy label="Fetch" @click="getCities" />
  <citySearch />
  <!-- <div v-for="city in cities" :key="city.id">
    City Name is {{ city.city_name }} City id is {{ city.id }}
  </div> -->

  <div v-for="city in cities" :key="city.id" class="q-pa-md">
    <q-card class="my-card">
      <q-parallax
        src="https://cdn.quasar.dev/img/parallax1.jpg"
        :height="150"
      />

      <q-card-section>
        <div class="text-h6">{{ city.city_name }}</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>
