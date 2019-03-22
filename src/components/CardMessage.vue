<template>
  <div class="note-card -shadow">
    <span class="eyebrow">@ fecha: {{note.fecha}} {{note.time}}</span>|
    <router-link
      class="note-link"
      :to="{ name:'edit-notification', params:{id:note.id}}"
      v-if="typeUser==='usuario'"
    >Modificar</router-link>
    <h4 class="title">{{note.titulo}}</h4>
    <p>{{note.descripcion}}</p>
    <MessageTap
      v-on:add-message="addMessage"
      v-on:remove-message="removeMessage"
      :mensajes="mensajes"
    />
  </div>
</template>

<script>
import MessageTap from "@/components/MessageTap";
import ServiceApi from "@/services/ServiceApi";

export default {
  components: {
    MessageTap
  },
  props: {
    note: Object
  },
  data() {
    return {
      mensajes: [],
      typeUser: this.$route.name
    };
  },
  methods: {
    addMessage(newMessage) {
      newMessage.notificacioneId = this.note.id;
      console.log(newMessage);
      ServiceApi.postMessage(newMessage)
        .then(response => {
          this.mensajes.push(response.data);
        })
        .catch(error => {
          console.log("error messages tap");
          console.log("there was an error ", error);
        });
    },
    removeMessage(idmessage) {
      ServiceApi.removeMessage(idmessage)
        .then(response => {
          this.mensajes = this.mensajes.filter(msg => msg.id !== idmessage);
        })
        .catch(error => {
          console.log("error remove");
          console.log("there was an error ", error);
        });
    }
  },
  created() {
    ServiceApi.getNotificationsMensajes(this.note.id)
      .then(response => {
        this.mensajes = response.data;
      })
      .catch(error => {
        console.log("There was an error ", erro);
      });
  }
};
</script>

<style scoped>
.note-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.note-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.note-card > .title {
  margin: 0;
}

.note-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
  background: lightblue;
}
</style>