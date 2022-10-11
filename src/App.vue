<template>
  <section>
    <router-view />
  </section>
</template>

<script setup>
import { defineComponent, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      console.log("not logged in");
      // redirect them to logout if the user is not there
      //router.push({ path: "/auth" });
    } else {
      // continue to dashboard
      console.log(`user ${user.value} LOGGED IN`);
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});

// Testing weather API
/*
async function fetchWeather() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=42&longitude=-112&hourly=temperature_2m";
  const response = await fetch(url);
  if (response.ok) {
    const json = await response.json();
    console.log(json);
  }
}
*/
// END Weather API

// export default defineComponent({
//   name: "App",
// });
//
</script>
