<template>
  <div class="home">
    <router-link :to="{name:'usuario'}">Usuario</router-link>
    <p></p>
    <router-link :to="{name:'soporte'}">Soporte</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>
