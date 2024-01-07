<template>
    <div class="page w-screen h-screen flex justify-center items-center text-lg text-white bg-transparent">
        <GridLayout :icons="icons"/>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Application from './icons/Application.vue'
import GridLayout from './GridLayout.vue'
import { useLayoutStore } from '../stores/layout';
import { storeToRefs } from 'pinia'

const store = useLayoutStore()
const { layout } = storeToRefs(store)
const row = layout.value.row;
const column = layout.value.column;
// import { XFolder } from './icons/XFolder.vue'
// import { File } from './icons/File.vue'
// import { Folder } from './icons/Folder.vue'

defineProps({
    pageid: {
        type: Number,
        required: true
    },
    icons: {
        type: Array,
        required: false
    }
})
</script>
<style scoped></style>