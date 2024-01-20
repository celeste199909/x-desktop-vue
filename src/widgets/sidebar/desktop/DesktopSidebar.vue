<template>
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
        查看说明
      </div>
      <div class="my-4">
        <div>如果觉得还不错，麻烦给个好评吧😭 ~</div>
        <div>感谢！祝你新年快乐哈！🎉</div>
      </div>
    </div>
    <!-- 清除本地缓存 -->
    <div class="item w-full my-4">
      <div class="mb-2 font-bold">本地缓存</div>
      <div class="my-2">本地缓存保存了所有设置项和桌面图标的排序信息。</div>
      <div
        class="my-4 text-red-500 cursor-pointer"
        @click="handleClickClearSetting"
      >
        清除
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import Theme from "./Theme.vue";
import BgColor from "./BgColor.vue";
import BgImage from "./BgImage.vue";
import BgOpacity from "./BgOpacity.vue";
import HideShortcutKey from "./HideShortcutKey.vue";

const isShowSidebar = inject("isShowSidebar");
const setting = inject("setting");
const utools = inject("utools");
const init = inject("init");

function handleClickManual() {
  utools.shellOpenExternal("https://sourl.cn/dgwfig");
  window.hideDesk();
}

function handleClickClearSetting() {
  utools.dbStorage.removeItem("setting");
  init();
}
</script>
<style scoped></style>
