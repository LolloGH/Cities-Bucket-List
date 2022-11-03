<template>
  <q-layout view="hHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-grey">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
          @click="toggleLeftDrawer"
        />
        <q-space></q-space>
        <AuthButton />

        <!-- <q-btn
          flat
          round
          dense
          icon="group_add"
          @click="router.push({ path: '/auth' })"
        /> -->
      </q-toolbar>
      <q-toolbar inset>
        <q-toolbar-title
          class="cursor-pointer"
          @click="router.push({ path: '/' })"
        >
          M<span class="redLetter">y</span> Citi<span class="redLetter">e</span
          >s <strong>Bucket</strong> Li<span class="redLetter">s</span>t
        </q-toolbar-title>
        <!-- <q-btn to="/myCities" outline style="color: #738580" label="MyCities" />
        <q-btn to="/citySearch" outline style="color: #738580" label="Search" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      :mini-to-overlay="true"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="270"
      :breakpoint="500"
      show-if-above
      v-model="drawerOp"
      bordered
    >
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <MyAlert />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.redLetter {
  color: red;
  font-weight: bold;
}
</style>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import AuthButton from "src/components/AuthButton.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import MyAlert from "../components/MyAlert.vue";
import { useAlertStore } from "../stores/alert";
import { useUserStore } from "../stores/user";

import { useCitiesStore } from "../stores/cities";

const cityStore = useCitiesStore();
const { myLocation } = storeToRefs(cityStore);
locateMe();

function locateMe() {
  cityStore.getLocation();
}

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const miniState = ref(true);
const leftDrawerOpen = ref(false);
const drawerOp = ref(!user || leftDrawerOpen);
const router = useRouter();
const linksList = [
  {
    title: "New Destination",
    caption: "Add a city to your bucket list",
    icon: "trolley",
    link: "/#/newCity",
  },
  {
    title: "My Cities",
    caption: "Your current city list",
    icon: "location_city",
    link: "/#/myCities",
  },
  {
    title: "Contact Us",
    caption: "Support & questions",
    icon: "chat",
    link: "mailto: lorenzocorio@duck.com",
  },
];

const essentialLinks = linksList;

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  console.log(leftDrawerOpen.value);
}
</script>
