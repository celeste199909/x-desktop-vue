export function paginateArray(array, pageSize) {
    // 根据页面容量，对数组进行分页
    const paginatedArray = [];
    let page = [];
    array.forEach((item, index) => {
        if (index % pageSize === 0) {
            page = [];
            paginatedArray.push(page);
        }
        page.push(item);
    });
    return paginatedArray;
}
