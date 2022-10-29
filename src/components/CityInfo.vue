<template>
  <div class="info">
    <div v-if="theCity.name">
      <div class="title">
        {{ theCity.geo?.features[0].properties.display_name }}
      </div>
      <div class="story">
        <br />
        You are {{ distance }}Km and {{ difference }} days away from your dream
        destination!
      </div>
    </div>
    <div class="alternate" v-else>Click on a city image on the left</div>
  </div>
</template>

<script setup>
import { useCitiesStore } from "../stores/cities";
import { storeToRefs } from "pinia";
import { watch, ref } from "vue";

const cityStore = useCitiesStore();
const { myLocation } = storeToRefs(cityStore);
const distance = ref();
const difference = ref(0);

const props = defineProps({
  theCity: Object,
  coordinates: Array,
});

watch(
  () => props.coordinates,
  (newVal, oldVal) => {
    const R = 6371e3; // metres
    const φ1 = (newVal[1] * Math.PI) / 180; // φ, λ in radians
    const φ2 = (myLocation.value[0] * Math.PI) / 180;
    const Δφ = ((myLocation.value[0] - newVal[1]) * Math.PI) / 180;
    const Δλ = ((myLocation.value[1] - newVal[0]) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    distance.value = Math.round((R * c) / 1000); // in Kilometres
  }
);

watch(
  () => props.theCity.visitDate,
  (newVal, oldVal) => {
    // a and b are javascript Date objects

    function dateDiffInDays(a, b) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    const a = new Date(Date.now()),
      b = new Date(props.theCity.visitDate);

    if (props.theCity.visitDate) {
      difference.value = dateDiffInDays(a, b);

      //console.log(difference + " days");
    }
  }
);
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 0.9rem;
  font-weight: 700;
  padding-top: 10px;
}

/* .story,
.alternate {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 400;
}

.alternate {
  margin-top: 40px;
} */

.info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  align-items: center;
}
</style>
