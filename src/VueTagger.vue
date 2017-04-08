<template>
<div class="vue-tagger">
  <span class="vue-tagger-tag" v-for="tag in visibleTags">{{ tag.name }}</span>
  <input class="vue-tagger-input" v-model="currentTag" @keypress="onKeypress" type="text" @keydown.delete="onDeletePressed" :placeholder="placeholder" ref="vue-tagger-input" />
</div>
</template>
<script>
import Vue from 'vue'
import fuzzysearch from 'fuzzysearch'
import Awesomplete from 'awesomplete'
import differenceBy from 'lodash.differenceby'
export default {
  name: 'VueTagger',
  props: {
    tags: {
      type: Array,
      required: true,
      default: []
    },
    delimiter: {
      type: String,
      default: ','
    },
    placeholder: {
      type: String,
      default: 'Enter a tag...'
    }
  },
  data() {
    return {
      awesomplete: null,
      currentTag: '',
      tagList: [].concat(this.tags)
    }
  },
  computed: {
    availableTags() {
      return differenceBy(this.tags, this.visibleTags, 'name')
    },
    availableTagNames() {
      return this.availableTags.map(tag => tag.name)
    },
    visibleTags() {
      return this.tagList.filter(tag => tag.selected)
    }
  },
  mounted () {
    this.initAwesomplete()
  },
  watch: {
    tags: function() {
      this.awesomplete.list = this.availableTagNames
    },
    tagList: function() {
      this.$emit('tags-changed', this.visibleTags)
      this.awesomplete.list = this.availableTagNames
    }
  },
  methods: {
    initAwesomplete () {
      this.awesomplete = new Awesomplete(this.$refs['vue-tagger-input'], {
        autoFirst: true,
        filter (text, input) {
          return fuzzysearch(input.toLowerCase(), text.toLowerCase())
        },
        list: this.availableTagNames
      })
      window.addEventListener("awesomplete-select", (e) => {
        setTimeout(() => {
          const tagName = e.text.value.trim().replace(this.delimiter, '')
          const tagIndex = this.getTagIndexByName(tagName)
          if (tagIndex !== -1) {
            this.tagList.splice(tagIndex, 1)
            this.tagList.push({ name: tagName, selected: true })
          } else {
            this.tagList.push({ name: tagName, selected: true })
          }
          setTimeout(() => {
            this.currentTag = ''
          }, 0)
        }, 0)
      }, false);
    },
    onKeypress (e) {
      const key = this.delimiter.charCodeAt(0)
      if (e.which === key) {
        const tagName = this.currentTag.trim().replace(this.delimiter, '')
        const tagIndex = this.getTagIndexByName(tagName)
        if (tagIndex !== -1) {
          this.tagList.splice(tagIndex, 1)
          this.tagList.push({ name: tagName, selected: true })
        } else {
          this.tagList.push({ name: tagName, selected: true })
        }
        setTimeout(() => {
          this.currentTag = ''
        }, 0)
      }
    },
    onDeletePressed () {
      if (this.currentTag === '') {
        const lastVisibleTag = this.tagList.filter(tag => tag.selected).pop()
        if (lastVisibleTag) {
          const index = this.tagList.findIndex(tag => tag.name === lastVisibleTag.name)
          this.tagList.splice(index, 1)
        }
      }
    },
    getTagIndexByName (name) {
      return this.tagList.findIndex(tag => tag.name === name)
    }
  }
}
</script>
<style lang="scss">
.vue-tagger {
  border-radius: 2px;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  padding: 6px 0 0 6px;
  max-width: 400px;
  min-height: 33px;
  margin: 20px;
  &-tag {
    display: flex;
    align-items: center;
    background: #5dc1a4;
    border-radius: 2px;
    color: #fff;
    font-family: 'Helvetica Neue';
    font-weight: bold;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    padding: 3px 6px;
    margin-bottom: 6px;
    margin-right: 3px;
    height: 21px;
  }
  &-input {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    outline: none;
    height: 27px;
    width: 100%;
  }
}

// Awesomplete Styles
.awesomplete [hidden] {
    display: none;
}

.awesomplete .visually-hidden {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}

.awesomplete {
    display: inline-block;
    flex-grow: 1;
    position: relative;
    margin-bottom: 6px;
    margin-right: 6px;
}

.awesomplete > ul {
    position: absolute;
    left: 0;
    z-index: 1;
    min-width: 100%;
    box-sizing: border-box;
    list-style: none;
    padding: 0;
    margin: 0;
    background: #fff;
}

.awesomplete > ul:empty {
    display: none;
}

.awesomplete > ul {
	border-radius: .3em;
	margin: .2em 0 0;
	background: hsla(0,0%,100%,.9);
	background: linear-gradient(to bottom right, white, hsla(0,0%,100%,.8));
	border: 1px solid rgba(0,0,0,.3);
	box-shadow: .05em .2em .6em rgba(0,0,0,.2);
	text-shadow: none;
}

@supports (transform: scale(0)) {
	.awesomplete > ul[hidden],
	.awesomplete > ul:empty {
		opacity: 0;
		display: block;
	}
}

	.awesomplete > ul > li {
		position: relative;
		padding: .2em .5em;
		cursor: pointer;
	}

	.awesomplete > ul > li:hover {
		background: hsl(200, 40%, 80%);
		color: black;
	}

	.awesomplete > ul > li[aria-selected="true"] {
		background: hsl(205, 40%, 40%);
		color: white;
	}

		.awesomplete mark {
			background: transparent;
      font-weight: bold;
		}

		.awesomplete li:hover mark {
			background: transparent;
      font-weight: bold;
		}

		.awesomplete li[aria-selected="true"] mark {
			background: transparent;
      font-weight: bold;
			color: inherit;
		}
</style>
