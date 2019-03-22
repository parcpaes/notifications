<template>
  <div>
    <BaseIcon name="bell">
      <span
        class="tab"
        :class="{activeTab: !selectedTab}"
        @click="selectedTab = !selectedTab"
      >{{ mensajes? mensajes.length: 0 }} mensajes</span>
    </BaseIcon>

    <div v-show="selectedTab">
      <h4>Messajes</h4>
      <!-- /<p v-if="!reviews.length">There are no review yet</p> -->
      <ul class>
        <li class="message-item" v-for="mensaje in mensajes" :key="mensaje.idmensaje">
          <kbd>{{mensaje.iduser}}</kbd>:
          <span>{{mensaje.msg}}</span>
          <button
            @click="$emit('remove-message',mensaje.id)"
            class="del"
            v-if="typeuser === mensaje.iduser "
          >X</button>
        </li>
        <!-- <li v-for="review in reviews">
          <p>Name: {{review.name}}</p>
          <p>{{review.rating}}</p>
          <p>{{review.review}}</p>
        </li>-->
      </ul>
      <form @submit="addMessage">
        <input type="text" v-model="msg" name="msg" placeholder="mensaje">
        <input type="submit" value="Submit" class="btn">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mensajes: {
      type: Array,
      require: true,
      default: []
    }
  },
  data() {
    return {
      selectedTab: false,
      msg: "",
      typeuser: this.$route.name
    };
  },
  methods: {
    addMessage(e) {
      e.preventDefault();
      const newmessage = {
        id: Math.floor(Math.random() * 1000000),
        iduser: this.typeuser,
        msg: this.msg
      };
      this.$emit("add-message", newmessage);
      this.msg = "";
    }
  }
};
</script>

<style scoped>
.message-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}
.tab {
  margin-left: 20px;
  cursor: pointer;
}

.activeTab {
  color: #16c0b0;
  text-decoration: underl;
}
.del {
  background: #ff0000;
  color: white;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
ul {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
}

form {
  display: flex;
}
input[type="text"] {
  flex: 10;
  padding: 5px;
}
input[type="submit"] {
  flex: 2;
}
input {
  height: 32px;
}

kbd {
  margin: 0px 0.1em;
  padding: 0.1em 0.6em;
  border-radius: 3px;
  border: 1px solid rgb(204, 204, 204);
  color: rgb(51, 51, 51);
  line-height: 1.4;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  display: inline-block;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2), inset 0px 0px 0px 2px #ffffff;
  background-color: rgb(247, 247, 247);
  -moz-box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #ffffff inset;
  -webkit-box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #ffffff inset;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  text-shadow: 0 1px 0 #fff;
}
</style>
