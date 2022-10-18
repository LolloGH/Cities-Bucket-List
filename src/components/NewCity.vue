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

async function onSubmit() {
  /*
  if (password.value !== confirmPassword.value) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Passwords do not match.",
    });
  } else {
    try {
      await userStore.signUp(email.value, password.value);
      //await userStore.fetchSession();
      if (user.value) {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted. Please check your inbox.",
        });

        onReset; // Reset the form

        router.push({ path: "/signin" });
      }
    } catch (error) {
      console.log(error);

      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: `An error occurred: ${error}`,
      });
    }
  }
  */
  userStore.fetchUser();
  console.log(cityName.value[0], text.value, date.value, user.value.id);

  cityStore.insertCity(
    cityName.value[0],
    user.value.id,
    date.value,
    text.value
  );
}

function onReset() {
  text.value = null;
  date.value = "2022/12/01";
  cityName.value = null;
}
</script>
