// toast.js

import { createApp, ref } from 'vue';

const Toast = {};

Toast.install = function (app, options) {
  // 在 Vue 3 应用实例中添加 $toast 方法，用于调用显示 toast
  app.config.globalProperties.$toast = function(message) {
    const toastElement = document.createElement('div');
    toastElement.classList.add('toast');
    toastElement.innerHTML = message;
    document.body.appendChild(toastElement);
    setTimeout(() => {
      toastElement.remove();
    }, options.duration);
  }
};

export default Toast;