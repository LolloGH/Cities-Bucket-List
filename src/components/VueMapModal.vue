<template>
  <div id="mapContainerMod"></div>
</template>

<script setup>
import { useCitiesStore } from "../stores/cities";
import { storeToRefs } from "pinia";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//import "../LeafletMaps/Tween.js";
import "../LeafletMaps/leaflet.curve";
import { onMounted, watch, onBeforeUnmount, onUpdated } from "vue";

const cityStore = useCitiesStore();
const { myLocation } = storeToRefs(cityStore);

let map;
let cityMarker;
let customPane;
let canvasRenderer;
let pathOne;

const props = defineProps({
  coordinates: {
    type: Array,
  },
});

// watch(
//   () => props.coordinates,
//   (newVal, oldVal) => {
onMounted(() => {
  if (map != undefined) {
    map.remove();
  }

  setTimeout(function () {
    map.invalidateSize();
    console.log("invalidated size");
  }, 1000);

  map = L.map("mapContainerMod");
  map.setView([0, 0], 1); //.setView([10.5, -67.05], 5);

  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  //use a mix of renderers
  var customPane = map.createPane("customPane");
  var canvasRenderer = L.canvas({ pane: "customPane" });
  customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400

  //map = L.map("mapContainer").setView(newVal, 5); // check flyTo function instead of setView

  if (cityMarker) map.removeLayer(cityMarker);
  if (pathOne) map.removeLayer(pathOne);
  map.flyTo([props.coordinates[1], props.coordinates[0]], 3);
  cityMarker = L.marker([props.coordinates[1], props.coordinates[0]], {
    title: "My dream city",
  }).addTo(map);

  //use a mix of renderers
  customPane = map.createPane("customPane");
  canvasRenderer = L.canvas({ pane: "customPane" });
  customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400
  L.marker(myLocation.value).addTo(map);

  pathOne = L.curve(
    [
      "M",
      myLocation.value,
      "Q",
      [props.coordinates[1] + 5, props.coordinates[0] + 5],
      [props.coordinates[1], props.coordinates[0]],
    ],
    {
      renderer: canvasRenderer,
    }
  ).addTo(map);
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
});
</script>

<style scoped>
#mapContainerMod {
  width: 91vw;
  height: 50vh;
  margin-bottom: 5px;
  border-radius: 5px;
}

.leaflet-default-icon-path {
  background-image: url(https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png);
}

@media screen and (min-width: 600px) {
}
</style>
