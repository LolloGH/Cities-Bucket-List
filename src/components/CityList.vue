<script setup>
import { useCitiesStore } from "../stores/cities";
import { useUserStore } from "../stores/user";
import { useAlertStore } from "../stores/alert";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated, ref, reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

import cityInfo from "../components/CityInfo.vue";
import cityInfoModal from "../components/CityInfoModal.vue";
import Map from "./VueMap.vue";

const $q = useQuasar();

const showCard = ref(false);

const userStore = useUserStore();
const cityStore = useCitiesStore();
const { cities } = storeToRefs(cityStore);
const { user, session } = storeToRefs(userStore);
const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
const router = useRouter();

const expanded = ref(false);

const prompt = ref(false);
const confirm = ref(false);

const cName = ref("");
const vDate = ref("");
const cHighlights = ref("");
const itemID = ref("");
const cURL = ref(""); //ref("https://cdn.quasar.dev/img/parallax1.jpg");
const imgAttribution = ref("");

const selectedCity = ref({});

const cityGeoCoord = reactive({ data: [] });

async function getCities() {
  // console.log(user.value.id);
  await cityStore.fetchCities();
}

console.log($q.platform.is);

function onClick(
  itemName,
  itemDate,
  itemHighlights,
  id,
  itemURL,
  itemAttribution,
  itemGeo
) {
  cName.value = itemName;
  vDate.value = itemDate;
  cHighlights.value = itemHighlights;
  itemID.value = id;
  cURL.value = itemURL;
  imgAttribution.value = itemAttribution;
  selectedCity.value.name = itemName;
  selectedCity.value.visitDate = itemDate;
  selectedCity.value.highlights = itemHighlights;
  selectedCity.value.geo = itemGeo;

  if (selectedCity.value.geo.features[0].geometry.coordinates) {
    cityGeoCoord.data = [
      ...selectedCity.value.geo.features[0].geometry.coordinates,
    ];
  } else cityGeoCoord.data = [0, 0];

  showCard.value = true;
  console.log(
    `Showcard is ${showCard.value} and platform is ${$q.platform.is.mobile}`
  );
}

function onDelete() {
  const cityName = cName.value;
  confirm.value = true;
  cityStore.deleteCity(itemID.value);
  alertStore.successFade(
    `${cityName} has been correctly removed for your bucket list`
  );
  cName.value = "";
  vDate.value = "";
  cHighlights.value = "";
  itemID.value = "";
  cURL.value = "https://cdn.quasar.dev/img/parallax1.jpg";
  imgAttribution.value = "";

  getCities();
}

function onUpdate(itemName, itemDate, itemHighlights, id) {
  prompt.value = true;
}

async function toggleVisited(id, visited) {
  getCities();
  await cityStore.markVisitedUnvisited(id, visited);
  getCities();
}

async function confirmUpdate() {
  await cityStore.editCity(itemID.value, vDate.value, cHighlights.value);
  getCities();
}

// onBeforeMount(() => {
//   cityGeoCoord.value.data = [0, 0];
// });

onMounted(() => {
  getCities();
});

onUpdated(() => {
  getCities();
});
</script>

