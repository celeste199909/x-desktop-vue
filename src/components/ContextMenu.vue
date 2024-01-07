<template>
    <div class="px-2 py-3 rounded-lg backdrop-blur-sm bg-slate-200/90 fixed w-40">
        <div @click="$emit('context-menu')"
            class="flex justify-start items-center text-black hover:bg-slate-300  hover:text-blue-500 px-4 py-2 rounded-lg cursor-pointer">
            新建文件夹</div>
        <div class="flex justify-start items-center text-black hover:bg-slate-300  hover:text-blue-500 px-4 py-2 rounded-lg cursor-pointer"
            @click.stop="$emit('setting-window')" @click="$emit('context-menu')">
            设置</div>
    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
    position: {
        type: Object,
        required: false
    }
})
const emit = defineEmits(['setting-window', 'context-menu'])
</script>
<style scoped></style>