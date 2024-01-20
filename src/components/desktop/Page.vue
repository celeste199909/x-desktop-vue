<template>
  <div
    :id="'page-' + pageIndex"
    class="page w-screen h-screen flex justify-center items-center text-lg text-white bg-transparent relative"
  >
    <VueDraggable
      class="draggable-area rounded-xl p-4"
      :class="[{ 'bg-slate-500/30': isDragging }]"
      :id="'draggable-area-' + pageIndex"
      :group="{
        name: 'desktop',
        put: ['desktop', 'xfolder', 'side'],
        pull: ['desktop', 'xfolder', 'side'],
      }"
      :animation="150"
      ghostClass="ghost"
      draggable=".draggable"
      v-model="pages[pageIndex]"
      :style="gridStyle"
      @start="onStart"
      @end="onEnd"
      @move="onMove"
    >
      <div v-for="item in pages[pageIndex]" :key="item.id" class="draggable">
        <Application :icon="item" :place="'on-desktop'" />
      </div>
    </VueDraggable>
  </div>
</template>

<script setup>
import { inject, ref, defineProps} from "vue";
import { VueDraggable } from "vue-draggable-plus";
import Application from "../icons/Application.vue";
// import XFolder from "./icons/XFolder.vue";
// 组合式函数
import { useUpdateSortInfo } from "../../composables/desktop/updateSortInfo.js";
import { useWheelToPage } from "../../composables/desktop/wheelToPage.js";
import { useMoveToPage } from "../../composables/desktop/moveToPage.js";

const { updateSortInfo } = useUpdateSortInfo();

// props
const props = defineProps({
  pageIndex: {
    type: Number,
    required: true,
  },
});

// 注入 来自 App.vue
const currentPage = inject("currentPage");
const pages = inject("pages");
const layout = inject("layout");
const isDragging = inject("isDragging");
const currentModule = inject("currentModule");

const { moveToPage } = useMoveToPage(pages, currentPage);
useWheelToPage(pages, currentPage, moveToPage, currentModule);

// app容器 grid 布局
const gridStyle = ref({
  minWidth: layout.value.minWidth + "px",
  minHeight: layout.value.minHeight + "px",
  display: "grid",
  gridTemplateColumns: `repeat(${layout.value.column}, 1fr)`,
  gridTemplateRows: `repeat(${layout.value.row}, 1fr)`,
  gap: `${layout.value.gapY}px ${layout.value.gapX}px`,
});

// 拖动图标至左右边缘时，切换页面
function onMove(event) {
  const toPageIndex = parseInt(event.to.id.split("-").pop());
  // 不是同一个页面，且拖动至页面区域
  if (
    event.from.id !== event.to.id &&
    event.to.className.split(" ").includes("draggable-area")
  ) {
    if (pages.value[toPageIndex].length >= layout.value.pageCapacity) {
      console.log("页面已满");
      return false; // 拒绝添加到 area 中
    }
  }
  // 如果去往的是文件夹
  if (event.to.className.split(" ").includes("xfolder-icons")) {
    // 放回原位
    return false;
  }

  if (event.to.id === "right-area") {
    console.log("右边");
    if (currentPage.value < pages.value.length - 1) {
      currentPage.value++;
      moveToPage({ pageIndex: currentPage.value, transition: true });
    }
    return false;
  }
  if (event.to.id === "left-area") {
    console.log("左边");
    if (currentPage.value > 0) {
      currentPage.value--;
      moveToPage({ pageIndex: currentPage.value, transition: true });
    }
    return false;
  }
}

// function onSort(event) {
//     console.log("onSort", event);
// }

function onStart(event) {
  if (event.item.className.split(" ").includes("icon")) {
    isDragging.value = true;
  }
}

function onEnd(event) {
  isDragging.value = false;
  console.log("pages.value", pages.value);
  updateSortInfo();
}
</script>
<style scoped>
.draggable.ghost {
  opacity: 0;
}
</style>
