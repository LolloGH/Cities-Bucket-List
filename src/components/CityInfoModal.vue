<template>
  <div>
    <q-card class="my-card lt-xs bg-Pewter">
      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          color="primary"
          icon="close"
          @click="runEmit"
        />
      </q-card-actions>
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

      <q-card-section> </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">$・Italian, Cafe</div>
        <div class="text-caption text-grey">
          Small plates, salads & sandwiches in an intimate setting.
        </div>
      </q-card-section>

      <q-separator />
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import cityInfo from "../components/CityInfo.vue";

const emit = defineEmits(["update:model-value"]);

//const modelValue = props.model.value;

const lorem = "Lorem ipsum dolor sit amet consectetur";

const stars = ref(3);

function runEmit() {
  emit("update:model-value");
}
</script>
