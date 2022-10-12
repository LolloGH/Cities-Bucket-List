<template>
  <div class="sign-up">
    <div class="q-pa-md" style="max-width: 500px; width: 30vw">
      <q-form @submit="handleLogin" @reset="onReset" class="q-gutter-md">
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

const name = ref(null);
const email = ref(null);
const password = ref(null);
const isPwd = ref(true);
const loading = ref(false);

async function onSubmit() {
  try {
    loading.value = true;

    await userStore.signIn(email.value);
    console.log(user.value);
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    alert(error.error_description || error.message);
  } finally {
    loading.value = false;
  }

  /*
  try {
    await userStore.signIn(email.value, password.value);
    if (user.value && session.value) {
      console.log(`User is: ${user.value.id} and Session is: ${session.value}`);
      router.push({ path: "/myCities" });
    } else if (!user.value && !session.value) {
      console.log("Need to sign up");
      console.log(`User is: ${user.value.id} and Session is: ${session.value}`);
    } else {
      console.log("Need to confirm registration");
      console.log(`User is: ${user.value.id} and Session is: ${session.value}`);
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
  */

  onReset(); // Reset the for
}

function onReset() {
  name.value = null;
  email.value = null;
  password.value = null;

  isPwd.value = true;
}

async function handleLogin() {
  try {
    loading.value = true;
    await userStore.signIn(email.value, password.value);
    alert("Check your email for the login link!");
  } catch (error) {
    alert(error.error_description || error.message);
  } finally {
    loading.value = false;
  }
}
</script>
