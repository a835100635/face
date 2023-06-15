<template>
  <i 
    :class="['t-icon', iconName, customClass]" 
    :style="`height: ${size[0]}; width: ${size[1]}`"
  />
</template>
<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  customClass: {
    type: String,
    default: "",
  },
  size: {
    type: Array,
    default: ['16px', '16px'],
  },
});

const iconName = computed(() => {
  return `t-${props.name}`;
});


</script>
<style lang="scss">
.page-wrapper {
  font-size: 50px;
}
</style>
