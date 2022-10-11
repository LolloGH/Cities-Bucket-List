<template>
  <q-layout view="hhh Lpr lFf">
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

        <q-btn
          flat
          round
          dense
          icon="group_add"
          @click="router.push({ path: '/auth' })"
        />
      </q-toolbar>
      <q-toolbar inset>
        <q-toolbar-title>
          M<span class="redLetter">y</span> Citi<span class="redLetter">e</span
          >s <strong>Bucket</strong> Li<span class="redLetter">s</span>t
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" bordered>
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
import { defineComponent, ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import AuthButton from "src/components/AuthButton.vue";
import { useRouter } from "vue-router";

const leftDrawerOpen = ref(false);
const router = useRouter();
const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
];

const essentialLinks = linksList;

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(() => {
  toggleLeftDrawer();
});
</script>
