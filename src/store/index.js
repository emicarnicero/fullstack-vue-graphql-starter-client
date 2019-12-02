import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index.js';

import { defaultClient as apolloClient } from '../main';
import {
  GET_POSTS,
  GET_POSTS_INFINITE,
  SIGNUP_USER,
  SIGNIN_USER,
  GET_CURRENT_USER,
  CREATE_POST
} from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    user: null,
    error: null,
    authSnackbarMessage: ''
  },
  mutations: {
    setPostsInfinite: (state, payload) => {
      state.posts = [...(state.posts || []), ...payload];
    },
    setPost: (state, payload) => {
      state.posts.unshift(payload);
    },
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    clearPosts: state => {
      state.posts = null;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    clearUser: state => {
      state.user = null;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    clearError: state => {
      state.error = null;
    },
    setAuthSnackbarMessage: (state, payload) => {
      state.authSnackbarMessage = payload;
    },
    clearAuthSnackbarMessage: state => {
      state.authSnackbarMessage = null;
    }
  },
  actions: {
    addPost: ({ commit }, payload) => {
      commit('setLoading', true);

      apolloClient
        .mutate({
          mutation: CREATE_POST,
          variables: payload,
          update: (cache, { data: { addPost } }) => {
            let data = cache.readQuery({ query: GET_POSTS });
            data.getPosts.unshift(addPost);

            cache.writeQuery({
              query: GET_POSTS,
              data
            });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
              __typename: 'Post',
              _id: -1,
              ...payload,
              likes: 0,
              messages: []
            }
          }
        })
        .then(function({ data }) {
          commit('setLoading', false);
        })
        .catch(err => {
          commit('setLoading', false);
          console.error(err);
        });
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      // Use apolloClient to fire getPosts query
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data }) => {
          commit('setPosts', data.getPosts);
          commit('setLoading', false);
        })
        .catch(err => {
          commit('setLoading', false);
          console.error(err);
        });
    },
    getPostsInfinite: ({ commit }, payload) => {
      commit('setLoading', true);
      // Use apolloClient to fire getPostsInfinite query
      apolloClient
        .query({
          query: GET_POSTS_INFINITE,
          variables: payload
        })
        .then(({ data }) => {
          commit('setPostsInfinite', data.getPostsInfinite);
          commit('setLoading', false);
        })
        .catch(err => {
          commit('setLoading', false);
          console.error(err);
        });
    },
    // addPost: ({ commit }, payload) => {
    //   commit('setLoading', true);

    //   apolloClient
    //     .mutate({
    //       mutation: CREATE_POST,
    //       variables: payload
    //     })
    //     .then(function({ data }) {
    //       commit('setPost', { ...data.addPost, likes: 0, messages: [] });
    //       commit('setLoading', false);
    //     })
    //     .catch(err => {
    //       commit('setLoading', false);
    //       console.error(err);
    //     });
    // },
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          commit('setLoading', false);
          // Add user data to state
          commit('setUser', data.getCurrentUser);
        })
        .catch(err => {
          commit('setLoading', false);
          console.error(err);
        });
    },
    signinUser: ({ commit }, payload) => {
      commit('clearError');
      commit('clearUser');
      commit('setLoading', true);
      localStorage.setItem('token', '');
      localStorage.setItem('user', '');
      // Use apolloClient to fire signinUser query
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signinUser.token);
          localStorage.setItem('user', JSON.stringify(data.signinUser.user));
          commit('setLoading', false);
          commit('setUser', data.signinUser.user);
          commit('setAuthSnackbarMessage', `Now you're signed in!`);

          router.push('/');
        })
        .catch(err => {
          commit('setError', err);
          commit('setLoading', false);
          console.error(err);
        });
    },
    signupUser: ({ commit }, payload) => {
      localStorage.setItem('token', '');
      localStorage.setItem('user', '');
      commit('setLoading', true);
      commit('clearUser');
      // Use apolloClient to fire signupUser query
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signupUser.token);
          localStorage.setItem('user', JSON.stringify(data.signupUser.user));
          commit('setLoading', false);
          commit('setUser', data.signupUser.user);
          commit('setAuthSnackbarMessage', `Now you're signed up!`);

          router.push('/');
        })
        .catch(err => {
          commit('setLoading', false);
          console.error(err);
        });
    },
    signoutUser: async ({ commit }) => {
      commit('clearUser');
      localStorage.setItem('token', '');
      localStorage.setItem('user', '');

      await apolloClient.resetStore();
      router.push('/signin').catch(err => {});
    }
  },
  modules: {},
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
    error: state => state.error,
    authSnackbarMessage: state => state.authSnackbarMessage
  }
});
