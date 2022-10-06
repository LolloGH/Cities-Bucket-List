<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

console.log("Starting here");

const url = 'https://api.open-meteo.com/v1/forecast?latitude=42&longitude=-112&hourly=temperature_2m';
fetch(url)
.then(data => data.json())
.then((json) => {
    console.log(JSON.stringify(json));
})


export default defineComponent({
  name: 'App'
})
</script>
