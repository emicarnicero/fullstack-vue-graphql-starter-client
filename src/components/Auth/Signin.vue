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

            <form-alert v-if="error" :message="error.message"></form-alert>

            <v-card-text>
              <v-form
                v-model="isFormValid"
                lazy-validation
                ref="signin-form"
                id="signin-form"
                @submit.prevent="handleSigninUser"
              >
                <v-text-field
                  id="username"
                  label="Username"
                  name="username"
                  prepend-icon="person"
                  type="text"
                  v-model="username"
                  :rules="[rules.required, rules.counter]"
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
                      :rules="[rules.required, rules.counter]"
                    ></v-text-field>
                    <v-icon @click="switchVisibility()">remove_red_eye</v-icon>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!isFormValid"
                :loading="loading"
                type="submit"
                form="signin-form"
                color="primary"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'signin',
  data() {
    return {
      isFormValid: true,
      username: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        counter: value =>
          (value.length >= 6 && value.length <= 36) || 'Min 6 Max 36 characters'
      }
    };
  },
  methods: {
    handleSigninUser() {
      if (this.$refs['signin-form'].validate()) {
        this.$store.dispatch('signinUser', {
          username: this.username,
          password: this.password
        });
      }
    },
    switchVisibility() {
      password.getAttribute('type') === 'password'
        ? password.setAttribute('type', 'text')
        : password.setAttribute('type', 'password');
    }
  },
  computed: {
    ...mapGetters(['error', 'loading'])
  }
};
</script>

<style>
</style>