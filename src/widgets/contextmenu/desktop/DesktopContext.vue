<template>
  <template v-for="item in menuOptions" :key="item.name">
    <div
      class="flex justify-start items-center text-slate-900 hover:bg-slate-400/70 dark:text-slate-200 dark:hover:bg-slate-600 px-4 py-2 rounded-lg cursor-pointer"
      v-if="item.enabled.includes(clickTargetType)"
      @click.left="item.handler($event)"
    >
      {{ item.name }}
    </div>
  </template>
</template>
<script setup>
import { computed, inject, reactive, ref, defineProps } from "vue";

import { nanoid } from "nanoid";
import { getSearchKeywords } from "@/functions/handleRawIcons.js";
import { useWheelToPage } from "@/composables/desktop/wheelToPage.js";
import { useMoveToPage } from "@/composables/desktop/moveToPage.js";
import showToast from "@/widgets/toast/index";

const props = defineProps({
  clickTarget: {
    type: Object,
    required: true,
  },
});

const pages = inject("pages");
const currentPage = inject("currentPage");
const currentModule = inject("currentModule");

const { moveToPage } = useMoveToPage(pages, currentPage);
useWheelToPage(pages, currentPage, moveToPage, currentModule);

// 右键菜单
const isShowContextMenu = inject("isShowContextMenu");
const isShowSidebar = inject("isShowSidebar");
// 当前页面
const layout = inject("layout");
const utools = inject("utools");
const init = inject("init");
// 点击的目标
const clickTarget = ref(null);
// const isClickXFolder = ref(false)
// desktop icon xfolder other
const clickTargetType = computed(() => {
  if(!props.clickTarget) return
  console.log("desktop clickTargetType", props.clickTarget.className);
  const classList = props.clickTarget.className.split(" ");
  if (
    classList.includes("xfolder-icons") ||
    classList.includes("xfolder-name")
  ) {
    return "xfolder";
  } else if (
    classList.includes("icon-image") ||
    classList.includes("icon-name")
  ) {
    return "icon";
  } else if (
    classList.includes("icon") ||
    classList.includes("page") ||
    classList.includes("draggable-area") ||
    classList.includes("side-area")
  ) {
    return "desktop";
  } else {
    return "other";
  }
});

const menuOptions = ref([
  {
    name: "打开",
    enabled: ["icon"],
    handler: handleOpenIcon,
  },
  {
    name: "编辑",
    enabled: ["icon"],
    handler: () => {},
  },
  {
    name: "隐藏图标",
    enabled: ["icon"],
    handler: () => {},
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
    name: "查看隐藏图标",
    enabled: ["desktop", "other"],
    handler: () => {},
  },
  {
    name: "桌面设置",
    enabled: ["desktop", "other"],
    handler: handleClickSetting,
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
    // toast
    console.log("当前页面不为空，不能删除");
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
