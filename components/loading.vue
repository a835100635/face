<template>
	<view class="refresh swapping-squares-spinner">
		<view class="item item7">
		  <view class="dot dot1"></view>
		  <view class="dot dot2"></view>
		  <view class="dot dot3"></view>
		  <view class="dot dot4"></view>
		</view>
	</view>
</template>

<style lang="scss">
$color: #1695A3;
$background-color: #F3FFE2;
.refresh {
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #00000030;
	.item {
	  display: block;
	  float: left;
	  width: 80px;
	  height: 80px;
	  border-radius: 50%;
	  background-color: $color;
	  position: relative;
	  box-sizing: border-box;
	  &.item7 {
	    background: transparent;
	    .dot {
	      width: 12px;
	      height: 12px;
	      display: block;
	      position: absolute;
	      top: 50%;
	      border-radius: 50%;
	      background-color: $color;
	      transform: translateY(-50%);
	      animation: item-dot 1.2s ease-in-out infinite;
	      &.dot1 {
	        left: 0%;
	        transfrom: translateX(-50%);
	      }
	      &.dot2 {
	        left: 30%;
	        transfrom: translateX(-50%);
	        animation-delay: 0.2s;
	      }
	      &.dot3 {
	        transfrom: translateX(-50%);
	        left: 60%;
	        animation-delay: 0.4s;
	      }
				&.dot4 {
				  transfrom: translateX(-50%);
				  left: 90%;
				  animation-delay: 0.6s;
				}
	    }
	  }
	}
	
	@keyframes item-dot {
	  0% {
	    opacity: 1;
	    top: 50%;
	  }
	  50% {
	    opacity: 0.3;
	    top: 0;
	  }
	  100% {
	    opacity: 1;
	    top: 50%;
	  }
	}
}


</style>