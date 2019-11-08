<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Sign In</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form id="signin-form" @submit.prevent="handleSigninUser">
                <v-text-field
                  id="username"
                  label="Username"
                  name="username"
                  prepend-icon="person"
                  type="text"
                  v-model="username"
                ></v-text-field>

                <v-container>
                  <v-layout row>
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                      v-model="password"
                    ></v-text-field>
                    <v-icon @click="switchVisibility()">remove_red_eye</v-icon>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" form="signin-form" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "signin",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleSigninUser() {
      this.$store.dispatch("signinUser", {
        username: this.username,
        password: this.password
      });
    },
    switchVisibility() {
      password.getAttribute("type") === "password"
        ? password.setAttribute("type", "text")
        : password.setAttribute("type", "password");
    }
  }
};
</script>

<style>
</style>