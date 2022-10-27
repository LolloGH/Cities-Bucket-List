<script setup>
import { storeToRefs } from "pinia";
import { useAlertStore } from "../stores/alert";
import { ref, onUpdated } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
const persistent = ref(false);
const title = ref("");
const className = ref("");
const alertTypeFade = ref(true);

function triggerPositive() {
  $q.notify({
    type: "positive",
    message: alert.value.message,
  });
}

onUpdated(() => {
  if (alert.value !== null && alertTypeFade.value) {
    triggerPositive();
  }

  if (alert.value !== null) {
    persistent.value = true;

    if (alert.value.type == "alert-success") {
      title.value = "Info";
      className.value = "bg-light-green-8 text-white";
    }
    if (alert.value.type == "alert-danger") {
      title.value = "Warning";
      className.value = "bg-warning text-white";
    }
  }
});
</script>

<template>
  <q-dialog
    v-if="alert && !alertTypeFade"
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card :class="className" style="width: 300px">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ alert.message }}
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn @click="alertStore.clear()" flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <div v-if="alert && alertTypeFade"></div>
</template>
