<script setup>
import { onBeforeMount, ref, provide, reactive, watch, onMounted } from "vue";
// 组件
import Page from "./components/Page.vue";
import ContextMenu from "./components/ContextMenu.vue";
import Sidebar from "./components/Sidebar.vue";
import SideArea from "./components/widgets/desktop/SideArea.vue";
import PageIndicator from "./components/widgets/desktop/PageIndicator.vue";
import QuickSearch from "./components/widgets/desktop/QuickSearch.vue";
// 工具
import { handleRawIcons } from "./functions/handleRawIcons";
import { paginateArray } from "./functions/paginateArray";
import { getDesktopLayout } from "./functions/getDesktopLayout";
import { getLocalSetting } from "./functions/getLocalSetting";
// 组合式函数 composables
import { useWheelToPage } from "./composables/wheelToPage.js";
import { useMoveToPage } from "./composables/moveToPage.js";
// 第三方工具库
import _ from "lodash";
import { watchDeep } from "@vueuse/core";

// 数据
const pages = ref([]);
const currentPage = ref(0);
const layout = ref(getDesktopLayout());
const setting = ref(getLocalSetting());
const isOnQuickSearchMode = ref(false); // 搜索模式
const isDragging = ref(false); // 用于控制拖拽时的样式（背景）

// 监听 setting, 更改时保存到本地
watchDeep(setting, (newVal) => {
  utools.dbStorage.setItem("setting", JSON.parse(JSON.stringify(newVal)));
});

// 使用 composables
const { moveToPage } = useMoveToPage(pages, currentPage);
useWheelToPage(pages, currentPage, moveToPage);

// 提供
provide("currentPage", currentPage);
provide("pages", pages);
provide("layout", layout);
provide("moveToPage", moveToPage);
provide("isDragging", isDragging); // 拖拽图标时为 true
provide("setting", setting);
provide("isOnQuickSearchMode", isOnQuickSearchMode);
provide("init", init)

// 右键菜单
const isShowContextMenu = ref(false);
provide("isShowContextMenu", isShowContextMenu);

// 设置窗口
const isShowSidebar = ref(false);
provide("isShowSidebar", isShowSidebar);

// 获取桌面图标，分页
onBeforeMount(() => {
  init();
});

// init
function init() {
  window.getDesktopIcons(function (rawIcons) {
    // 获取原始图标数据，并处理成需要的格式
    const handleIcons = handleRawIcons(rawIcons);
    const localSetting = getLocalSetting();
    console.log("获取桌面图标，分页localSetting", localSetting);
    // 分页
    pages.value = paginateArray(
      handleIcons,
      layout.value.pageCapacity,
      localSetting
    );
    console.log("pages", pages.value);
    console.log("pageCapacity", layout.value.pageCapacity);
  });
}
</script>

<template>
  <div id="desktop" class="relative w-screen h-screen bg-transparent">
    <!-- 页面 -->
    <div id="view" class="w-screen h-screen overflow-hidden">
      <div id="pages" class="h-full w-fit flex flex-row items-center">
        <Page
          v-for="(page, index) in pages"
          :id="'page-' + index"
          :key="index"
          :pageIndex="index"
        />
      </div>
    </div>
    <!-- 页面指示器 -->
    <PageIndicator />
    <!-- 左右检测区域 -->
    <SideArea />
    <!-- 右键菜单 -->
    <ContextMenu />
    <!-- 侧边栏-->
    <Sidebar />
    <!-- 快速搜索 -->
    <QuickSearch />
  </div>
</template>

<style scoped>
#pages {
  will-change: transform;
}
</style>
