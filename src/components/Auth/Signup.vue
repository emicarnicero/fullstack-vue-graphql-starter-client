<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Sign Up</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form id="signup-form" @submit.prevent="handleSignupUser">
                <v-text-field
                  id="username"
                  label="Username"
                  name="username"
                  prepend-icon="person"
                  type="text"
                  v-model="username"
                ></v-text-field>

                <v-text-field
                  id="email"
                  label="Email"
                  name="email"
                  prepend-icon="mail"
                  type="text"
                  v-model="email"
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
              <v-btn type="submit" form="signup-form" color="primary">Sign Up</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "signup",
  data() {
    return {
      email: "",
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  watch: {
    user(value) {
      // if user value changes from null to object, redirect to home page
      if (value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    handleSignupUser() {
      this.$store.dispatch("signupUser", {
        email: this.email,
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