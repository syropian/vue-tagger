import vue from "rollup-plugin-vue";

export default {
  entry: "src/VueTagger.vue",
  dest: "dist/VueTagger.js",
  external: [
    "awesomplete",
    "fuzzysearch",
    "lodash.differenceby"
  ],
  plugins: [
    vue()
  ],
  format: "cjs"
}
