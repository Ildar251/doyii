<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
const strapiUrl = runtimeConfig.public.strapi.url

const props = defineProps<{
	tags?: any
	url?: string
	title?: string
	text?: string
	button?: any
	image_darker?: boolean
	link?: string
}>()
</script>

<template>
	<div class="slide-card">
		<div class="tags">
			<div class="tags__item" v-for="tag in tags">
				{{ tag.text }}
			</div>
		</div>
		<div
			class="slide-card__image"
			:class="image_darker ? 'darker' : ''"
			v-if="url"
		>
			<img :src="url ? strapiUrl + url : `/`" alt="" />
		</div>
		<div class="slide-card__content">
			<h3 class="slide-card__title" v-if="title">
				{{ title || 'Заголовок' }}
			</h3>
			<p class="slide-card__text" v-if="text">{{ text }}</p>

			<NuxtLink class="btn" :to="link" v-if="button">{{ button }}</NuxtLink>

			<!-- <a class="btn" :href="link" v-if="button">{{ button }}</a> -->
		</div>
	</div>
</template>

<style lang="scss" scoped>
.slide-card {
	background: #fff;
	box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	overflow: hidden;
	@include default-border-radius;
	color: var(--p-text-primary);

	&__title {
		font-size: 18px;
		margin: 0 0 8px;

		@media screen and (min-width: 1280px) {
			font-size: 20px;
			margin: 0 0 16px;
		}

		@media screen and (min-width: 1920px) {
			font-size: 28px;
		}
	}

	&__text {
		color: var(--p-text-secondary);
		font-size: 16px;
		line-height: 1.4;
		margin-bottom: 24px;

		@media screen and (min-width: 1280px) {
			margin-bottom: 40px;
			font-size: 18px;
		}
	}

	&__content {
		display: flex;
		flex-direction: column;
		height: 100%;
		@include default-padding;

		.btn {
			margin-top: auto;
		}
	}

	&__image {
		position: relative;
		height: 400px;
		flex: none;

		&.darker {
			&::before {
				content: '';
				display: block;
				background: linear-gradient(
					180deg,
					rgba(20, 20, 20, 0.6) 0%,
					rgba(20, 20, 20, 0) 100%
				);
				width: 100%;
				height: 100%;
				position: absolute;
			}
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.tags {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 4px;
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 1;

		&__item {
			border-radius: 20px;
			border: 1px solid #fff;
			background: rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(6.65px);
			color: #fff;
			padding: 4px 8px;
			font-size: 14px;
		}
	}
}
</style>
