import "./index.css";
import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";
import { createPinia } from 'pinia';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import vuetify from "./plugins/vuetify";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(vuetify);


app.mount("#app"); 