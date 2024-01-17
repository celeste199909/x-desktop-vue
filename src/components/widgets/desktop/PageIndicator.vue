<template>
    <div id="page-indicator" class="page-indicator flex justify-center gap-2 absolute z-50 bottom-20 left-1/2 -translate-x-1/2">
        <div v-for="(page, index) in pages" class="w-3 h-3 rounded-full"
            :class="[currentPage === index ? 'bg-white/90' : 'bg-white/50']" @click="moveToPage({ pageIndex: index })">
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'

// const props = defineProps({
//     moveToPage: {
//         type: Function,
//         required: true
//     }
// })

const currentPage = inject('currentPage')
const pages = inject('pages')
const moveToPage = inject('moveToPage')

// function switchPage(index) {
//     console.log("switchPage", index);
//     currentPage.value = index
// }

</script>
<style scoped></style>