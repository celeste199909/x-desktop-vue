import { inject } from "vue";

export function useMoveToPage(pages, currentPage) {
    // 切换页面
    // {pageIndex, transition = true}
    function moveToPage(options) {
        const pagesEl = document.getElementById("pages");
        const { pageIndex, transition = true } = options;
        currentPage.value = pageIndex;
        pagesEl.style.transition = transition ? "all 0.6s ease" : "none";
        pagesEl.style.transform = `translateX(${currentPage.value * -(100 / pages.value.length)
            }%)`;
        // pagesEl.value.style.transform = `translate3d(${currentPage.value * -(100 / pages.value.length)}%, 0, 0)`
    }

    return {
        moveToPage
    }
}