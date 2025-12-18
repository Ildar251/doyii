<script lang="ts" setup>
import RightIcon from '~/assets/icons/arrow-button.svg'

type AsTag = 'div' | 'button' | 'a'

const props = withDefaults(
	defineProps<{
		as?: AsTag
		clickable?: boolean
		href?: string
		title?: string
		content?: string
		icon?: string
		variant?: 'liquid' | 'light'
	}>(),
	{
		as: 'div',
		clickable: false,
		variant: 'liquid',
	}
)

const emits = defineEmits<{
	(e: 'click', ev: MouseEvent): void
}>()

const onClick = (e: MouseEvent) => {
	if (!props.clickable && !props.href) return

	emits('click', e)
	console.log('click')
}

const iconUrl = props.icon || '/icons/default-icon.svg'

const { data: svgIcon } = await useFetch<string>(iconUrl, {
	responseType: 'text',
})
</script>

<template>
	<component
		:is="as"
		:href="as === 'a' ? href : undefined"
		@click="onClick"
		class="card"
		:class="{
			'card--liquid': variant === 'liquid',
			'card--light': variant === 'light',
			'card--clickable': clickable || href,
		}"
	>
		<div class="liquidGlass-effect" v-if="variant === 'liquid'"></div>
		<div class="liquidGlass-tint" v-if="variant === 'liquid'"></div>

		<div class="card__icon" v-if="icon">
			<!-- <img :src="icon" alt="" /> -->
			<span v-if="svgIcon" v-html="svgIcon" />
			<div class="card__clickable" v-if="clickable || href">
				<RightIcon class="icon" />
			</div>
		</div>
		<h3 class="card__title" v-if="title">
			{{ title }}
		</h3>
		<div class="card__content" v-if="content">
			{{ content }}
		</div>
		<slot />
	</component>
</template>

<style lang="scss" scoped>
.card {
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;

	transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
	@include default-border-radius;
	@include default-padding;
	@include default-gap;

	&--liquid {
		box-shadow: 0 6px 6px rgba(255, 255, 255, 0.2),
			0 0 20px rgba(255, 255, 255, 0.1);
		&:not(.liquidGlass-effect) > *,
		&:not(.liquidGlass-tint) > * {
			z-index: 2;
		}
	}

	&--light {
		background-color: rgba(255, 255, 255, 1);
		color: #000;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.05);

		.card__icon {
			display: flex;
			align-items: center;
			justify-content: space-between;
			img {
				filter: invert(1);
			}
		}
	}

	&--clickable {
		cursor: pointer;
		&:hover {
			.card__clickable {
				rotate: 45deg;
			}
		}
		.card__clickable {
			width: fit-content;
			transition: $transition;

			svg {
				fill: #fff;
			}
		}
	}

	.card__title {
		font-size: 18px;
		font-weight: 700;

		@media screen and (min-width: 1280px) {
			font-size: 20px;
		}

		@media screen and (min-width: 1920px) {
			font-size: 28px;
		}
	}

	.card__content {
		flex-grow: 1;
		font-size: 16px;
		line-height: 1.5;

		@media screen and (min-width: 1920px) {
			font-size: 18px;
		}
	}
}
</style>
