<template>
  <v-app>
    <!-- Side Navbar -->
    <v-navigation-drawer app flat temporary v-model="sideNav">
      <v-app-bar>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor:pointer">
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-app-bar>
      <v-card tile>
        <v-list color="primary">
          <v-list-item v-for="item in items" :key="item.title" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <!-- Horizontal Navbar -->
    <div>
      <v-app-bar flat dark color="primary">
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <v-toolbar-title class="hidden-xs-only">
          <router-link to="/" tag="span" style="cursor:pointer">VueShare</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Search Input -->
        <v-text-field
          style="padding-top:15px"
          prepend-icon="search"
          placeholder="Search posts"
          color="accent"
          single-line
        ></v-text-field>
        <v-spacer></v-spacer>

        <!-- Horizontal Navbar links -->
        <v-toolbar-items class="hidden-xs-only">
          <v-btn text v-for="item in items" :key="item.title" :to="item.link">
            <v-icon class="hidden-sm-only">{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </div>

    <!-- App Content -->
    <v-content>
      <v-container>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      items: [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ]
    };
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  /* transition-property: all; */
  transition-duration: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  /* transform: translateX(-25px); */
}
</style>