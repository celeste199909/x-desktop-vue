<template>
    <div class="icon w-[140px] h-[140px] p-4 flex flex-col justify-start items-center select-none cursor-pointer"
        @mousedown.left="handleMouseDown($event)"
        @mouseup.left="handleMouseUp(icon,$event)"
        >
        <img :src="icon.iconImage" alt="" srcset="" class="w-14 h-14 m-4">
        <div class="line-clamp-2 text-center text-sm">{{ icon.showName }}</div>
    </div>
</template>

<script setup>
import { defineProps, inject } from 'vue'
defineProps({
    icon: {
        type: Object,
        required: true
    }
})

const utools = inject('utools')

const position = {
    x: 0,
    y: 0
}

// 处理打开图标
function handleMouseDown(event){
    console.log('handleMouseDown');
    position.x = event.clientX;
    position.y = event.clientY;
}

function handleMouseUp(icon,event){
    const x = event.clientX;
    const y = event.clientY;
    if (Math.abs(x - position.x) < 1 && Math.abs(y - position.y) < 1) {
        utools.shellOpenPath(icon.realPath)
        window.hideDesk();
    }
}

</script>
<style scoped></style>