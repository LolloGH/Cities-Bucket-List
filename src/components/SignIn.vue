<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { useAlertStore } from "../stores/alert";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const $q = useQuasar();

const router = useRouter();
const userStore = useUserStore();
const { user, session } = storeToRefs(userStore);

const alertStore = useAlertStore();

const name = ref(null);
const email = ref(null);
const password = ref(null);
const isPwd = ref(true);

function onReset() {
  name.value = null;
  email.value = null;
  password.value = null;

  isPwd.value = true;
}

async function signIn() {
  if (!password.value) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: `Please sign in with an email and password.`,
    });
  } else {
    try {
      $q.loading.show({
        delay: 400, // ms
      });

      await userStore.signIn(email.value, password.value);
      //  console.log(session);
      onReset(); // Reset the form
      router.push({ path: "/myCities" });
    } catch (error) {
      console.log(error);
    } finally {
      $q.loading.hide();
    }
  }
}
</script>

<template>
  <div class="sign-up">
    <div class="q-pt-md" style="max-width: 500px; width: 85vw">
      <q-form @submit="signIn" @reset="onReset" class="q-gutter-md">
        <q-input standout v-model="email" filled type="email" hint="Email">
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

        <div class="form-buttons">
          <q-btn
            label="Login"
            type="submit"
            style="background: #738580; color: white"
          />

          <q-btn outline style="color: #738580" label="Reset" type="reset" />
        </div>
      </q-form>
      <q-space></q-space>
    </div>
  </div>
</template>

<style scoped>
.sign-up {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
