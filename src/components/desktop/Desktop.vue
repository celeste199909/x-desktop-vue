<template>
  <div id="desktop" class="relative w-screen h-screen bg-transparent">
    <!-- 页面 -->
    <div id="view" class="w-screen h-screen overflow-hidden flex flex-col">
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

<script setup>
import { inject, onBeforeMount } from "vue";
// 组件
import Page from "./Page.vue";
import PageIndicator from "./PageIndicator.vue";
import SideArea from "./SideArea.vue";
import ContextMenu from "../widgets/contextmenu/ContextMenu.vue";
import Sidebar from "../widgets/sidebar/Sidebar.vue";
import QuickSearch from "./QuickSearch.vue";
// 组合式函数
import { useWheelToPage } from "../../composables/desktop/wheelToPage.js";
import { useMoveToPage } from "../../composables/desktop/moveToPage.js";

const pages = inject("pages");
const currentPage = inject("currentPage");
const currentModule = inject("currentModule");

const { moveToPage } = useMoveToPage(pages, currentPage);
useWheelToPage(pages, currentPage, moveToPage, currentModule);
</script>
<style scoped></style>
