<script setup>
import { useCitiesStore } from "../stores/cities";
import { useUserStore } from "../stores/user";
import { useAlertStore } from "../stores/alert";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated, ref } from "vue";
import { useRouter } from "vue-router";

import Map from "./MyMap.vue";

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

async function getCities() {
  // console.log(user.value.id);
  await cityStore.fetchCities();
}

function onClick(itemName, itemDate, itemHighlights, id, itemURL) {
  cName.value = itemName;
  vDate.value = itemDate;
  cHighlights.value = itemHighlights;
  itemID.value = id;
  cURL.value = itemURL;
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
}

function onUpdate(itemName, itemDate, itemHighlights, id) {
  prompt.value = true;
}

async function confirmUpdate() {
  await cityStore.editCity(itemID.value, vDate.value, cHighlights.value);
  getCities();
}

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

  <div v-for="city in cities" :key="city.id" class="q-pa-md">
    <q-card class="my-card">
      <q-parallax
        :src="city.image_URL || 'https://cdn.quasar.dev/img/parallax1.jpg'"
        :height="250"
      />
      <!-- <q-img
        :src="city.image_URL || 'https://cdn.quasar.dev/img/parallax1.jpg'"
      /> -->

      <q-card-section>
        <div class="text-h6">{{ city.city_name }}</div>
        <div v-if="city.visit_date" class="text-subtitle2">
          Wishing to visit on: {{ city.visit_date.slice(0, 10) }}
        </div>

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
              city.image_URL
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
          <q-fab-action @click="confirm = true" color="Pewter" icon="delete" />
        </q-fab>

        <!-- Expandable dropdown to show city highlights -->
        <q-card-actions>
          <q-space />
          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </q-card-actions>
      </q-card-section>
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ city.city_highlights }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
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
  <!-- <Map /> -->
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
  position: relative


.exp-button
  position: absolute
  right: 15px
  bottom: 65px
</style>
