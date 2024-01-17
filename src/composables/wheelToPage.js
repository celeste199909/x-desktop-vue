// mouse.js
import { ref, onMounted, onUnmounted, inject } from "vue";

// 按照惯例，组合式函数名以“use”开头
export function useWheelToPage(
  pages,
  currentPage,
  moveToPage,
) {
  
  // 组合式函数可以随时更改其状态。
  function switchPage(e) {
    const isOnSidebar = e.path.some((item) => item.classList?.contains("sidebar"));
    if (isOnSidebar) {
      return;
    }

    if (e.deltaY > 0) {
      // 移到下一页
      if (currentPage.value < pages.value.length - 1) {
        // currentPage.value++;
        const newPage = currentPage.value + 1;
        moveToPage({pageIndex: newPage});
      }
    }
    if (e.deltaY < 0) {
      // 移到上一页
      if (currentPage.value > 0) {
        const newPage = currentPage.value - 1;
        moveToPage({pageIndex: newPage});
      }
    }
  }
  // 监听鼠标滚轮
  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => {
    window.addEventListener("wheel", switchPage)
  });
  onUnmounted(() => {
    window.removeEventListener("wheel", switchPage)

  });
}
