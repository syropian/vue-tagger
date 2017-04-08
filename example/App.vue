<template>
  <div id="app">
    <vue-tagger :tags="tags" @tags-changed="setCurrentTags"></vue-tagger>
    <pre><code>{{ currentTagsToJson }}</code></pre>
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
    }
  }
}
</script>
