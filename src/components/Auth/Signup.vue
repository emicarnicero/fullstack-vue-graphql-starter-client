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
              <v-form
                id="signup-form"
                @submit.prevent="handleSignupUser"
                v-model="isFormValid"
                lazy-validation
                ref="signup-form"
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

                <v-text-field
                  id="email"
                  label="Email"
                  name="email"
                  prepend-icon="mail"
                  type="text"
                  v-model="email"
                  :rules="[rules.required, rules.email]"
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
                type="submit"
                form="signup-form"
                color="primary"
              >Sign Up</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>


<script>
export default {
  name: 'signup',
  data() {
    return {
      isFormValid: true,
      email: '',
      username: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        counter: value =>
          (value.length >= 6 && value.length <= 36) ||
          'Min 6 Max 36 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        }
      }
    };
  },
  methods: {
    handleSignupUser() {
      if (this.$refs['signup-form'].validate()) {
        this.$store.dispatch('signupUser', {
          email: this.email,
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
  }
};
</script>

<style>
</style>