<script setup lang="ts">
import { ref } from 'vue'

const { open } = useRequestModal()

const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)

const items = [
	{ label: 'Услуги', to: '/services' },
	{ label: 'Проекты', to: { path: '/', hash: '#projects' } },
	{ label: 'Преимущества', to: { path: '/', hash: '#advantages' } },
	{ label: 'Контакты', to: { path: '/', hash: '#contacts' } },
]
</script>

<template>
	<header class="header">
		<div class="container header__row">
			<NuxtLink class="logo" to="/">
				<img src="/logo.svg" alt="Логотип" />
			</NuxtLink>

			<nav class="header__navigation" aria-label="Главное меню">
				<ul class="list">
					<li v-for="i in items" :key="i.label" class="list__item">
						<NuxtLink :to="i.to">{{ i.label }}</NuxtLink>
					</li>
				</ul>
			</nav>

			<Button
				severity="secondary"
				class="header__cta btn btn__outline"
				@click="open"
				>Оставить заявку на просчёт КП</Button
			>

			<button
				class="burger"
				aria-label="Открыть меню"
				aria-controls="mobile-drawer"
				:aria-expanded="menuOpen"
				@click="toggleMenu"
			>
				<i class="pi pi-bars" aria-hidden="true" />
			</button>
		</div>
	</header>

	<!-- Мобильное меню -->
	<Drawer
		id="mobile-drawer"
		v-model:visible="menuOpen"
		position="right"
		:pt="{
			root: { class: 'mobile-drawer' },
			content: { class: 'mobile-drawer__content' },
			mask: { class: 'mobile-drawer__mask' },
		}"
	>
		<template #header>
			<div class="logo"><img src="/logo.svg" alt="Логотип" /></div>
		</template>
		<nav class="nav" aria-label="Мобильное меню">
			<ul class="nav__list">
				<li v-for="i in items" :key="i.label" class="nav__item">
					<NuxtLink :to="i.to" @click="closeMenu">{{ i.label }}</NuxtLink>
				</li>
			</ul>
			<button class="btn nav__cta" @click="open">Оставить заявку</button>
		</nav>
	</Drawer>
</template>

<style lang="scss">
.header {
	background-color: rgba(255, 255, 255, 1);
	backdrop-filter: blur(10px);
	padding: 28px 0;
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 99;
	color: var(--p-text-primary);

	&__row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__navigation,
	&__cta {
		display: none;
	}

	.list {
		display: flex;
		gap: 20px;

		@media (min-width: 1920px) {
			gap: 40px;
		}

		&__item a {
			text-decoration: none;
			color: inherit;
			font-weight: 500;
			transition: $transition;

			&:hover {
				color: var(--p-primary-500);
			}
		}
	}

	@media (min-width: 1280px) {
		&__navigation {
			display: block;
		}

		&__cta {
			display: inline-flex;
		}

		.burger {
			display: none;
		}
	}
}

.burger {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 999px;
	cursor: pointer;
}

/* Drawer (мобильное меню) */
.mobile-drawer {
	background-color: rgba(255, 255, 255, 0.6);
	width: 86vw;
	max-width: 360px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
	box-shadow: 0 6px 6px rgba(255, 255, 255, 0.2),
		0 0 20px rgba(255, 255, 255, 0.1);
	@include default-padding;
	@include default-gap;

	.nav__list {
		list-style: none;
		padding: 0;
		margin: 0 0 12px;
	}

	.nav__item a {
		display: block;
		text-decoration: none;
		color: inherit;
		font-weight: 600;
		padding: 10px 0;
	}
	.nav__cta {
		width: 100%;
		margin-top: 8px;
	}
}
</style>
