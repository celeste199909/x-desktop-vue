<template>
    <div id="page-indicator" class="page-indicator flex justify-center gap-2 absolute z-50 bottom-20 left-1/2 -translate-x-1/2">
        <div v-for="(page, index) in pages" class="w-3 h-3 rounded-full"
            :class="[currentPage === index ? 'bg-white/90' : 'bg-white/50']" @click="moveToPage({ pageIndex: index })">
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'
// 组合式函数
import { useWheelToPage } from "@/composables/desktop/wheelToPage.js";
import { useMoveToPage } from "@/composables/desktop/moveToPage.js";


const pages = inject("pages");
const currentPage = inject("currentPage");
const currentModule = inject("currentModule");

const { moveToPage } = useMoveToPage(pages, currentPage);
useWheelToPage(pages, currentPage, moveToPage, currentModule);



</script>
<style scoped></style>