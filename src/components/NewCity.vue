<template>
  <div class="enter-city">
    Hey buddy, welcome back! Cool, where we we going next?
    <div class="q-pa-md" style="max-width: 500px; width: 30vw">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <!-- <q-input
          filled
          v-model="name"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        /> -->

        <q-input
          label="Your email address *"
          standout
          v-model="email"
          filled
          type="email"
          hint="Email"
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          hint="Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          v-model="confirmPassword"
          filled
          :type="isConfirmPwd ? 'password' : 'text'"
          hint="Confirm Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isConfirmPwd = !isConfirmPwd"
            />
          </template>
        </q-input>

        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

        <div class="form-buttons">
          <q-btn
            label="Create an account"
            type="submit"
            style="background: #738580; color: white"
          />

          <q-btn outline style="color: #738580" label="Reset" type="reset" />
        </div>
      </q-form>
      <q-space></q-space>
      <div>Already have an account? Sign In</div>
    </div>
  </div>
</template>

<style scoped>
.enter-city {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px 350px;
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

const $q = useQuasar();

const router = useRouter();
const userStore = useUserStore();
const { user, session } = storeToRefs(userStore);

// const name = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const isPwd = ref(true);
const isConfirmPwd = ref(true);

async function onSubmit() {
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
}

function onReset() {
  //  name.value = null;
  email.value = null;
  password.value = null;
  confirmPassword.value = null;
  isPwd.value = true;
  isConfirmPwd.value = true;
}
</script>
