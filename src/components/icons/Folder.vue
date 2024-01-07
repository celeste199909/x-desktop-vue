<template>
    <div class="icon w-36 h-36 bg-blue-300 flex flex-col items-center" >
        <img :src="icon.iconImage" alt="" srcset="" class="w-14 h-14">
        <div>{{ icon.rawName }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    icon: {
        type: Object,
        required: true
    }
})
</script>
<style scoped></style>