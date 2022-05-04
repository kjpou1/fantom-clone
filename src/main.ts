import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
// FormKit - Form validation kit
import { plugin, defaultConfig } from "@formkit/vue";
import { generateClasses } from "@formkit/tailwindcss";
import "@formkit/themes/genesis";

import "./index.css";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);

app.mount("#app");
