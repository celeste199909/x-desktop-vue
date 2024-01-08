<template>
    <div :id="'page-' + pageIndex" class="page w-screen h-screen flex justify-center items-center text-lg text-white bg-transparent">
        <VueDraggable group="page" :animation="150" ref="el" v-model="pages[pageIndex]"
            :style="gridStyle"  @move="onMove" >
            <Application v-for="icon in pages[pageIndex]" :key="icon.id" :icon="icon" />
        </VueDraggable>
    </div>
</template>

<script setup>
import { inject, ref, defineProps } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import Application from "./icons/Application.vue";

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
    gridTemplateColumns: `repeat(${layout.column}, 1fr)`,
    gridTemplateRows: `repeat(${layout.row}, 1fr)`
})

// 拖动图标至左右边缘时，切换页面
function onMove(event) {
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

</script>
<style scoped></style>