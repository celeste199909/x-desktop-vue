<template>
  <div
    id="sidebar"
    :style="{
      transform: isShowSidebar ? 'translateX(0)' : 'translateX(-110%)',
    }"
    class="sidebar select-none overflow-y-scroll z-[200] transition-all w-96 p-3 text-gray-700 bg-slate-100/90 border-2 dark:border-slate-600 dark:text-slate-100 dark:bg-slate-900/90 absolute left-0 top-0 bottom-0 m-4 backdrop-blur-sm rounded-xl"
  >
    <div class="font-bold h-14 flex justify-center items-center text-xl">
      设置
    </div>
    <div class="wrapper flex flex-col items-center p-2">
      <!-- 主题 -->
      <div class="item w-full my-4">
        <div class="mb-4 font-bold">主题</div>
        <Theme />
      </div>
      <!-- 背景颜色 -->
      <div class="item w-full my-4">
        <div class="mb-4 font-bold">背景颜色</div>
        <BgColor />
      </div>
      <!-- 背景图片 -->
      <div class="item w-full my-4">
        <div class="mb-2 font-bold">背景图片</div>
        <BgImage />
      </div>
      <!-- 背景遮罩浓度 -->
      <div class="item w-full my-4">
        <div class="mb-4 font-bold">遮罩浓度</div>
        <BgOpacity />
      </div>
      <!-- 自定义隐藏快捷键 -->
      <div class="item w-full my-4">
        <div class="mb-2 font-bold">隐藏快捷键</div>
        <div class="mb-4 text-sm">请勿与[启动快捷键]一样</div>
        <HideShortcutKey />
      </div>
      <!-- 使用说明 -->
      <div class="item w-full my-4">
        <div class="mb-2 font-bold">使用说明</div>
        <div class="my-4 text-blue-500 cursor-pointer" @click="handleClickManual">
          查看
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import Theme from "./widgets/sidebar/Theme.vue";
import BgColor from "./widgets/sidebar/BgColor.vue";
import BgImage from "./widgets/sidebar/BgImage.vue";
import BgOpacity from "./widgets/sidebar/BgOpacity.vue";
import HideShortcutKey from "./widgets/sidebar/HideShortcutKey.vue";

const isShowSidebar = inject("isShowSidebar");
const setting = inject("setting");
const utools = inject("utools");

function handleClickManual() {
  utools.shellOpenExternal("https://sourl.cn/dgwfig")
  window.hideDesk();
}
</script>
<style scoped></style>
