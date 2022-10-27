<template>
  <div>{{ coordinates }}</div>
  <div id="mapContainer"></div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//import "../public/Tween.js";
import "../LeafletMaps/leaflet.curve";
import { onMounted, onBeforeUnmount, toRefs } from "vue";

let map = null;

const props = defineProps({
  coordinates: {
    type: Array,
  },
});

onMounted(() => {
  if (!props.coordinates) {
    map = L.map("mapContainer").setView(props.coordinates, 5); //.setView([10.5, -67.05], 5);
  } else {
    map = L.map("mapContainer").setView([10.5, -67.05], 5); //.setView([10.5, -67.05], 5);
  }
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  //use a mix of renderers
  var customPane = map.createPane("customPane");
  var canvasRenderer = L.canvas({ pane: "customPane" });
  customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400
  L.marker([50, 14]).addTo(map);

  L.marker([53, 20]).addTo(map);
  L.marker([49.5, 19.5]).addTo(map);
  L.marker([49, 25]).addTo(map);
  L.marker([-10, 25]).addTo(map);
  L.marker([10, -25]).addTo(map);
  L.marker([0, 0]).addTo(map);

  /*
    var pathOne = L.curve(["M", [50, 14], "Q", [53, 20], [49, 25]], {
      renderer: canvasRenderer,
    }).addTo(this.map);
    L.curve(["M", [50, 14], "Q", [52, 20], [49, 25]], {
      renderer: canvasRenderer,
    }).addTo(this.map);
    L.curve(["M", [50, 14], "Q", [51, 20], [49, 25]], {
      renderer: canvasRenderer,
    }).addTo(this.map);
    L.curve(["M", [50, 14], "Q", [50, 20], [49, 25]], {
      renderer: canvasRenderer,
    }).addTo(this.map);
    L.curve(["M", [50, 14], "Q", [47, 20], [49, 25]], {
      renderer: canvasRenderer,
    }).addTo(this.map);
    */
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
});
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
  margin-bottom: 5px;
  border-radius: 5px;
}
</style>
