export const data = {
  "key": "v-7d0ce4de",
  "path": "/intro/learn.html",
  "title": "我能学到什么",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "git": {
    "contributors": [
      {
        "name": "戴志文",
        "email": "2649212120",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "intro/learn.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
