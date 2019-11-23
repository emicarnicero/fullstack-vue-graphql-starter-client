<template>
  <v-container>
    <v-layout row>
      <v-dialog v-model="loading" persistent fullscreen>
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="7"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>

    <v-row dense>
      <v-col v-for="post in posts" :key="post._id" md="4" sm="6" xs="12">
        <v-card>
          <v-img
            :src="post.imageUrl"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>{{ post.title }}</v-card-title>
          </v-img>

          <v-card-subtitle>
            <v-layout>
              <v-flex md3>{{ post.likes }} likes</v-flex>
              <v-flex md3>{{ post.messages.length }} comments</v-flex>
            </v-layout>
          </v-card-subtitle>
          <v-card-text>
            <v-layout>
              <v-flex md3>
                <v-avatar>
                  <img :src="post.createdBy.avatar" alt="John" />
                </v-avatar>
              </v-flex>
              <v-flex>
                <h1>{{ post.createdBy.username }}</h1>
                <p>{{ post.createdDate | formatDate }}</p>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon @click="selectedId == post._id ? selectedId = '' : selectedId = post._id">
              <v-icon>{{ selectedId == post._id ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>

            <!-- <v-btn icon>
              <v-icon>exit_to_app</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>-->
          </v-card-actions>

          <v-expand-transition>
            <div v-show="selectedId == post._id" :ref="post._id" :id="post._id">
              <v-divider></v-divider>
              <v-card-text>{{post.description}}</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { gql } from 'apollo-boost';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      selectedId: ''
    };
  },
  created() {
    this.handleGetCarouselPosts();
  },
  computed: {
    ...mapGetters(['loading', 'posts', 'user'])
  },
  methods: {
    handleGetCarouselPosts() {
      // reach out the Vuex store, fire action that gets posts for carousel
      this.$store.dispatch('getPosts');
    }
  }
};
</script>

<style>
#carousel__title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0, auto;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
