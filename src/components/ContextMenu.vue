<template>
    <div id="context-menu" v-show="isShowContextMenu"
        :style="{ left: contextMenuPosition.x + 'px', top: contextMenuPosition.y + 'px' }"
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
import { nanoid } from 'nanoid'

// 右键菜单
const isShowContextMenu = inject('isShowContextMenu')
const isShowSettingWindow = inject('isShowSettingWindow')
const contextMenuPosition = ref({ x: 0, y: 0 });
// 当前页面
const currentPage = inject('currentPage')
const pages = inject('pages')
const layout = inject('layout')

// 点击新建文件夹
function handleClickNewFolder() {
    // 如果页面容量已满，提示不能再添加
    if (pages.value[currentPage.value].length >= layout.value.pageCapacity) {
        console.log("页面容量已满，不能再添加文件夹");
        return;
    }
    console.log("新建文件夹");
    // 创建文件夹对象
    const xfolder = {
        id: nanoid(),
        name: "未命名文件夹",
        type: "xfolder",
        icons: [
            {
                "rawName": "Adobe Photoshop 2023 (2).lnk",
                "iconImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAASsSURBVFhH7Zh7bJNVFMBPy9qNrl23sfW1PrKubLRrv64tZToHMoMsziGCQCS4ZQHU+YgxaGZ8RaPGiZMAWwCHoGOC+ocxBhP9wywxMdFEYwQTEhPNNDJE8IESRJ2w4zl3ruOjd4OVPvzDL/klzXfvuffX795zv/aA5NKCVbGALeIHhxLJDqEasPnKxdwAGmEhuTTgDJSCM7YRXLH3wBk/Be4FmB3ix2jeg1ARaQOzp5hcWFR1acBSaQVndBCcC36VD5IFXPNPgDPcBWZzCTmpJPVQEd1MnX5PCso2rvh3YPO3kFMBIZab9py/nuy/kAZknzGwKwNQYPOQWx4L6sAevpcET0s65wZXbARMjgZyK2RBAzjC3dKOucRkXUZuc1iwCOyhHmmnXGIsX0VuNhY0k+AWaadcUli2htzslyWovHIaw6/+mYSy7wxWdx/C0hVPoraqURqbMuOCjssSZJnIGzgt87Z+hYZrOhA8V0nHmDHpFmSCL/2EhQs3SMeYMakK2jfuRXPzJoFtw26s6TmikvQ99TFqfdeq4jWVDZgfW40F9WsF+roVqnYpqQqy2MR9bdUiNC7uRH/vN4n22p3HUB9enuhjbulC/7avMbj7JPHjOP0n0HX/m4k+UtIhKPDUo/eJDxPtoT2/oOm6e0Rb+a09U24PllaNczHpEpxV3YS+pz9JtAvBprvR0Ngh9qS4//oYKi//hrW7vqf2n8Wp4N8+rBoniXQI5kdXouW27WLZJtpZIj+yEq1tvRgePCvuhQf/QFvHLup/i9gSxa0Po219v2qOJFIV5KTgJWX4Mz+ZiTbG8+A7IinK1nSjMnBG3Kt77RxWP3dYnJd5864XY2q9lzg3UxWcDn/ft6hXlokYQ0P75BIzvMy8tL3D9NS3oXauOtOTSLeg75lPURdqnYyj5Cm56TGsO/B3Ul9+opWPDtEpsFA1j4pUBWtf/EFscIYncdw5gMZFt4tllcUam+7Cuc9+jqG9p0js/KTkgVG0tveJLyKLS0uSTAe/UTgpWEBD+8205D46+95KJA7jfuCgOAVk8RkX9HS9izUvHEFH5z4sbnlIvEHK1/aIfZgQ3PQ27cXF0viMC04c3uH9f4lM56NIyFGy8P26/aNooaMoZ0t84dtFBv/60YXGM17KTARrtnyZSAxjU6e0z8XMrl+HlY8MYWDHUUqs4+INEuw/iYGdI+h9/APMCzRL4xLMRPBK0NW20C+ZVeKLGa5u//commJZLyRbginzv+CVohK0BTeDO35e2jEXOOOj9LdzNbmJf3UmKKu6Ayqix6Wdc4Ej/BnoTTeQm5UFC8BgjkGF8j6455+TBmQTV+wslFY+D6CLkRtXuUSBxglFlnXgiI1Ig7LHGG23IdAbbyYnLzGbBbnEVUQEwVC6Hioiw5LA7GBXDkGBqY1cIkQpIapbfOmIMiJENMMcbx/Yw4fBGT2awBEdSTsTY9uUj6DEvZXmXk7ECa7J5BOqiyW5/MqPljstIbiQeCPRmkF4jqVEIxEguFbNctJa9SyC153LXk6CZasIX4bgsXkON8EZayR4WacspPPFjVwf5ifK34RLsZmE5+C5Lin2H7wA/gFP9ONfr2TS/AAAAABJRU5ErkJggg==",
                "realPath": "C:\\Users\\celeste\\Desktop\\Adobe Photoshop 2023 (2).lnk",
                "type": "app",
                "id": "-rzDTqWqLjeTpeLzRkxcB",
                "showName": "Adobe Photoshop 2023 (2)",
                "suffix": "lnk",
                "searchKeywords": [
                    "adobephotoshop2023(2)",
                    "adobe",
                    "photoshop",
                    "2023",
                    "(2)",
                    "ap2("
                ]
            },
            {
                "rawName": "Adobe Photoshop 2023.lnk",
                "iconImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAASsSURBVFhH7Zh7bJNVFMBPy9qNrl23sfW1PrKubLRrv64tZToHMoMsziGCQCS4ZQHU+YgxaGZ8RaPGiZMAWwCHoGOC+ocxBhP9wywxMdFEYwQTEhPNNDJE8IESRJ2w4zl3ruOjd4OVPvzDL/klzXfvuffX795zv/aA5NKCVbGALeIHhxLJDqEasPnKxdwAGmEhuTTgDJSCM7YRXLH3wBk/Be4FmB3ix2jeg1ARaQOzp5hcWFR1acBSaQVndBCcC36VD5IFXPNPgDPcBWZzCTmpJPVQEd1MnX5PCso2rvh3YPO3kFMBIZab9py/nuy/kAZknzGwKwNQYPOQWx4L6sAevpcET0s65wZXbARMjgZyK2RBAzjC3dKOucRkXUZuc1iwCOyhHmmnXGIsX0VuNhY0k+AWaadcUli2htzslyWovHIaw6/+mYSy7wxWdx/C0hVPoraqURqbMuOCjssSZJnIGzgt87Z+hYZrOhA8V0nHmDHpFmSCL/2EhQs3SMeYMakK2jfuRXPzJoFtw26s6TmikvQ99TFqfdeq4jWVDZgfW40F9WsF+roVqnYpqQqy2MR9bdUiNC7uRH/vN4n22p3HUB9enuhjbulC/7avMbj7JPHjOP0n0HX/m4k+UtIhKPDUo/eJDxPtoT2/oOm6e0Rb+a09U24PllaNczHpEpxV3YS+pz9JtAvBprvR0Ngh9qS4//oYKi//hrW7vqf2n8Wp4N8+rBoniXQI5kdXouW27WLZJtpZIj+yEq1tvRgePCvuhQf/QFvHLup/i9gSxa0Po219v2qOJFIV5KTgJWX4Mz+ZiTbG8+A7IinK1nSjMnBG3Kt77RxWP3dYnJd5864XY2q9lzg3UxWcDn/ft6hXlokYQ0P75BIzvMy8tL3D9NS3oXauOtOTSLeg75lPURdqnYyj5Cm56TGsO/B3Ul9+opWPDtEpsFA1j4pUBWtf/EFscIYncdw5gMZFt4tllcUam+7Cuc9+jqG9p0js/KTkgVG0tveJLyKLS0uSTAe/UTgpWEBD+8205D46+95KJA7jfuCgOAVk8RkX9HS9izUvHEFH5z4sbnlIvEHK1/aIfZgQ3PQ27cXF0viMC04c3uH9f4lM56NIyFGy8P26/aNooaMoZ0t84dtFBv/60YXGM17KTARrtnyZSAxjU6e0z8XMrl+HlY8MYWDHUUqs4+INEuw/iYGdI+h9/APMCzRL4xLMRPBK0NW20C+ZVeKLGa5u//commJZLyRbginzv+CVohK0BTeDO35e2jEXOOOj9LdzNbmJf3UmKKu6Ayqix6Wdc4Ej/BnoTTeQm5UFC8BgjkGF8j6455+TBmQTV+wslFY+D6CLkRtXuUSBxglFlnXgiI1Ig7LHGG23IdAbbyYnLzGbBbnEVUQEwVC6Hioiw5LA7GBXDkGBqY1cIkQpIapbfOmIMiJENMMcbx/Yw4fBGT2awBEdSTsTY9uUj6DEvZXmXk7ECa7J5BOqiyW5/MqPljstIbiQeCPRmkF4jqVEIxEguFbNctJa9SyC153LXk6CZasIX4bgsXkON8EZayR4WacspPPFjVwf5ifK34RLsZmE5+C5Lin2H7wA/gFP9ONfr2TS/AAAAABJRU5ErkJggg==",
                "realPath": "C:\\Users\\celeste\\Desktop\\Adobe Photoshop 2023.lnk",
                "type": "app",
                "id": "_hH6R9WVgW5_31CHv1Uh0",
                "showName": "Adobe Photoshop 2023",
                "suffix": "lnk",
                "searchKeywords": [
                    "adobephotoshop2023",
                    "adobe",
                    "photoshop",
                    "2023",
                    "ap2"
                ]
            },
            {
                "rawName": "Apifox (2).lnk",
                "iconImage": "data:image/png;base64,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",
                "realPath": "C:\\Users\\celeste\\Desktop\\Apifox (2).lnk",
                "type": "app",
                "id": "Uxbr2pCI-TzLTxrpCye8I",
                "showName": "Apifox (2)",
                "suffix": "lnk",
                "searchKeywords": [
                    "apifox(2)",
                    "apifox",
                    "(2)",
                    "a("
                ]
            },
            {
                "rawName": "Apifox.lnk",
                "iconImage": "data:image/png;base64,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",
                "realPath": "C:\\Users\\celeste\\Desktop\\Apifox.lnk",
                "type": "app",
                "id": "XdcGw2hHP5YqEa_FnZphp",
                "showName": "Apifox",
                "suffix": "lnk",
                "searchKeywords": [
                    "apifox",
                    "apifox",
                    "a"
                ]
            },
            {
                "rawName": "Canva (2).lnk",
                "iconImage": "data:image/png;base64,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",
                "realPath": "C:\\Users\\celeste\\Desktop\\Canva (2).lnk",
                "type": "app",
                "id": "5Cel59bBwtS6kcIiuQOZ7",
                "showName": "Canva (2)",
                "suffix": "lnk",
                "searchKeywords": [
                    "canva(2)",
                    "canva",
                    "(2)",
                    "c("
                ]
            },
        ]
    }

    pages.value[currentPage.value].push(xfolder);
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