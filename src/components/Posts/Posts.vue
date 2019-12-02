<template>
  <v-container id="_posts">
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
                  <img :src="post.createdBy.avatar" />
                </v-avatar>
              </v-flex>
              <v-flex>
                <h1>{{ post.createdBy.username }}</h1>
                <p>{{ post.createdDate | formatDate }}</p>
              </v-flex>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  icon
                  @click="
                selectedId == post._id
                  ? (selectedId = '')
                  : (selectedId = post._id)
              "
                >
                  <v-icon>
                    {{
                    selectedId == post._id ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    }}
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-layout>
          </v-card-text>

          <v-expand-transition>
            <div v-show="selectedId == post._id" :ref="post._id" :id="post._id">
              <v-divider></v-divider>
              <v-card-text>{{ post.description }}</v-card-text>
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
  name: 'Posts',
  data() {
    return {
      selectedId: '',
      skip: null,
      limit: null
    };
  },
  mounted() {
    this.handleScroll();
  },
  created() {
    this.$store.commit('clearPosts');
    this.skip = 0;
    this.limit = 6;
    this.handleGetCardPosts();
  },
  computed: {
    ...mapGetters(['loading', 'posts', 'user'])
  },
  methods: {
    handleGetCardPosts() {
      // reach out the Vuex store, fire action that gets posts for cards
      this.$store.dispatch('getPostsInfinite', {
        limit: this.limit,
        skip: this.skip
      });
    },
    handleScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          (document.documentElement.scrollTop + window.innerHeight).toFixed(
            0
          ) == document.documentElement.offsetHeight;

        if (window.location.pathname === '/posts') {
          if (bottomOfWindow) {
            this.skip = this.posts.length;
            this.limit = 6 - (this.skip % 6);
            this.handleGetCardPosts();
          }
        }
      };
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
