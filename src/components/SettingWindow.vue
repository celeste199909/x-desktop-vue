<template>
    <div id="setting-window" :style="{ transform: isShowSettingWindow ? 'translateX(0)' : 'translateX(-110%)' }"
        class="transition-all w-96 p-3 text-gray-700 bg-slate-100 absolute left-0 top-0 bottom-0 m-4 backdrop-blur-sm rounded-xl  bg-slate-200/90">
        <div class="font-bold h-14 flex justify-center items-center text-xl">设置</div>
        <div class="join join-vertical w-full">
            <div class="collapse collapse-arrow join-item border border-slate-200">
                <input type="radio" name="my-accordion-4" checked="checked" />
                <div class="collapse-title text-xl font-medium">
                    主题
                </div>
                <div class="collapse-content">
                    <p>浅色</p>
                    <p>深色</p>
                    <p>跟随系统</p>
                </div>
            </div>
            <div class="collapse collapse-arrow join-item border border-slate-200">
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title text-xl font-medium">
                    系统
                </div>
                <div class="collapse-content">
                    <p>hello</p>
                </div>
            </div>
            <div class="collapse collapse-arrow join-item border border-slate-200">
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title text-xl font-medium">
                    高级设置
                </div>
                <div class="collapse-content">
                    <p>设置1</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'
const isShowSettingWindow = inject('isShowSettingWindow')

// function toggleSettingWindow() {
//     isShowSettingWindow.value = !isShowSettingWindow.value;
// }
</script>
<style scoped></style>