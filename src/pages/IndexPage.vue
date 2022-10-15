<template>
  <q-page class="flex flex-center background">
    <div class="header-wrapper">
      <h1>Fly borderless with your mind.</h1>
      <h5>Note your dreams down and make them happen.</h5>
      <div class="auth-buttons" v-if="!user">
        <q-btn
          to="/auth"
          style="background: #738580; color: white"
          label="Register"
        />
        <q-btn to="/signin" outline style="color: #738580" label="Login" />
      </div>
      <div class="auth-buttons" v-else>
        <q-btn
          @click="onItemSignOut"
          style="background: #738580; color: white"
          label="Logout"
        />
      </div>
    </div>

    <!-- <img
      alt="to do list image"
      src="../assets/earth.png"
      style="width: 200px; height: 200px"
    /> -->
  </q-page>
</template>

<script setup>
import { useAlertStore } from "../stores/alert";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();
const alertStore = useAlertStore();
const { user } = storeToRefs(userStore);

async function onItemSignOut() {
  try {
    await userStore.signOut();
    router.push({ path: "/" });
  } catch (error) {
    alertStore.error(error);
    throw error;
  }
}
</script>

<style scoped>
.background {
  background-image: url(../assets/pexels-wendy-wei-2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.flex {
  margin: 0px;
}

.header-wrapper {
  margin-top: -300px;
}

h1 {
  font-size: 4rem;
  color: #868b8e;
  color: #474440;
  margin-bottom: 5px;
  text-align: center;
}

h5 {
  color: #b9b7bd;
  color: #868b8e;
  margin-top: -5px;
  text-align: center;
}

.auth-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>
