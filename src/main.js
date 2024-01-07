import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import gridLayout from "vue-grid-layout";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(gridLayout);
app.provide('utools', utools);
app.mount("#app");

// 监听alt键
window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "Control") {
    // console.log('Alt');
    window.hideDesk();
  }
});

console.log("utools main.js", utools);
