<template>
  <div>{{ theCity.name }}</div>
</template>

<script setup>
defineProps({
  theCity: Object,
});
</script>
