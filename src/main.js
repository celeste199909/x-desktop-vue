import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// 插件
import Toast from "./plugins/toast";
// 工具库

const app = createApp(App);
app.provide("utools", utools);
app.use(Toast, {
  duration: 3000, // 可以在这里配置默认的显示时间
});
app.mount("#app");
