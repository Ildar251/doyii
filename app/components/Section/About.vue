<script lang="ts" setup>
const { open } = useRequestModal()

const { find } = useStrapi()

const { data: sectionAbout } = await useAsyncData('section-about', () =>
	find('section-about', {
		populate: {
			section: { populate: ['header', 'button'] },
			image: true,
			about_items: true,
		} as any,
	})
)

const sectionData = sectionAbout.value?.data as unknown as Sections
const aboutTitle = sectionData?.section?.header?.title || ''
const aboutDescription = sectionData?.section?.header?.description || ''
const aboutImage = sectionData?.image?.url || ''
const aboutItems = sectionData?.about_items || []
const aboutButton = sectionData?.section?.button || {}
</script>

<template>
	<section class="section about">
		<div class="container">
			<div class="about__main">
				<div class="section__header" v-motion-slide-visible-once-bottom>
					<h2 class="section__title">{{ aboutTitle }}</h2>

					<div class="section__description">{{ aboutDescription }}</div>
				</div>
				<div class="about__image">
					<img :src="aboutImage" alt="" />
				</div>
			</div>
			<div class="about__blocks">
				<div
					class="about__blocks-item"
					v-motion-slide-visible-once-bottom
					v-for="item in aboutItems"
				>
					<div class="about__blocks-num">{{ item.num }}</div>
					<div class="about__blocks-text">
						{{ item.text }}
					</div>
				</div>
			</div>
		</div>

		<Button
			v-motion-slide-visible-once-bottom
			as="button"
			@click="open"
			class="btn btn--center btn--mt btn--accent"
			>{{ aboutButton?.text || 'Оставить заявку' }}</Button
		>
	</section>
</template>

<style lang="scss" scoped>
.section__description {
	color: var(--p-text-secondary);
}
.about {
	.container {
		display: grid;
		grid-template-columns: 1fr;
		@include default-gap;

		@media screen and (min-width: 1280px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	&__main {
		background-color: #fff;
		color: var(--p-text-primary);
		@include default-padding;
		@include default-border-radius;
	}

	&__blocks {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: var(--p-text-primary);
		@include default-gap;

		&-item {
			background-color: #fff;
			@include default-padding;
			@include default-border-radius;
		}

		&-num {
			font-size: 40px;

			@media screen and (min-width: 1280px) {
				font-size: 60px;
			}

			@media screen and (min-width: 1920px) {
				font-size: 80px;
			}
		}

		&-text {
			margin-top: 16px;
			font-size: 18px;
			color: var(--p-text-secondary);
		}
	}
}
</style>
