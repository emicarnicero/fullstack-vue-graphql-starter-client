import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

// Setup ApolloCliente
export const defaultClient = new ApolloClient({
  uri: process.env.SERVER_URI,
  // uri: "http://localhost:4000/graphql",
  uri: "https://fullstack-vue-graphql-backend.herokuapp.com/graphql",
  // Include auth token to requests made to backend
  fetchOptions: {
    credentials: "include"
  },
  // Operation adds the token to an authorization header, wich is sent to backend
  request: operation => {
    if (!localStorage.authorization) {
      localStorage.setItem("token", "");
    }
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  },
  onError: ({ graphqlErrors, networkError }) => {
    if (networkError) {
      console.log("[network error]", networkError);
    }
    if (graphqlErrors) {
      for (let err of graphqlErrors) {
        console.dir(err);
      }
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
