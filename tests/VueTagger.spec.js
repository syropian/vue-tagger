import Vue from 'vue/dist/vue.js'
import test from 'ava'
import VueTagger from '../dist/VueTagger.js'

test('It renders', t => {
	const tagger = new Vue(VueTagger).$mount()
  t.is(true, true)
});
