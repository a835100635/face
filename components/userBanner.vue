<template>
  <div class="user-banner-block"></div>
</template>
<script setup></script>
<style lang="scss">
.user-banner-block {
  position: absolute;
  background: url('../assets/images/user-banner.png') no-repeat 0 0;
  background-size: 436.8px 120px;
  width: 74px;
  height: 104px;
  animation: move 1s steps(7) infinite;
}
@keyframes move{
  100%{
    background-position: -436.8px 0;
  }
}

</style>
