<template>
  <q-select
    filled
    label="Enter or select a city"
    hint="So, where to exactly?"
    :modelValue="model"
    @input="$emit('update:model', $event.target.value)"
    use-input
    multiple
    max-values="1"
    input-debounce="0"
    @new-value="createValue"
    :options="filterOptions"
    options-dense
    clearable
    transition-show="jump-up"
    transition-hide="jump-up"
    @filter="filterFn"
  />
</template>

<script setup>
import { ref } from "vue";
import countries from "../assets/countries.json";

const country = [];

countries.forEach((elem) => {
  country.push(elem.capital);
});

const allCities = country.flat();

defineProps(["model"]);
defineEmits(["update:model"]);

//const model = ref(null);
const filterOptions = ref(allCities);

function createValue(val, done) {
  // Calling done(var) when new-value-mode is not set or is "add", or done(var, "add") adds "var" content to the model
  // and it resets the input textbox to empty string
  // ----
  // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
  // only if is not already set and it resets the input textbox to empty string
  // ----
  // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
  // (adds to model if not already in the model, removes from model if already has it)
  // and it resets the input textbox to empty string
  // ----
  // If "var" content is undefined/null, then it doesn't tampers with the model
  // and only resets the input textbox to empty string

  if (val.length > 0) {
    // const modelValue = (model.value || []).slice();
    const modelValue = (model.value || []).slice();

    val
      .split(/[,;|]+/)
      .map((v) => v.trim())
      .filter((v) => v.length > 0)
      .forEach((v) => {
        if (allCities.includes(v) === false) {
          allCities.push(v);
        }
        if (modelValue.includes(v) === false) {
          modelValue.push(v);
        }
      });

    done(null);
    model.value = modelValue;
  }
}

function filterFn(val, update) {
  update(() => {
    if (val === "") {
      filterOptions.value = allCities;
    } else {
      const needle = val.toLowerCase();
      filterOptions.value = allCities.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    }
  });
}
</script>
