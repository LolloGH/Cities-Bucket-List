<template>
  <q-page class="flex flex-center background">
    <div class="header-wrapper">
      <h1>Fly borderless with your mind.</h1>
      <h5>Note your dreams down and make them happen.</h5>
      <div class="auth-buttons">
        <q-btn to="/auth" style="background: #738580; color: white" label="Register" />
        <q-btn outline style="color: #738580;" label="Login" />
    </div>
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

.header-wrapper {
  margin-top: -300px;
}

h1 {
  font-size: 4rem;
  color: #868b8e;
  color: #474440;
  margin-bottom: 5px;
  text-align: center;
  }

h5 {
  color: #b9b7bd;
  color: #868B8E;
  margin-top: -5px;
  text-align: center;
}

.auth-buttons {
  display: flex;
  justify-content: center;
  gap: 15px

}
</style>
