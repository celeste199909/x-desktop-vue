<template>
    <grid-layout :style="{ width: column * 140 + 'px', height: row * 140 + 'px' }" :max-rows="row" :layout.sync="iconsData"
        :auto-size="false" :col-num="column" :row-height="140" :is-draggable="true" :is-resizable="false"
        :is-mirrored="false" :vertical-compact="false" :margin="[0, 0]" :use-css-transforms="true" 
        @layout-updated="layoutUpdatedEvent">
        <grid-item class="flex justify-center items-center" v-for="item in iconsData" :x="item.x"
            :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" @move="moveEvent">
            <Application :icon="item.icon" />
        </grid-item>
    </grid-layout>
</template>
   
<script setup>
import { ref, defineProps, onMounted } from "vue";
import Application from "./icons/Application.vue";

import { useLayoutStore } from '../stores/layout';
import { storeToRefs } from 'pinia'
const { layout } = storeToRefs(useLayoutStore())
const row = layout.value.row;
const column = layout.value.column;
const pageCapacity = layout.value.pageCapacity;


const props = defineProps({
    icons: {
        type: Array,
        required: false
    }
})

const iconsData = ref([])
onMounted(() => {
    iconToGridData(props.icons)
})
function iconToGridData(icons) {
    console.log("icons", icons);
    const gridData = icons.map((icon, index) => {
        return {
            x: index % column,
            y: Math.floor(index / column),
            w: 1,
            h: 1,
            i: index.toString(),
            icon: icon
        }
    })
    console.log("gridData", gridData);
    iconsData.value = gridData
}
function layoutUpdatedEvent() {
    console.log("layoutUpdatedEvent");
    console.log("iconsData.value", iconsData.value);
}
function moveEvent() {
    console.log("moveEvent");
}

</script>
   
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.vue-grid-item.vue-grid-placeholder {
    background: rgba(0, 0, 0, 0.144) !important;
}
</style>
  