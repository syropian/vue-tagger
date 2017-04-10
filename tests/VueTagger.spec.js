import Vue from 'vue/dist/vue.js'
import test from 'ava'
import VueTagger from '../dist/VueTagger.js'

let vm;

test.beforeEach(t => {
	const Tagger = Vue.extend(VueTagger);
	const tags = [
		{ name: 'JavaScript', selected: true },
		{ name: 'Ruby', selected: false },
		{ name: 'PHP', selected: true },
		{ name: 'Crystal', selected: true },
		{ name: 'Python', selected: false }
	]
	vm = new Tagger({
		propsData: {
			tags: tags
		}
	}).$mount()
})

test('It renders', t => {
  t.is(vm.$el.classList.contains('vue-tagger'), true)
});

test('It should compute an autocomplete list of non-selected tags', t => {
	const expectedList = vm.tags.filter(t => !t.selected).map(t => t.name)
  t.deepEqual(vm.autocompleteList, expectedList)
});

test('It should compute a list of visible tags', t => {
	const expectedVisibleTags = vm.tagList.filter(tag => tag.selected)
  t.deepEqual(vm.visibleTags, expectedVisibleTags)
});

test('It can find a tag\'s index by name', t => {
	const index = vm.getTagIndexByName('Ruby')
  t.is(1, index)
});

test('It can add a new tag', t => {
	vm.addTag('Scala')
  t.is(6, vm.tagList.length)
});

test('It can remove a tag by index', t => {
	vm.removeTagAtIndex(1)
  t.is(4, vm.tagList.length)
	t.deepEqual(-1, vm.getTagIndexByName('Ruby'))
});

test('It can remove a tag by reference', t => {
	vm.deleteTag(vm.tagList[1])
  t.is(4, vm.tagList.length)
	t.deepEqual(-1, vm.getTagIndexByName('Ruby'))
});

test('It deletes the last visible tag when the delete key is pressed', t => {
	vm.onDeletePressed()
  t.is(4, vm.tagList.length)
	t.deepEqual(-1, vm.getTagIndexByName('Crystal'))
});
