<template>
  <!-- desktop -->
  <Desktop v-if="currentModule === 'desktop'" />
  <!-- steam -->
  <Steam v-if="currentModule === 'steam'" />
  <!-- 浏览器 -->
  <Browser v-if="currentModule === 'browser'" />
  <!-- 模块栏 -->
  <ModuleBar />
</template>

<script setup>
import { onBeforeMount, ref, provide } from "vue";
// 组件
import Desktop from "./components/desktop/Desktop.vue";
import Steam from "./components/steam/Steam.vue";
import Browser from "./components/browser/Browser.vue";
import ModuleBar from "./components/widgets/ModuleBar.vue";
// 工具
import { handleRawIcons } from "./functions/handleRawIcons";
import { paginateArray } from "./functions/paginateArray";
import { getDesktopLayout } from "./functions/getDesktopLayout";
import { getLocalSetting } from "./functions/getLocalSetting";
// 组合式函数 composables

// 第三方工具库
import _ from "lodash";
import { watchDeep } from "@vueuse/core";

// 全局
const setting = ref(getLocalSetting()); // 本地设置
const isShowContextMenu = ref(false);  // 右键菜单
const isShowSidebar = ref(false);  // 设置窗口
const currentModule = ref("desktop"); // 模块切换
// 桌面模块
const pages = ref([]); // 分页数据
const currentPage = ref(0); // 当前页
const layout = ref(getDesktopLayout()); // 桌面布局
const isOnQuickSearchMode = ref(false); // 搜索模式
const isDragging = ref(false); // 用于控制拖拽时的样式（背景）
// steam 模块
const steamApps = ref([]); // steam 应用


// 监听 setting, 更改时保存到本地
watchDeep(setting, (newVal) => {
  utools.dbStorage.setItem("setting", JSON.parse(JSON.stringify(newVal)));
});

// 全局
provide("setting", setting);
provide("init", init);
provide("isShowContextMenu", isShowContextMenu);
provide("isShowSidebar", isShowSidebar);
provide("currentModule", currentModule);  // 模块切换
// 桌面模块
provide("currentPage", currentPage);
provide("pages", pages);
provide("layout", layout);
provide("isDragging", isDragging); // 拖拽图标时为 true
provide("isOnQuickSearchMode", isOnQuickSearchMode);
// steam 模块
provide("steamApps", steamApps);


// 获取桌面图标，分页
onBeforeMount(() => {
  init();
});

// init
function init() {
  // 获取原始图标数据，并处理成需要的格式
  window.getDesktopIcons(function (rawIcons) {
    const handleIcons = handleRawIcons(rawIcons);
    const localSetting = getLocalSetting();
    // 分页
    pages.value = paginateArray(
      handleIcons,
      layout.value.pageCapacity,
      localSetting
    );
    console.log("pages", pages.value);
  });

  // 获取 steam 应用数据
  window.getSteamApps(function (apps) {
    steamApps.value = apps;
    // console.log("steamApps", steamApps.value);
  });

  // 获取 chrome 书签数据
  window.getChromeBookmarks(function (bookmarks) {
    console.log("bookmarks", bookmarks);
  });
}
</script>
<style scoped></style>