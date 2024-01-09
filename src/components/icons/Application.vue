<template>
    <div class="icon" :class="place">
        <img class="icon-image" :src="icon.iconImage" alt="" srcset="" :class="place" ref="iconImage" @mousedown.left="handleMouseDown($event)"
            @mouseup.left="handleMouseUp(icon, $event)">
        <div class="icon-name">{{ icon.showName }}</div>
    </div>
</template>

<script setup>
import { defineProps, inject, ref, computed } from 'vue'

const props = defineProps({
    icon: {
        type: Object,
        required: true
    },
    place: {
        type: String, // on-desktop, in-contract-xfolder, in-expand-xfolder
        required: true,
        default: 'on-desktop'
    }
})

const utools = inject('utools')
const iconImage = ref();
const position = { x: 0, y: 0 }

// 处理打开图标
function handleMouseDown(event) {
    if (props.place === "in-contract-xfolder") return;
    console.log('Mouse Down Icon');
    position.x = event.clientX;
    position.y = event.clientY;
    iconImage.value.classList.add('scale-110');
}

function handleMouseUp(icon, event) {
    if (props.place === "in-contract-xfolder") return;
    console.log('Mouse Up Icon');
    const x = event.clientX;
    const y = event.clientY;
    if (Math.abs(x - position.x) < 1 && Math.abs(y - position.y) < 1) {
        utools.shellOpenPath(icon.realPath)
        window.hideDesk();
    }
    iconImage.value.classList.remove('scale-110');
}

</script>
<style scoped>
.icon.sortable-ghost {
    opacity: 0;
}

.icon-image:hover {
    filter: drop-shadow(0 0 1rem rgba(255, 255, 255, 0.5));
}

/* 在桌面上 */
.icon.on-desktop {
    width: 140px;
    height: 140px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
}

.icon.on-desktop .icon-image {
    width: 54px;
    height: 54px;
    margin: 10px;
}

.icon.on-desktop .icon-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-align: center;
    font-size: 0.875rem;
    line-height: 0.875rem;
}

/* 在收起的文件夹中 */
.icon.in-contract-xfolder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
}

.icon.in-contract-xfolder .icon-image {
    width: 100%;
    height: 100%;
}

.icon.in-contract-xfolder .icon-name {
    display: none;
}

/* 在展开的文件夹中 */
.icon.in-expand-xfolder {
    width: 140px;
    height: 140px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
}

.icon.in-expand-xfolder .icon-image {
    width: 54px;
    height: 54px;
    margin: 10px;
}

.icon.in-expand-xfolder .icon-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-align: center;
    font-size: 0.875rem;
    line-height: 0.875rem;
}
</style>