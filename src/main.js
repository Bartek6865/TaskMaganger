import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const defaultUser = { email: "test@example.com", password: "123456" };
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([defaultUser]));
}

createApp(App).use(router).mount("#app");
