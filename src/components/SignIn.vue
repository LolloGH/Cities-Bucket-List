<template>
  <div class="sign-up">
    <div class="q-pa-md" style="max-width: 500px; width: 30vw">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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
const confirmPassword = ref(null);
const isPwd = ref(true);
const isConfirmPwd = ref(true);

async function onSubmit() {
  try {
    await userStore.signUp(email.value, password.value);

    if (user.value && !session.value) {
      console.log("Need to confirm registration");
    } else {
      try {
        await userStore.signIn(email.value, password.value);
        if (user.value && session.value) router.push({ path: "/myCities" });
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
  } catch (error) {
    console.log(error);

    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: `An error occurred: ${error}`,
    });
  }

  onReset; // Reset the for
}

function onReset() {
  name.value = null;
  email.value = null;
  password.value = null;
  confirmPassword.value = null;
  isPwd.value = true;
  isConfirmPwd.value = true;
}
</script>
