<script setup>
import { storeToRefs } from "pinia";
import { useAlertStore } from "../stores/alert";
import { onMounted, onUpdated } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const alertStore = useAlertStore();
const { loading } = storeToRefs(alertStore);

function showDefault() {
  $q.notify({
    spinner: true,
    message: "Please wait...",
    timeout: 22000,
    position: "center",
  });
}

onMounted(() => {
  showDefault();
});

onUpdated(() => {
  showDefault();
});

defineProps({
  isLoading: Boolean,
});

/*
onUpdated(() => {
  if (alert.value !== null) {
    //if (!alert.value.message) persistent.value = true;
    persistent.value = true;

    if (alert.value.type == "alert-success") {
      title.value = "Info";
      className.value = "bg-positive text-white";
    }
    if (alert.value.type == "alert-danger") {
      title.value = "Warning";
      className.value = "bg-negative text-white";
    }
  }
});

*/
</script>

<template>
  <div v-if="isLoading"></div>
</template>
<!-- <template>
  <div class="q-pa-md">
    <div class="row q-gutter-sm">
      <q-btn color="purple" @click="showDefault" label="Default spinner" />
      <q-btn color="purple" @click="showCustom" label="Custom spinner" />
    </div>
  </div>
</template> -->
