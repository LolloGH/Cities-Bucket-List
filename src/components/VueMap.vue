<template>
  <div id="mapContainer"></div>
  <!-- <LMap> </LMap> -->
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LMap } from "@vue-leaflet/vue-leaflet";
//import "../public/Tween.js";
import "../LeafletMaps/leaflet.curve";
import { onMounted, onUpdated, onBeforeUnmount, watch, ref } from "vue";

let map;
let cityMarker;
let customPane;
let canvasRenderer;
let pathOne;

//const myLocation = [locateMe()[0], locateMe()[1]];

const props = defineProps({
  coordinates: {
    type: Array /*,
    default() {
      return [0, 0];
    },*/,
  },
});

const propsAlias = ref(props.coordinates);
console.log(`We are in VueMap: ${propsAlias.value}`);

var myLocation = [];

function locateMe() {
  const coords = [];
  navigator.geolocation.getCurrentPosition((success, error) => {
    if (error) {
      console.log(`Error: ${error}`);
      return [0, 0];
    } else {
      //console.log([success.coords.longitude, success.coords.latitude]);
      coords[0] = success.coords.longitude;
      coords[1] = success.coords.latitude;

      //console.log(coords);
      //myLocation = [...coords];
      //console.log(`My Location is: ${coords}`);
      //myLocation.splice(0, 2);
      for (let i = 0; i < coords.length; i++) {
        myLocation.unshift(coords[i]);
      }
      // console.log(`My Location is: ${myLocation}`);
    }
  });
}

locateMe();
console.log(`My Location is: ${myLocation}`);

watch(
  () => props.coordinates,
  (newVal, oldVal) => {
    console.log(`Watcher lcation is ${myLocation}`);
    console.log(`Watcher old: ${oldVal} and new: ${newVal}`);
    //map = L.map("mapContainer").setView(newVal, 5); // check flyTo function instead of setView
    console.log(`Now flying to: ${newVal}`);
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
    L.marker(myLocation).addTo(map);

    // L.marker([53, 20]).addTo(map);
    // L.marker([49.5, 19.5]).addTo(map);
    // L.marker([49, 25]).addTo(map);
    // L.marker([-10, 25]).addTo(map);
    // L.marker([10, -25]).addTo(map);
    // L.marker([0, 0]).addTo(map);

    pathOne = L.curve(
      [
        "M",
        myLocation,
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

onMounted(() => {
  // locateMe();
  //console.log(`My Location is: ${myLocation}`);
  console.log(`On Mounted: ${props.coordinates}`);
  //if (propsAlias.value) {
  //  map = L.map("mapContainer").setView(propsAlias.value, 5); //.setView(props.coordinates, 1); // check flyTo function instead of setView
  //} else {
  map = L.map("mapContainer");
  map.setView([0, 0], 1); //.setView([10.5, -67.05], 5);
  //}

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
*/
});

/*
onUpdated(() => {
  console.log(`On Updated: ${propsAlias.value}`);
  if (!propsAlias.value) {
    map = L.map("mapContainer").setView(propsAlias.value, 1); // check flyTo function instead of setView
  } else {
    map = L.map("mapContainer").setView([10.5, -67.05], 1); //.setView([10.5, -67.05], 5);
  }

  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map); /*
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

});
*/

onBeforeUnmount(() => {
  /*
  if (map) {
    map.remove();
  }
  */
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
