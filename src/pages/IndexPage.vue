<template>
  <q-page class="flex flex-center background">
    <div>

    </div>
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>

<style scoped>
  .background {
    background-image: url(../assets/canoaBckg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    height: 800px;
  }
</style>
