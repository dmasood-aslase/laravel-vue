<template>
    <div>
      <Navbar />
      <div class="container my-4 px-4">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "./components/Navbar.vue";
  export default {
    components: {
      Navbar,
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>