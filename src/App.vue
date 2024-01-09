<script setup>
import { onBeforeMount, ref, provide } from 'vue';
// 组件
import Page from './components/Page.vue'
import ContextMenu from './components/ContextMenu.vue';
import SettingWindow from './components/SettingWindow.vue';
import SideArea from './components/widgets/SideArea.vue';
import PageIndicator from './components/widgets/PageIndicator.vue';
// 工具
import { handleRawIcons } from './functions/handleRawIcons';
import { paginateArray } from './functions/paginateArray';
import { getDesktopLayout } from './functions/getDesktopLayout';

// 数据
const pages = ref([]);
const currentPage = ref(0);
const layout = ref(getDesktopLayout());

// 注入
provide('currentPage', currentPage);
provide('pages', pages);
provide('layout', layout);

// 右键菜单
const isShowContextMenu = ref(false);
provide('isShowContextMenu', isShowContextMenu);

// 设置窗口
const isShowSettingWindow = ref(false);
provide('isShowSettingWindow', isShowSettingWindow);

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


</script>

<template>
  <div id="desktop" class="relative w-screen h-screen bg-transparent">
    <!-- 页面 -->
    <div id="view" class="w-screen h-screen overflow-hidden">
      <div id="pages" class="h-full w-fit flex flex-row items-center transition-all duration-500 ease"
        :style="{ transform: 'translateX(' + (currentPage * -(100 / pages.length)) + '%)' }">
        <Page v-for="(page, index) in pages" :id="'page-' + (index + 1)" :key="index" :pageIndex="index" />
      </div>
    </div>
    <!-- 页面指示器 -->
    <PageIndicator />
    <!-- 左右检测区域 -->
    <SideArea />
    <!-- 右键菜单 -->
    <ContextMenu />
    <!-- 设置窗口 -->
    <SettingWindow />
  </div>
</template>


<style scoped></style>
