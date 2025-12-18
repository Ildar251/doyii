<script lang="ts" setup></script>

<template>
	<section class="section">
		<div class="container">
			<div class="section__form" v-motion-slide-visible-once-bottom>
				<div class="section__header">
					<h2 class="section__title">Оставьте заявку на просчёт КП</h2>
					<div class="section__description">
						Менеджер свяжется с вами в ближайшее время
					</div>
				</div>
				<RequestForm />
			</div>
			<div class="section__image" v-motion-slide-visible-once-bottom>
				<img src="/assets/form_image.webp" alt="" loading="lazy" />
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.section {
	.container {
		display: grid;
		grid-template-columns: 1fr;
		@include default-gap;

		@media screen and (min-width: 1280px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	&--accent {
		:deep(.error-message) {
			color: #fff;
		}
	}
}

.section__title {
	text-align: left;
}
.section__description {
	color: var(--p-text-secondary);
}

.section__form {
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
	background-color: #fff;
	color: var(--p-text-primary);
	box-shadow: 0 6px 6px rgba(255, 255, 255, 0.2),
		0 0 20px rgba(255, 255, 255, 0.1);
	transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
	@include default-border-radius;
	@include default-padding;
}

.section__image {
	justify-content: center;
	align-items: center;
	overflow: hidden;
	@include default-border-radius;
	display: none;

	@media screen and (min-width: 1280px) {
		display: flex;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>
