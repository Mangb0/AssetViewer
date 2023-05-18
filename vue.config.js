const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  outputDir: "./docs",
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("fbx")
      // .test(/\.(fbx)(\?.*)?$/) //fbx만 처리하는 정규표현식
      .test(/\.(fbx|FBX)(\?.*)?$/) //fbx, FBX 처리하는 정규표현식
      // .test(/\.(fbx)(\?.*)?$/i) //대소문자 구분 없이 처리하는 정규표현식
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]",
      });
  },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
