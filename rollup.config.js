import vue from "rollup-plugin-vue";

export default {
  entry: "src/VueTagger.vue",
  dest: "dist/VueTagger.js",
  plugins: [
    vue()
  ],
  format: "cjs"
}
