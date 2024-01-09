<template>
    <div :id="'page-' + pageIndex"
        class="page w-screen h-screen flex justify-center items-center text-lg text-white bg-transparent relative">
        <VueDraggable class="dragable-area" :id="'dragable-area-' + pageIndex" group="page" :animation="150" ref="el"
            v-model="pages[pageIndex]" :style="gridStyle" @move="onMove" @sort="onSort">
            <template v-for="item in pages[pageIndex] " :key="item.id">
                <XFolder v-if="item.type === 'xfolder'" :xfolder="item" />
                <Application v-else :icon="item" :place="'on-desktop'" />
            </template>
        </VueDraggable>
    </div>
</template>

<script setup>
import { inject, ref, defineProps } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import Application from "./icons/Application.vue";
import XFolder from './icons/XFolder.vue';

// 鼠标滚轮翻页
import { useWheelToPage } from '../composables/wheelToPage.js'
useWheelToPage()

// props
const props = defineProps({
    pageIndex: {
        type: Number,
        required: true
    }
})

// 注入
const currentPage = inject('currentPage')
const pages = inject('pages')
const layout = inject('layout')

// grid 布局
const gridStyle = ref({
    display: 'grid',
    gridTemplateColumns: `repeat(${layout.value.column}, 1fr)`,
    gridTemplateRows: `repeat(${layout.value.row}, 1fr)`
})

// 拖动图标至左右边缘时，切换页面
function onMove(event) {
    const toPageIndex = parseInt(event.to.id.split('-').pop());
    // 不是同一个页面，且拖动至页面区域
    if (event.from.id !== event.to.id && event.to.className === 'dragable-area') {
        // console.log("toPageIndex", toPageIndex);
        // console.log("pages[toPageIndex]", pages.value[toPageIndex]);
        if (pages.value[toPageIndex].length >= layout.value.pageCapacity) {
            // console.log("toPageIndex", toPageIndex);
            // console.log("pages[toPageIndex]", pages[toPageIndex]);
            // 放回原位
            console.log("页面已满");
            return false; // 拒绝添加到 area 中
        }
    }

    if (event.to.id === 'right-area') {
        if (currentPage.value < pages.value.length - 1) {
            currentPage.value++;
        }
        return false; // 拒绝添加到 area 中
    }
    if (event.to.id === 'left-area') {
        if (currentPage.value > 0) {
            currentPage.value--;
        }
        return false; // 拒绝添加到 area 中
    }
}

function onSort(event) {
    console.log("onSort", event);
    console.log("pages", pages.value);
}

</script>
<style scoped></style>