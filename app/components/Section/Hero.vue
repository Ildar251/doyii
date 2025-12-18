<script lang="ts" setup>
const { open } = useRequestModal()

const { find } = useStrapi()
const { data: sectionHero } = await useAsyncData('section-hero', () =>
	find('section-hero', {
		populate: {
			section: { populate: ['header', 'button'] },
			poster: true,
			video: true,
		} as any,
	})
)

const sectionData = sectionHero.value?.data as unknown as Sections
const heroTitle = sectionData?.section?.header?.title || ''
const heroDescription = sectionData?.section?.header?.description || ''
const buttonLink = sectionData?.section?.button?.link || '#'
const buttonText = sectionData?.section?.button?.text || ''
const heroPosterUrl = sectionData?.poster?.url || ''
const heroVideoUrl = sectionData?.video?.url || ''
</script>

<template>
	<section class="hero" role="region" aria-label="Хедер">
		<div class="hero__media" aria-hidden="true">
			<video
				class="hero__video"
				autoplay
				muted
				loop
				playsinline
				preload="metadata"
				:poster="heroPosterUrl"
			>
				<source :src="heroVideoUrl" type="video/webm" />
				<img :src="heroPosterUrl" alt="Фоновая картинка" />
			</video>
		</div>

		<div class="hero__overlay"></div>

		<div class="container">
			<div class="hero__content">
				<h1 class="h1">
					{{ heroTitle }}
				</h1>
				<div class="description">
					<p>
						{{ heroDescription }}
					</p>
				</div>
				<Button as="button" @click="open" class="btn">{{ buttonText }}</Button>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.hero {
	position: relative;
	height: 100svh;
	overflow: hidden;
	display: flex;
	align-items: center;
	color: #fff;
}

.hero__media {
	position: absolute;
	inset: 0;
	z-index: 0;
	pointer-events: none;
	background: #000;
}

.hero__video {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	display: block;
}

.hero__overlay {
	position: absolute;
	inset: 0;
	z-index: 1;
	background: linear-gradient(180deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
	pointer-events: none;
}

.hero__content {
	position: relative;
	z-index: 2;
	max-width: 820px;

	.description {
		line-height: 1.3;
		margin-top: 24px;
		font-size: 16px;
		max-width: 544px;

		@media screen and (min-width: 768px) {
			font-size: 18px;
		}

		@media screen and (min-width: 1920px) {
			font-size: 20px;
		}
	}

	.btn {
		margin-top: 40px;
	}
}
</style>
