# vue-tagger

[![Build Status](https://travis-ci.org/syropian/vue-tagger.svg?branch=master)](https://travis-ci.org/syropian/vue-tagger)

> Simple tagging component for Vue with built-in autocomplete.

_Note: This component was specifically built for [Astral](https://astralapp.com), and while it's fairly general purpose, it omits many features of a fully-fledged tagging component. It's unlikely that I will add any additional features unless I personally need them._

## Install
```js
$ yarn add vue-tagger
```
_or_

```js
$ npm install vue-tagger --save
```

## Usage

```js
<template>
  <div class="my-component">
    <vue-tagger :tags="tags" @change="logTags" :placeholder="'Enter a tag...'" :delimiter="','"></vue-tagger>
  </div>
</template>
<script>
import VueTagger from 'vue-tagger'
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
      ]
    }
  },
  methods: {
    logTags (tags) {
      console.log(tags)
    }
  }
}
</script>
```

## License

MIT © [Collin Henderson](https://github.com/syropian)
