<script setup>
import { onBeforeMount, ref, provide, reactive,watch,onMounted } from "vue";
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
// 第三方工具库
import _ from "lodash";
import { watchDeep } from '@vueuse/core'

// 数据
const pages = ref([]);
const currentPage = ref(0);
const layout = ref(getDesktopLayout());
// console.log("layout", layout.value);
const setting = ref(getLocalSetting());
watchDeep(setting, (newVal) => {
  console.log("newVal setting stringify",JSON.parse(JSON.stringify(newVal)) );
  utools.dbStorage.setItem('setting', JSON.parse(JSON.stringify(newVal)))
});
// const reactiveSetting = reactive(setting.value);
// watch(reactiveSetting, (newVal) => {
//   console.log("newVal setting",toRefs(newVal) );
//   // utools.dbStorage.setItem('setting', newVal)
// });
console.log("LocalSetting", setting.value);
// 搜索模式
const isOnQuickSearchMode = ref(false);
// 页面容器元素
const pagesEl = ref();

const isDragging = ref(false);

// 使用 composables
useWheelToPage(pages, currentPage, moveToPage);

// 提供
provide("currentPage", currentPage);
provide("pages", pages);
provide("layout", layout);
provide("moveToPage", moveToPage);
provide("isDragging", isDragging); // 拖拽图标时为 true
provide("setting", setting);
provide("isOnQuickSearchMode", isOnQuickSearchMode);

// 右键菜单
const isShowContextMenu = ref(false);
provide("isShowContextMenu", isShowContextMenu);

// 设置窗口
const isShowSidebar = ref(false);
provide("isShowSidebar", isShowSidebar);

// 获取桌面图标，分页
onBeforeMount(() => {
  window.getDesktopIcons(function (rawIcons) {
    // 获取原始图标数据，并处理成需要的格式
    const handleIcons = handleRawIcons(rawIcons);
    // 分页
    pages.value = paginateArray(handleIcons, layout.value.pageCapacity);
    console.log("pages", pages.value);
    console.log("pageCapacity", layout.value.pageCapacity);
  });
});

// 切换页面
// {pageIndex, transition = true}
function moveToPage(options) {
  const { pageIndex, transition = true } = options;
  currentPage.value = pageIndex;
  pagesEl.value.style.transition = transition ? "all 0.6s ease" : "none";
  pagesEl.value.style.transform = `translateX(${
    currentPage.value * -(100 / pages.value.length)
  }%)`;
  // pagesEl.value.style.transform = `translate3d(${currentPage.value * -(100 / pages.value.length)}%, 0, 0)`
}
// 监听退出快捷键
</script>

<template>
  <div id="desktop" class="relative w-screen h-screen bg-transparent">
    <!-- 页面 -->
    <div id="view" class="w-screen h-screen overflow-hidden">
      <div
        id="pages"
        ref="pagesEl"
        class="h-full w-fit flex flex-row items-center"
      >
        <Page
          v-for="(page, index) in pages"
          :id="'page-' + index"
          :key="index"
          :pageData="page"
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
