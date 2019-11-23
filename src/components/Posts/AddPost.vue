<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Add Post</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <form-alert v-if="error" :message="error.message"></form-alert>

            <v-card-text>
              <v-form
                v-model="isFormValid"
                lazy-validation
                ref="addPost-form"
                id="addPost-form"
                @submit.prevent="handleAddPost"
              >
                <v-text-field
                  id="title"
                  label="Title"
                  name="title"
                  type="text"
                  v-model="title"
                  :rules="[rules.required, rules.counter]"
                ></v-text-field>

                <v-text-field
                  id="description"
                  label="Description"
                  name="description"
                  type="text"
                  v-model="description"
                  :rules="[rules.required, rules.counter]"
                ></v-text-field>

                <v-text-field
                  id="imageUrl"
                  label="Image URL"
                  name="imageUrl"
                  type="text"
                  v-model="imageUrl"
                  :rules="[rules.required]"
                ></v-text-field>

                <v-img v-if="imageUrl != ''" :src="imageUrl" aspect-ratio="1.7"></v-img>

                <v-select
                  id="categories"
                  label="Categories"
                  name="categories"
                  v-model="categories"
                  :items="['Art', 'Education', 'Photography', 'Technology', 'Travel']"
                  multiple
                  :rules="[rules.required]"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!isFormValid"
                :loading="loading"
                type="submit"
                form="addPost-form"
                color="primary"
              >Submit</v-btn>
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
  name: 'addPost',
  data() {
    return {
      isFormValid: true,
      title: '',
      description: '',
      imageUrl: '',
      categories: [],
      rules: {
        required: value => (!!value && value.length > 0) || 'Required.',
        counter: value =>
          (value.length >= 6 && value.length <= 36) || 'Min 6 Max 36 characters'
      }
    };
  },
  methods: {
    handleAddPost() {
      if (this.$refs['addPost-form'].validate()) {
        this.$store.dispatch('addPost', {
          title: this.title,
          description: this.description,
          imageUrl: this.imageUrl,
          categories: this.categories,
          creatorId: this.user._id,
          createdBy: this.user,
          createdDate: new Date(Date.now())
        });
        this.$router.push('/');
      }
    }
  },
  computed: {
    ...mapGetters(['error', 'loading', 'user'])
  }
};
</script>

<style></style>
