import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueAxios from "vue-axios";
import axios from "axios";
import VueTheMask from "vue-the-mask";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "./assets/main.css";

const app = createApp(App);

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.use(VueTheMask)

app.mount('#app')


import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();
authStore.mockLogin();

