<template>
  <NotificationForm :id="id"/>
</template>

<script>
import NotificationForm from "@/components/NotificationForm";
export default {
  props: ["id"],
  components: {
    NotificationForm
  }
};
</script>

<style>
</style>
