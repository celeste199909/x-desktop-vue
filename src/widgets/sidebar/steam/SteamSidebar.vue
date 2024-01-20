<template>
  <div class="font-bold h-14 flex justify-center items-center text-xl">
    Steam 设置
  </div>
  <div class="wrapper flex flex-col items-center p-2">steam</div>
</template>

<script setup>
import { inject, ref } from "vue";

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
