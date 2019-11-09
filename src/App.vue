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
          <v-list-item v-for="item in drawerItems" :key="item.title" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="user" text @click="handleSignoutUser">
            <v-list-item-icon>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Signout</v-list-item-title>
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
          <v-btn text v-for="item in sideNavItems" :key="item.title" :to="item.link">
            <v-icon class="hidden-sm-only">{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>

          <v-btn v-if="user" text @click="handleSignoutUser">
            <v-icon class="hidden-sm-only">exit_to_app</v-icon>Signout
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
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      sideNavMenuItems: [
        {
          icon: "chat",
          title: "Posts",
          link: "/posts",
          showAuthenticated: null
        },
        {
          icon: "lock_open",
          title: "Sign In",
          link: "/signin",
          showAuthenticated: false
        },
        {
          icon: "create",
          title: "Sign Up",
          link: "/signup",
          showAuthenticated: false
        },
        {
          icon: "account_box",
          title: "Profile",
          link: "/profile",
          showAuthenticated: true
        }
      ],
      drawerMenuItems: [
        {
          icon: "chat",
          title: "Posts",
          link: "/posts",
          showAuthenticated: null
        },
        {
          icon: "lock_open",
          title: "Sign In",
          link: "/signin",
          showAuthenticated: false
        },
        {
          icon: "create",
          title: "Sign Up",
          link: "/signup",
          showAuthenticated: false
        },
        {
          icon: "stars",
          title: "Create Post",
          link: "/post/add",
          showAuthenticated: true
        },
        {
          icon: "account_box",
          title: "Profile",
          link: "/profile",
          showAuthenticated: true
        }
      ]
    };
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  },
  watch: {
    user(value) {
      if (!value) {
        this.$router.push("/signin");
      } else {
        if (this.$route.path !== "/") this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapGetters(["user"]),
    sideNavItems() {
      return this.sideNavMenuItems.filter(
        i =>
          (i.showAuthenticated == (this.user !== null)) |
          (i.showAuthenticated === null)
      );
    },
    drawerItems() {
      return this.drawerMenuItems.filter(
        i =>
          (i.showAuthenticated == (this.user !== null)) |
          (i.showAuthenticated === null)
      );
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