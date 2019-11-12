import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";

import { defaultClient as apolloClient } from "../main";
import {
  GET_POSTS,
  SIGNUP_USER,
  SIGNIN_USER,
  GET_CURRENT_USER
} from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    user: null,
    error: null,
    snackbarMessage: ""
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
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
    setSnackbarMessage: (state, payload) => {
      state.snackbarMessage = payload;
    },
    clearSnackbarMessage: state => {
      state.snackbarMessage = null;
    }
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          commit("setLoading", false);
          // Add user data to state
          commit("setUser", data.getCurrentUser);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    getPosts: ({ commit }) => {
      commit("setLoading", true);
      // Use apolloClient to fire getPosts query
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data }) => {
          commit("setPosts", data.getPosts);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    signinUser: ({ commit }, payload) => {
      commit("clearError");
      commit("clearUser");
      commit("setLoading", true);
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      // Use apolloClient to fire signinUser query
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.signinUser.token);
          localStorage.setItem("user", JSON.stringify(data.signinUser.user));
          commit("setLoading", false);
          commit("setUser", data.signinUser.user);
          commit("setSnackbarMessage", `Now you're signed in!`);

          router.push("/");
        })
        .catch(err => {
          commit("setError", err);
          commit("setLoading", false);
          console.error(err);
        });
    },
    signupUser: ({ commit }, payload) => {
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      commit("setLoading", true);
      commit("clearUser");
      // Use apolloClient to fire signupUser query
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.signupUser.token);
          localStorage.setItem("user", JSON.stringify(data.signupUser.user));
          commit("setLoading", false);
          commit("setUser", data.signupUser.user);
          commit("setSnackbarMessage", `Now you're signed up!`);

          router.push("/");
        })
        .catch(err => {
          console.error(err);
        });
    },
    signoutUser: async ({ commit }) => {
      commit("clearUser");
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");

      await apolloClient.resetStore();
    }
  },
  modules: {},
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
    error: state => state.error,
    snackbarMessage: state => state.snackbarMessage
  }
});
