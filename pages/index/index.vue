<template>
	<view class="container">
			{{ title }}
	</view>
</template>

<script setup>
import { ref } from 'vue';
const title = ref('---')

</script>

<style>
	.container {
		font-size: 100px;
	}
</style>
