import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";

const routes = [
  { path: "/login", component: LoginForm },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem("loggedInUser");
  if (to.meta.requiresAuth && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
