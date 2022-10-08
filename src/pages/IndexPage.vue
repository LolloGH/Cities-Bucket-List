<template>
  <q-page class="flex flex-center background">
    <div>
      <h1>Fly borderless with your mind.</h1>
      <h5>Note your dreams down and make them happen.</h5>
    </div>
    <!-- <img
      alt="to do list image"
      src="../assets/earth.png"
      style="width: 200px; height: 200px"
    /> -->
  </q-page>
</template>

<script setup>
const name = "IndexPage";
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

h1 {
  font-size: 4rem;
  color: #868b8e;
}

h5 {
  color: #b9b7bd;
}
</style>
