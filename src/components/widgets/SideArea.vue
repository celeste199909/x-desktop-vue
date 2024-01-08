<!-- 该组件放置屏幕左右两边，检测拖动图标至左右边缘时，切换页面 -->
<template>
    <!-- 左右检测区域 -->
    <VueDraggable group="page" :animation="150" v-model="list1" id="left-area">
        <div class="absolute z-50 top-0 bottom-0 left-0 w-8"></div>
    </VueDraggable>
    <VueDraggable group="page" :animation="150" v-model="list1" id="right-area">
        <div class="absolute z-50 top-0 bottom-0 right-0 w-8"></div>
    </VueDraggable>
</template>

<script setup>
import { ref } from 'vue'
// 插件
import { VueDraggable } from 'vue-draggable-plus';
const list1 = ref([])  // 用于左右检测区域

</script>
<style scoped></style>