<template>
    <div id="context-menu" v-show="isShowContextMenu" :style="{ left: contextMenuPosition.x + 'px', top: contextMenuPosition.y + 'px' }"
        class="px-2 py-3 rounded-lg backdrop-blur-sm bg-slate-200/90 fixed w-40">
        <div @click="handleClickNewFolder"
            class="flex justify-start items-center text-black hover:bg-slate-300  hover:text-blue-500 px-4 py-2 rounded-lg cursor-pointer">
            新建文件夹
        </div>
        <div class="flex justify-start items-center text-black hover:bg-slate-300  hover:text-blue-500 px-4 py-2 rounded-lg cursor-pointer"
            @click.left="handleClickSetting($event)">
            设置
        </div>
    </div>
</template>
<script setup>
import { inject, ref } from 'vue'


// 右键菜单
const isShowContextMenu = inject('isShowContextMenu')
const isShowSettingWindow = inject('isShowSettingWindow')
const contextMenuPosition = ref({ x: 0, y: 0 });

// 点击新建文件夹
function handleClickNewFolder() {
    console.log("新建文件夹");
}

// 点击设置
function handleClickSetting(event) {
    event.stopPropagation();
    isShowContextMenu.value = false;
    isShowSettingWindow.value = true;
}

// 监听鼠标右键
window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenuPosition.value.x = e.clientX;
    contextMenuPosition.value.y = e.clientY;
    isShowContextMenu.value = true;
});

// 监听点击空白处 隐藏右键菜单 和 设置窗口
window.addEventListener("click", (e) => {
    e.preventDefault();
    // 隐藏右键菜单
    isShowContextMenu.value = false;
    // // 如果设置窗口打开，点击的不是设置窗口，关闭设置窗口
    if (isShowSettingWindow.value && !e.path.includes(document.querySelector("#setting-window"))) {
        isShowSettingWindow.value = false;
    }
});
</script>
<style scoped></style>