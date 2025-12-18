<script lang="ts" setup></script>

<template>
	<section class="section" id="contacts">
		<div class="container">
			<div class="contacts">
				<div class="contacts__content" v-motion-slide-visible-once-bottom>
					<h2 class="section__title">Контакты</h2>
					<address class="contacts__card">
						<p class="contacts__label">Адрес</p>
						<p class="contacts__text">
							423601, Республика Татарстан, район Елабужский,<br />
							ОЭЗ Алабуга тер., ул. Ш-2, 15
						</p>

						<p class="contacts__label">Телефон:</p>
						<p class="contacts__text">
							<a class="contacts__link" href="tel:+79874006394"
								>+7&nbsp;987&nbsp;400-63-94</a
							>
						</p>

						<p class="contacts__label">Почта:</p>
						<p class="contacts__text">
							<a class="contacts__link" href="mailto:service@alabuga.ru"
								>service@alabuga.ru</a
							>
						</p>
					</address>
				</div>
				<div class="contacts__map" v-motion-slide-visible-once-bottom>
					<iframe
						src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa4350bd78895382d935c58d57e5f30a27ccc1a5cab977cef0d1826e9861556e7&amp;source=constructor"
						width="100%"
						height="400"
						frameborder="0"
					></iframe>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.contacts {
	background-color: #fff;
	@include default-padding;
	@include default-border-radius;
	display: grid;
	grid-template-columns: 1fr;
	@include default-gap;
	color: var(--p-text-primary);

	@media screen and (min-width: 1280px) {
		grid-template-columns: 1fr 1fr;
	}

	&__card {
		margin-top: 1rem;
		font-style: normal; // <address> по умолчанию italic в некоторых браузерах
		display: grid;
		row-gap: 0.5rem;
	}

	&__label {
		font-weight: 700;
		margin: 0.75rem 0 0.25rem;
		font-size: 20px;
	}

	&__text {
		margin: 0;
		line-height: 1.45;
		font-size: 18px;
	}

	&__link {
		color: inherit;
		text-decoration: none;
		border-bottom: 1px solid currentColor;
		padding-bottom: 2px;

		&:hover {
			opacity: 0.8;
		}
		&:focus-visible {
			outline: 2px solid currentColor;
			outline-offset: 2px;
			border-bottom-color: transparent;
		}
	}

	&__map {
		@include default-border-radius;
		overflow: hidden;
	}
}
</style>
