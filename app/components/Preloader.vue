<template>
	<transition name="fade">
		<div v-if="!loaded" class="preloader">
			<div ref="lottieContainer" class="preloader__anim default-svg"></div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import animationData from '@/assets/preloader.json'
import lottie from 'lottie-web'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const loaded = ref(false)
const lottieContainer = ref<HTMLDivElement | null>(null)
let anim: any = null
let timer: ReturnType<typeof setTimeout> | null = null

function markAsLoaded() {
	loaded.value = true
	if (anim) {
		anim.destroy()
		anim = null
	}
	if (timer) {
		clearTimeout(timer)
		timer = null
	}
}

onMounted(() => {
	if (lottieContainer.value) {
		anim = lottie.loadAnimation({
			container: lottieContainer.value,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData,
		})

		anim.setSpeed(1.8)
	}

	timer = setTimeout(() => {
		markAsLoaded()
	}, 1250)
})

onBeforeUnmount(() => {
	if (anim) anim.destroy()
	if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.preloader {
	position: fixed;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #fff;
	z-index: 9999;
	color: var(--p-text-primary);
}

.preloader__anim {
	width: 300px;
	height: 300px;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
