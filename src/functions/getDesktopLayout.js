// 桌面布局
export function getDesktopLayout() {
  let layout = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    paddingX: 0.1,
    paddingY: 0.08,
    cellLength: 140,
    row: 0,
    column: 0,
    pageCapacity: 0,
  };

  layout.column = Math.floor(
    (layout.width * (1 - layout.paddingX * 2)) / layout.cellLength
  );
  layout.row = Math.floor(
    (layout.height * (1 - layout.paddingY * 2)) / layout.cellLength
  );
  layout.pageCapacity = layout.column * layout.row;
  return layout;
}
