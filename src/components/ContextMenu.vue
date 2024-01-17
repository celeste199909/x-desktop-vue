<template>
  <div
    id="context-menu"
    v-show="isShowContextMenu"
    :style="{
      left: contextMenuPosition.x + 'px',
      top: contextMenuPosition.y + 'px',
    }"
    class="context-menu select-none px-2 py-3 rounded-lg backdrop-blur-sm bg-slate-200/90 dark:bg-slate-900/90 fixed w-40"
  >
    <template v-for="item in menuOptions" :key="item.name">
      <div
        class="flex justify-start items-center text-slate-900 hover:bg-slate-400/70 dark:text-slate-200 dark:hover:bg-slate-600 px-4 py-2 rounded-lg cursor-pointer"
        v-if="item.enabled.includes(clickTargetType)"
        @click.left="item.handler($event)"
      >
        {{ item.name }}
      </div>
    </template>
  </div>
</template>
<script setup>
import { computed, inject, reactive, ref } from "vue";
import { nanoid } from "nanoid";

import { getSearchKeywords } from "../functions/handleRawIcons";
import showToast from "./widgets/toast/index";

// 右键菜单
const isShowContextMenu = inject("isShowContextMenu");
const isShowSidebar = inject("isShowSidebar");
const contextMenuPosition = ref({ x: 0, y: 0 });
// 当前页面
const currentPage = inject("currentPage");
const pages = inject("pages");
const layout = inject("layout");
const moveToPage = inject("moveToPage");
const utools = inject("utools");
const init = inject("init");
// 点击的目标
const clickTarget = ref(null);
// const isClickXFolder = ref(false)
// desktop icon xfolder other
const clickTargetType = ref("");

const menuOptions = ref([
  {
    name: "打开",
    enabled: ["icon"],
    handler: handleOpenIcon,
  },
  {
    name: "新建页面",
    enabled: ["desktop", "other"],
    handler: handleClickNewPage,
  },
  {
    name: "删除页面",
    enabled: ["desktop", "other"],
    handler: handleClickRemovePage,
  },
  {
    name: "设置",
    enabled: ["desktop", "other"],
    handler: handleClickSetting,
  },
  {
    name: "刷新",
    enabled: ["desktop", "other"],
    handler: handleClickRefresh,
  },
]);
// 打开图标
function handleOpenIcon(event) {
  console.log("打开图标", event);
  const iconId = clickTarget.value.id.split("-")[2];
  const icon = pages.value[currentPage.value].find(
    (item) => item.id === iconId
  );
  utools.shellOpenPath(icon.realPath);
  window.hideDesk();
}

// 新建页面
function handleClickNewPage() {
  pages.value.push([]);
  moveToPage({ pageIndex: currentPage.value, transition: false });
}
// 删除页面
function handleClickRemovePage() {
  // 如果页面为空,则删除
  if (pages.value[currentPage.value].length === 0) {
    pages.value.splice(currentPage.value, 1);
    // 如果当前页面是最后一页，则切换至前一页
    if (currentPage.value === pages.value.length) {
      currentPage.value--;
    }
    moveToPage({ pageIndex: currentPage.value, transition: true });
  } else {
    console.log();
    showToast("页面不为空，不能删除");
  }
}

// 点击设置
function handleClickSetting(event) {
  event.stopPropagation();
  isShowContextMenu.value = false;
  isShowSidebar.value = true;
}

// 刷新
function handleClickRefresh() {
  console.log("刷新");
  init();
}

// 监听鼠标右键
window.addEventListener("contextmenu", (event) => {
  // 如果点击的是文件夹
  // console.log("contextmenu event", event.target.className);
  event.preventDefault();
  const classList = event.target.className.split(" ");
  clickTarget.value = event.target;
  console.log("classList", classList);

  if (
    classList.includes("xfolder-icons") ||
    classList.includes("xfolder-name")
  ) {
    console.log("右键点击了文件夹");
    clickTargetType.value = "xfolder";
    // isClickXFolder.value = true
  } else if (
    classList.includes("icon-image") ||
    classList.includes("icon-name")
  ) {
    console.log("右键点击了图标");
    clickTargetType.value = "icon";
  } else if (
    classList.includes("icon") ||
    classList.includes("page") ||
    classList.includes("draggable-area") ||
    classList.includes("side-area")
  ) {
    console.log("右键点击了桌面");
    clickTargetType.value = "desktop";
  } else {
    console.log("右键点击了其他");
    clickTargetType.value = "other";
    return;
  }
  console.log("clickTargetType", clickTargetType.value);
  console.log("menuOptions", menuOptions);

  contextMenuPosition.value.x = event.clientX;
  contextMenuPosition.value.y = event.clientY;

  isShowContextMenu.value = true;
  // 清除上次点击的目标
});

// 监听点击空白处 隐藏右键菜单 和 设置窗口
window.addEventListener("click", (e) => {
  e.preventDefault();
  // 隐藏右键菜单
  isShowContextMenu.value = false;
  // isClickXFolder.value = false
  // // 如果设置窗口打开，点击的不是设置窗口，关闭设置窗口
  if (
    isShowSidebar.value &&
    !e.path.includes(document.querySelector("#sidebar"))
  ) {
    isShowSidebar.value = false;
  }
});

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
    icons: [],
    searchKeywords: getSearchKeywords("未命名文件夹"),
  };
  console.log("xfolder", xfolder);
  pages.value[currentPage.value].push(xfolder);
}

function handleClickRemoveXFolder() {
  console.log("删除文件夹");
  isShowContextMenu.value = false;
}
</script>
<style scoped></style>
