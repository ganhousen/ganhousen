module.exports = {
  "presets": [
    [
      "@vue/app",
      {
        "polyfills": [
          "es.promise",
          "es.symbol"
        ]
      }
    ]
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      },
      "vant"
    ],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}