<template>
	<view class="select-warp">
		11
		<view class="answer">
			<!-- <view v-html="answer"></view> -->
			<!-- <MpHtml class="mphtml" :content="answer"></MpHtml> -->
			<rich-text :nodes="answer">
				
			</rich-text>
		</view>
	</view>
</template>

<script>
	import { computed, defineProps } from 'vue';
	import { LEARNING_TYPE } from '@/constans/index.js';
	import MpHtml from '../../../uni_modules/mp-html/components/mp-html/mp-html.vue'
	export default {
		name: 'SlectComponent',
		comments: {
			MpHtml
		},
		props: {
			data: {
				type: Object,
				default: () => {}
			},
			type: {
				type: Number,
				default: LEARNING_TYPE.VIEW
			}
		},
		data() {
			return {
				answer: '<div'
			}div
		},
		computed: {
		},
		created() {
			console.log('props->', this.data, this.type, this.answer)
		},
		methods: {
			mpHtmlLoad() {
				console.log('mp-html load-->');
			}
		}
	}
	
</script>

<style lang="scss">
	.mphtml {
		height: 100px;
		width: 100px;
		border: 1px solid red;
	}
</style>