<template>
    <div id="page-indicator" class="flex justify-center gap-2 absolute z-50 bottom-20 left-1/2 -translate-x-1/2">
        <div v-for="(page, index) in pages" class="btn btn-xs border-2"
            :style="{ border: currentPage === index ? '2px solid white' : '2px solid transparent' }"
            @click="currentPage = index">{{ index + 1 }}</div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const currentPage = inject('currentPage')
const pages = inject('pages')
</script>
<style scoped></style>