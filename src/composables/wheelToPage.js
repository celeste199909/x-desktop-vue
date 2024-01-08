// mouse.js
import { ref, onMounted, onUnmounted, inject } from "vue";

// 按照惯例，组合式函数名以“use”开头
export function useWheelToPage() {
  // 被组合式函数封装和管理的状态
  const currentPage = inject("currentPage");
  const pages = inject("pages");
  const utools = inject("utools");
  console.log("utools", utools);
  console.log("currentPage", currentPage);
  // 组合式函数可以随时更改其状态。
  function switchPage(e) {
    if (e.deltaY > 0) {
      // 移到下一页
      if (currentPage.value < pages.value.length - 1) {
        currentPage.value++;
      }
    }
    if (e.deltaY < 0) {
      // 移到上一页
      if (currentPage.value > 0) {
        currentPage.value--;
      }
    }
  }
  // 监听鼠标滚轮
  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener("wheel", switchPage));
  onUnmounted(() => window.removeEventListener("wheel", switchPage));
}