<template>
  <!-- Dialog to confirm deletion of a city  -->

  <div class="delete-confirm">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="warning" text-color="white" />
          <span class="q-ml-sm"
            >Are you sure you want to remove {{ cName }} from your list?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" text-color="Gunmetal-Gray" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="Gunmetal-Gray"
            @click="onDelete()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

  <!-- Dialog to edit city details -->

  <div class="edit-dialog">
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ cName }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            filled
            v-model="vDate"
            mask="date"
            :rules="['date']"
            label="Change desired trip date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="vDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            label="Add or edit your notes about this city"
            dense
            v-model="cHighlights"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-Gunmetal-Gray">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Edit City" @click="confirmUpdate" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

  <!-- Main v-for to list all cities in table  -->

  <div class="city-page-container">
    <div class="city-container">
      <TransitionGroup name="fade">
        <div
          v-for="city in cities"
          :key="city.id"
          class="q-pa-md"
          style="padding: 8px 4px"
        >
          <q-card class="my-card">
            <div class="img-container">
              <q-parallax
                @click="
                  onClick(
                    city.city_name,
                    city.visit_date,
                    city.city_highlights,
                    city.id,
                    city.image_URL,
                    city.img_attribution_tag,
                    city.city_geoCode
                  )
                "
                class="image cursor-pointer"
                :src="
                  city.image_URL || 'https://cdn.quasar.dev/img/parallax1.jpg'
                "
                :height="200"
              />
              <!-- Expandable plus button for city actions -->
              <q-fab
                class="exp-button"
                push
                icon="keyboard_arrow_right"
                direction="right"
                color="Gunmetal-Gray"
                @click="
                  onClick(
                    city.city_name,
                    city.visit_date,
                    city.city_highlights,
                    city.id,
                    city.image_URL,
                    city.img_attribution_tag,
                    city.city_geoCode
                  )
                "
              >
                <q-fab-action
                  @click="
                    onUpdate(
                      city.city_name,
                      city.visit_date,
                      city.city_highlights,
                      city.id
                    )
                  "
                  color="Pewter"
                  icon="edit"
                />
                <q-fab-action
                  @click="confirm = true"
                  color="Pewter"
                  icon="delete"
                />
              </q-fab>
              <div class="overlay" v-html="city.img_attribution_tag"></div>
            </div>

            <q-card-section>
              <div class="text-h6 spaced-items">
                {{ city.city_name }}

                <q-checkbox
                  v-model="city.is_visited"
                  checked-icon="beenhere"
                  unchecked-icon="incomplete_circle"
                  indeterminate-icon="help"
                  label="Been there?"
                  left-label
                  @click="toggleVisited(city.id, city.is_visited)"
                  id="check"
                />
              </div>
              <div v-if="city.visit_date" class="text-subtitle2 spaced-items">
                Wishing to visit on: {{ city.visit_date.slice(0, 10) }}
                <!-- Expandable dropdown to show city highlights -->

                <q-btn
                  color="grey"
                  round
                  flat
                  dense
                  :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="expanded = !expanded"
                />
              </div>
            </q-card-section>
            <q-slide-transition>
              <div v-show="expanded">
                <q-separator />
                <q-card-section class="text-subtitle2">
                  {{ city.city_highlights }}
                </q-card-section>
              </div>
            </q-slide-transition>
          </q-card>
        </div>
      </TransitionGroup>
    </div>

    <div v-if="$q.platform.is.desktop" class="q-pa-md" style="margin-top: 0px">
      <div class="bg-Cool-Gray city-info-container">
        <h6>City Info</h6>
        <div class="city-info">
          <cityInfo :theCity="selectedCity" :coordinates="cityGeoCoord.data">
          </cityInfo>
        </div>
        <div class="city-map">
          <Map :coordinates="cityGeoCoord.data"></Map>
        </div>
      </div>
    </div>
    <div v-else>
      <q-dialog maximized v-model="showCard">
        <div class="city-modal lt-xs">
          <q-card class="my-card bg-Pewter">
            <q-card-actions align="right">
              <q-btn v-close-popup flat color="primary" icon="close" />
            </q-card-actions>

            <q-card-section>
              <div class="q-pa-xs" style="margin-top: 0px">
                <div class="bg-Cool-Gray city-info-container">
                  <h6>City Info</h6>
                  <div class="city-info">
                    <cityInfo
                      :theCity="selectedCity"
                      :coordinates="cityGeoCoord.data"
                    >
                    </cityInfo>
                  </div>

                  <div class="city-map">
                    <Map :coordinates="cityGeoCoord.data"></Map>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-card-section> </q-card-section>
          </q-card>
        </div>
      </q-dialog>
    </div>
    <!-- <cityInfoModal
        class="lt-xs"
        v-if="$q.platform.is.mobile && showCard"
        v-model="showCard"
      ></cityInfoModal> -->
  </div>
  <!-- Plus button to add new city -->

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
      fab
      icon="add"
      color="myRed"
      @click="router.push({ path: '/newCity' })"
    />
  </q-page-sticky>
</template>

<style scoped>
.spaced-items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.my-card {
  width: 100%;
  height: 100%;
  position: relative;
}

.city-container {
  height: 80vh;
}

.exp-button {
  position: absolute;
  right: 15px;
  bottom: 65px;
}
.city-page-container {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  margin-left: 5px;
  margin-right: 5px;
}

.city-info-container {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 85vh;
  padding: 5px;
  width: 100%;

  border-radius: 5px;
  background-color: Cool-Gray;
}

.city-info {
  width: 100%;
  height: 35%;
  background-color: #eeede7;
  padding: 0px 5px 5px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.city-map {
  width: 70vw;
  height: 65%;
}

h6 {
  margin-top: -6px;
  margin-bottom: 2px;
  padding-bottom: 5px;

  border-radius: 5px;
  color: #eeede7;
  text-align: center;
}

#check {
  font-size: small;
}

.img-container {
  position: relative;
}

.image {
  display: block;
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.8);
  color: #f1f1f1;
  width: 100%;
  transition: 0.7s ease;
  opacity: 0;
  color: white;
  font-size: 14px;
  padding: 5px 20px 5px 5px;
  text-align: right;
}
.img-container:hover .overlay {
  opacity: 1;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}

/* When the browser is at least 600px and above */
@media screen and (min-width: 600px) {
  .city-page-container {
    grid-template-columns: 1fr 1.5fr;
  }

  .my-card {
    width: 100%;
    height: 30%;
    position: relative;
  }

  .city-info-container {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    height: 76vh;
    padding: 10px;
    width: 100%;
    position: fixed;
    bottom: 30px;
    top: 19.5vh;
    right: 10px;
    width: 52vw;
    border-radius: 5px;
    background-color: Cool-Gray;
  }

  .city-map {
    width: 100%;
    height: 65%;
  }
}
</style>
