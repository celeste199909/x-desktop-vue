<script setup>
import { onBeforeMount, ref, inject } from 'vue';
import Page from './components/Page.vue'
import ContextMenu from './components/ContextMenu.vue';
import SettingWindow from './components/SettingWindow.vue';

import { handleRawIcons } from './functions/handleRawIcons';
import { paginateArray } from './functions/paginateArray';

import { useLayoutStore } from './stores/layout';
import { storeToRefs } from 'pinia'
const store = useLayoutStore()
const { layout } = storeToRefs(store)
const pageCapacity = layout.value.pageCapacity;

const pages = ref([]);
const currentPage = ref(0);



onBeforeMount(() => {
  window.getDesktopIcons(function (rawIcons) {
    // 获取原始图标数据，并处理成需要的格式
    const handleIcons = handleRawIcons(rawIcons);
    // 分页
    pages.value = paginateArray(handleIcons, pageCapacity);
    console.log("pages.value", pages.value);
    console.log("useLayoutStore", pageCapacity);
  });
});

// 监听鼠标滚轮
window.addEventListener("wheel", (e) => {
  console.log(e);
  if (e.deltaY > 0) {
    // 移到下一页
    if (currentPage.value < pages.value.length - 1) {
      currentPage.value++;
    }
  }
  if (e.deltaY < 0) {
    // 移到上一页
    if (currentPage.value > 0) {
      currentPage.value--;
    }
  }
});

// 处理鼠标移入左右检测区域
function handleMouseEnterLeft() {
  console.log("handleMouseEnterLeft");
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}
function handleMouseEnterRight() {
  console.log("handleMouseEnterRight");
  if (currentPage.value < pages.value.length - 1) {
    currentPage.value++;
  }
}
// 处理鼠标右键
const showContextMenu = ref(false);
const contextMenuPosition = ref({ x: 0, y: 0 });

function toggleContextMenu() {
  showContextMenu.value = !showContextMenu.value;
}

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  contextMenuPosition.value.x = e.clientX;
  contextMenuPosition.value.y = e.clientY;
  showContextMenu.value = true;
});
window.addEventListener("click", (e) => {
  showContextMenu.value = false;
  // 如果设置窗口打开，点击的不是设置窗口，关闭设置窗口
  if (showSettingWindow.value && !e.path.includes(document.querySelector("#setting-window"))) {
    showSettingWindow.value = false;
  }
});
// 设置窗口
const showSettingWindow = ref(false);
function toggleSettingWindow() {
    showSettingWindow.value = !showSettingWindow.value;
}
</script>

<template>
  <div id="desktop" class="relative w-screen h-screen bg-transparent">
    <!-- 页面 -->
    <div class="w-screen h-screen overflow-hidden">
      <div class="h-full w-fit flex flex-row items-center transition-all duration-500 ease"
        :style="{ transform: 'translateX(' + (currentPage * -(100 / pages.length)) + '%)' }">
        <Page v-for="(page, index) in pages" :id="'page-' + (index + 1)" :key="index" :pageid="index" :icons="page" />
      </div>
    </div>
    <!-- 页面指示器 -->
    <div class="flex justify-center gap-2 absolute z-50 bottom-20 left-1/2 -translate-x-1/2">
      <div v-for="(page, index) in pages" class="btn btn-xs border-2"
        :style="{ border: currentPage === index ? '2px solid white' : '2px solid transparent' }"
        @click="currentPage = index">{{ index + 1 }}</div>
    </div>
    <!-- 左右检测区域 -->
    <div @mouseenter="handleMouseEnterLeft" class="absolute z-50 top-0 bottom-0 left-0 w-8 "></div>
    <div @mouseenter="handleMouseEnterRight" class="absolute z-50 top-0 bottom-0 right-0 w-8 "></div>
    <!-- 右键菜单 -->
    <ContextMenu v-show="showContextMenu"
      :style="{ left: contextMenuPosition.x + 'px', top: contextMenuPosition.y + 'px' }"
      @setting-window="toggleSettingWindow" @context-menu="toggleContextMenu" />
    <!-- 设置窗口 -->
    <SettingWindow class="transition-all"
      :style="{ transform: showSettingWindow ? 'translateX(0)' : 'translateX(-110%)' }" />
  </div>
</template>


<style scoped></style>
