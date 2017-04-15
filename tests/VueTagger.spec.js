import Vue from 'vue/dist/vue.js'
import test from 'ava'
import VueTagger from '../src/VueTagger.vue'

Vue.config.productionTip = false;
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
  t.is(index, 1)
});

test('It can add a new tag', t => {
	vm.addTag('Scala')
  t.is(vm.tagList.length, 6)
});

test('It shouldn\'t add duplicate tags', t => {
	vm.addTag('Ruby')
	vm.addTag('javascript')
  t.is(vm.tagList.length, 5)
});

test('It can remove a tag by index', t => {
	vm.removeTagAtIndex(1)
  t.is(4, vm.tagList.length)
	t.is(vm.getTagIndexByName('Ruby'), -1)
});

test('It can remove a tag by reference', t => {
	vm.deleteTag(vm.tagList[1])
  t.is(4, vm.tagList.length)
	t.is(vm.getTagIndexByName('Ruby'), -1)
});

test('It deletes the last visible tag when the delete key is pressed', t => {
	vm.onDeletePressed()
  t.is(4, vm.tagList.length)
	t.is(vm.getTagIndexByName('Crystal'), -1)
});

test('It updates the tag list when the parent tags property changes', t => {
	const newTags = [
		{ name: 'Java', selected: true },
		{ name: 'Haskell', selected: false },
		{ name: 'Scala', selected: true },
		{ name: 'Elixir', selected: true },
		{ name: 'Elm', selected: false }
	]
	vm.$props.tags = newTags

	Vue.nextTick(() => {
		t.is(vm.getTagIndexByName('Haskell'), 1)
		t.is(vm.getTagIndexByName('Crystal'), -1)
		t.deepEqual(vm.tagList, newTags)
	})
});
