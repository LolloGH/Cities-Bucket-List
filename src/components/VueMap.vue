<template>
  <div id="mapContainer"></div>
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

watch(
  () => props.coordinates,
  (newVal, oldVal) => {
    if (map != undefined) {
      map.remove();
    }

    setTimeout(function () {
      map.invalidateSize();
    }, 10);

    map = L.map("mapContainer");
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
    map.flyTo([newVal[1], newVal[0]], 3);
    cityMarker = L.marker([newVal[1], newVal[0]], {
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
        [newVal[1] + 5, newVal[0] + 5],
        [newVal[1], newVal[0]],
      ],
      {
        renderer: canvasRenderer,
      }
    ).addTo(map);

    //pathOne = L.curve(["M", myLocation, "Q", myLocation, newVal], {
    //  color: "red",
    //  fill: true,
    //}).addTo(map);

    // L.curve(["M", [50, 14], "Q", [52, 20], [49, 25]], {
    //   renderer: canvasRenderer,
    // }).addTo(map);
    /*
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
  }
);

/*
onMounted(() => {
  map = L.map("mapContainer");
  map.setView([0, 0], 1); //.setView([10.5, -67.05], 5);

  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  //use a mix of renderers
  var customPane = map.createPane("customPane");
  var canvasRenderer = L.canvas({ pane: "customPane" });
  customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400

  //const myLcoationMarker = L.marker(myLocation).addTo(map);
  /*

  L.marker([50, 14]).addTo(map);

  L.marker([53, 20]).addTo(map);
  L.marker([49.5, 19.5]).addTo(map);
  L.marker([49, 25]).addTo(map);
  L.marker([-10, 25]).addTo(map);
  L.marker([10, -25]).addTo(map);
  L.marker([0, 0]).addTo(map);


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
//
});
*/

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
});
</script>

<style scoped>
#mapContainer {
  width: 91vw;
  height: 100%;
  margin-bottom: 5px;
  border-radius: 5px;
}

@media screen and (min-width: 600px) {
  #mapContainer {
    width: 100%;
    height: 100%;
    margin-bottom: 5px;
    border-radius: 5px;
  }
}
</style>
