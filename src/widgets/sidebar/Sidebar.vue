<template>
  <div
    id="sidebar"
    :style="{
      transform: isShowSidebar ? 'translateX(0)' : 'translateX(-110%)',
    }"
    class="sidebar select-none overflow-y-scroll z-[200] transition-all w-96 p-3 text-gray-700 bg-slate-100/90 border-2 dark:border-slate-600 dark:text-slate-100 dark:bg-slate-900/90 absolute left-0 top-0 bottom-0 m-4 backdrop-blur-sm rounded-xl"
  >
    <DesktopSidebar v-if="currentModule === 'desktop'" />
    <SteamSidebar v-if="currentModule === 'steam'" />
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import DesktopSidebar from "./desktop/DesktopSidebar.vue";
import SteamSidebar from "./steam/SteamSidebar.vue";

const isShowSidebar = inject("isShowSidebar");
const setting = inject("setting");
const utools = inject("utools");
const init = inject("init");
const currentModule = inject("currentModule");

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
