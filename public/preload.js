// 开发者可以暴露自定义 API 供后加载脚本使用
// preload.js 中使用 nodejs
const { ipcRenderer } = require("electron");

function createDesktopWindow() {
  desktopWindow = utools.createBrowserWindow(
    "index.html",
    {
      show: false,
      title: "desktop",
      webPreferences: {
        // devTools: true,
        preload: "index-preload.js",
      },
      frame: false,
      transparent: true,
      backgroundColor: "#00000000",
      alwaysOnTop: true,
      resizable: false,
      movable: false,
      fullscreen: true,
      focusable: true,
      skipTaskbar: true,
    },
    function () {
      ipcRenderer.sendTo(desktopWindow.webContents.id, "init");
      showDesktop(desktopWindow);
      // 开发者工具
      desktopWindow.webContents.openDevTools();
      // 监听子窗口隐藏事件
      ipcRenderer.on("hideDesktop", (e, data) => {
        desktopWindow.hide();
      });
    }
  );
  return desktopWindow;
}

let desktopWindow = null;
if (!desktopWindow) {
  desktopWindow = createDesktopWindow();
}
// 监听插件进入事件
// utools.onPluginEnter(({ code, type, payload, option }) => {
//   console.log("onPluginEnter", code, type, payload, option);
//   if (!desktopWindow) {
//     desktopWindow = createDesktopWindow();
//   } else {
//     showDesktop(desktopWindow);
//   }
// });

// 打开链接
window.openUrl = function (url) {
  utools.shellOpenExternal(url);
};

// 显示桌面
function showDesktop(desktopWindow) {
  // 隐藏主窗口
  utools.hideMainWindow();
  desktopWindow.show();
  // utools.outPlugin();
}
window.exports = {
  "desktop": { // 注意：键对应的是 plugin.json 中的 features.code
     mode: "none",  // 用于无需 UI 显示，执行一些简单的代码
     args: {
        // 进入插件应用时调用
        enter: (action) => {
          console.log("进入插件", action);
           // action = { code, type, payload }
          //  window.utools.hideMainWindow()
           // do some thing
          //  window.utools.outPlugin()
          // showDesktop()
          // desktopWindow.show();
          showDesktop(desktopWindow);
        }  
     } 
  }
}
