import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("D:/study/2025/Vue/Webpack/courseware/webpack_docs/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("D:/study/2025/Vue/Webpack/courseware/webpack_docs/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
