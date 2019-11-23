import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import moment from 'moment';

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

import FormAlert from './components/shared/FormAlert';
Vue.component('form-alert', FormAlert);

Vue.use(VueApollo);

// Setup ApolloCliente
export const defaultClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPHQLURI,
  // Include auth token to requests made to backend
  fetchOptions: {
    credentials: 'include'
  },
  // Operation adds the token to an authorization header, which is sent to backend
  request: operation => {
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }

    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    });
  },
  onError: ({ graphqlErrors, networkError }) => {
    if (networkError) {
      store.commit(
        'setAuthSnackbarMessage',
        networkError.result.errors[0].message
      );

      store.dispatch('signoutUser');
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

Vue.filter('formatDate', function(value) {
  return moment(String(value)).format('MM/DD/YYYY hh:mm');
});

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    this.$store.dispatch('getCurrentUser');
  }
}).$mount('#app');
