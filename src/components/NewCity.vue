<template>
  <div class="input-city">
    <div class="text-h5 center">
      Hey buddy, welcome back! <br />Where are we going next?
    </div>
    <div class="q-pa-md" style="max-width: 500px; width: 60vw">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <CitySearch v-model="cityName" />

        <q-input
          filled
          v-model="date"
          mask="date"
          :rules="['date']"
          hint="When are we travelling?"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          v-model="text"
          filled
          type="textarea"
          hint="Anything special that you want to note down for this destination?"
        />

        <div class="form-buttons">
          <q-btn
            label="Let's go!"
            type="submit"
            style="background: #738580; color: white"
          />

          <q-btn outline style="color: #738580" label="Reset" type="reset" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<style scoped>
.input-city {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 350px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}
</style>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useCitiesStore } from "../stores/cities";
import CitySearch from "../components/CitySearch.vue";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_API_KEY,
});

const $q = useQuasar();

const router = useRouter();
const userStore = useUserStore();
const cityStore = useCitiesStore();
const { user, session } = storeToRefs(userStore);
const { city } = storeToRefs(cityStore);

const date = ref("2022/12/01");

// const name = ref(null);
const cityName = ref(null);
const text = ref("");

const imageURL = ref("");

async function getImage(city) {
  const result = await unsplash.search.getPhotos({
    query: city,
    page: 1,
    perPage: 1,

    orientation: "landscape",
  });

  if (result.errors) {
    // handle error here
    console.log("error occurred: ", result.errors[0]);
  } else {
    // handle success here
    const photo = result.response;
    console.log(photo);
    imageURL.value = photo.results[0].urls.regular.toString();
    console.log(imageURL.value);
  }
}

async function onSubmit() {
  userStore.fetchUser();

  await getImage(cityName.value[0]);

  console.log(
    cityName.value[0],
    text.value,
    date.value,
    user.value.id,
    imageURL.value
  );

  cityStore.insertCity(
    cityName.value[0],
    user.value.id,
    date.value,
    text.value,
    imageURL.value
  );

  router.push({ path: "/myCities" });
}

function onReset() {
  text.value = null;
  date.value = "2022/12/01";
  cityName.value = null;
}
</script>
