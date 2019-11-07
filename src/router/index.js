import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import AddPost from "../components/Posts/AddPost.vue";
import Posts from "../components/Posts/Posts.vue";
import Signup from "../components/Auth/Signup.vue";
import Signin from "../components/Auth/Signin.vue";
import Profile from "../components/Auth/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/addpost",
    name: "addpost",
    component: AddPost
  },
  {
    path: "/posts",
    name: "posts",
    component: Posts
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
