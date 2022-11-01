<template>
  <div class="q-pa-md">
    <q-btn-dropdown
      v-if="user !== null"
      split
      color="Gunmetal-Gray"
      push
      glossy
      no-caps
      icon="group_add"
      @click="onMainClick"
    >
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>{{ user.email }} </q-item-label>
            <!-- :label="$t('yourName*')" -->
            <q-item-label caption> {{ date }} </q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="userStore.stateChange()">
          <q-item-section avatar>
            <q-avatar icon="settings" color="Cool-Gray" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemSignOut">
          <q-item-section avatar>
            <q-avatar icon="logout" color="blue-grey" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
            <!-- <q-item-label caption>February 22, 2016</q-item-label> -->
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

//const $q = useQuasar();

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { session } = storeToRefs(userStore);

const date = new Date(Date.now()).toDateString();

//console.log(user.value);

function onMainClick() {
  // console.log('Clicked on main button')
}

async function testSession() {
  try {
    console.log(session.value);
    await userStore.fetchSession();
    console.log(session.value);
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

function testUser() {
  try {
    console.log(user.value);
    userStore.fetchUser();
    console.log(user.value);
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

async function onItemSignOut() {
  try {
    console.log(user.value);
    await userStore.signOut();
    console.log(user.value);

    router.push({ path: "/" });
  } catch (error) {
    alert(error.error_description || error.message);
  }
}
</script>
