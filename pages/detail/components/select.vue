<template>
	<view class="select-warp">
		<view class="answer">
			{{ answer }}
		</view>
	</view>
</template>

<script setup>
	import { computed, defineProps } from 'vue';
	import { LEARNING_TYPE } from '@/constans/index.js';
	const props = defineProps({
		data: {
			type: Object,
			default: () => {}
		},
		type: {
			type: String,
			default: LEARNING_TYPE.VIEW
		}
	});
	const answer = computed(() => {
		return props.data.answer;
	})
	console.log('----', props.data)
</script>

<style lang="scss">
</style>