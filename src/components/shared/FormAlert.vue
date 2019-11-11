<template>
  <v-alert tile dismissible :value="true" type="error">
    <h3>{{message}}</h3>
  </v-alert>
</template>

<script>
export default {
  name: 'FormAlert',
  props: ['message']
};
</script>

<style>
</style>