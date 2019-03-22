<template>
  <div>
    <h2>Lista de Notificaciones</h2>
    <router-link :to="{name: 'create-notification'}" v-if="typeUser ==='usuario'">Crear Notificacion</router-link>
    <CardMessage v-for="note in notifications" :key="note.id" :note="note"/>
  </div>
</template>

<script>
import CardMessage from "@/components/CardMessage";
import ServiceApi from "@/services/ServiceApi";

export default {
  components: {
    CardMessage
  },
  data() {
    return {
      notifications: [],
      typeUser: this.$route.name
    };
  },
  created() {
    ServiceApi.getNotifications()
      .then(response => {
        this.notifications = response.data;
      })
      .catch(error => {
        console.log("there was an error ", error);
      });
  },
  methods: {}
};
</script>

<style>
</style>
