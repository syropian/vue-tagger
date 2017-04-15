<template>
  <div id="app">
    <vue-tagger :tags="tags" @change="setCurrentTags"></vue-tagger>
    <pre><code>{{ currentTagsToJson }}</code></pre>
    <button @click="changeTags">Change Tags</button>
  </div>
</template>
<script>
import VueTagger from '../src/VueTagger.vue'
export default {
  components: {
    VueTagger
  },
  data() {
    return {
      tags: [
        { name: 'JavaScript', selected: true },
        { name: 'Ruby', selected: false },
        { name: 'PHP', selected: true },
        { name: 'Crystal', selected: true },
        { name: 'Python', selected: false }
      ],
      currentTags: []
    }
  },
  computed: {
    currentTagsToJson () {
      return JSON.stringify(this.currentTags)
    }
  },
  methods: {
    setCurrentTags (tags) {
      this.currentTags = tags
    },
    changeTags () {
      this.tags = [
        { name: 'Java', selected: true },
        { name: 'Haskell', selected: false },
        { name: 'Scala', selected: true },
        { name: 'Elixir', selected: true },
        { name: 'Elm', selected: false }
      ]
    }
  }
}
</script>
<style lang="scss">
#app {
  margin: 20px;
}
</style>
