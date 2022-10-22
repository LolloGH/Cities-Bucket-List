<script setup>
import { useCitiesStore } from "../stores/cities";
import { useUserStore } from "../stores/user";
import { useAlertStore } from "../stores/alert";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated, ref } from "vue";
import { useRouter } from "vue-router";

//import countries from "../assets/countries.json";

const userStore = useUserStore();
const cityStore = useCitiesStore();
const { cities } = storeToRefs(cityStore);
const { user, session } = storeToRefs(userStore);
const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
const router = useRouter();

const prompt = ref(false);
const cName = ref("");
const vDate = ref("");
const cHighlights = ref("");
const itemID = ref("");

/*
const country = [];

countries.forEach((elem) => {
  country.push(elem.capital);
});

const allCities = country.flat();

console.log(allCities);
*/

// async function newCity() {
//   console.log(user.value.id);
//   await cityStore.insertCity(user.value.id);
// }

async function getCities() {
  // console.log(user.value.id);
  await cityStore.fetchCities();
}

function onClick() {
  //console.log("Clicked on a fab action");
}

function onDelete(itemID, itemName) {
  cityStore.deleteCity(itemID);
  alertStore.error(
    `${itemName} has been correctly removed for your bucket list`
  );
}

function onUpdate(itemName, itemDate, itemHighlights, id) {
  prompt.value = true;
  cName.value = itemName;
  vDate.value = itemDate;
  cHighlights.value = itemHighlights;
  itemID.value = id;
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
  <div class="dial">
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

  <div v-for="city in cities" :key="city.id" class="q-pa-md">
    <q-card class="my-card">
      <q-parallax
        src="https://cdn.quasar.dev/img/parallax1.jpg"
        :height="150"
      />

      <q-card-section>
        <div class="text-h6">{{ city.city_name }}</div>
        <div v-if="city.visit_date" class="text-subtitle2">
          Wishing to visit on: {{ city.visit_date.slice(0, 10) }}
        </div>
        <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]"> -->
        <q-fab
          class="exp-button"
          push
          icon="keyboard_arrow_right"
          direction="right"
          color="Gunmetal-Gray"
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
            @click="onDelete(city.id, city.city_name)"
            color="Pewter"
            icon="delete"
          />
        </q-fab>
        <!-- </q-page-sticky> -->
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
  position: relative


.exp-button
  position: absolute
  right: 15px
  bottom: 15px
</style>
