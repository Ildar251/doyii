<script lang="ts" setup>
const strapiUrl = useRuntimeConfig().public.strapi.url
const route = useRoute()
const { find } = useStrapi()
const defaultSlug = route.params.slug

import AboutProjectsIcon from '~/assets/icons/about-projects.svg'
import ResultIcon from '~/assets/icons/result-icon.svg'
import WhatDoneIcon from '~/assets/icons/what-done.svg'

const slug = Array.isArray(defaultSlug) ? defaultSlug[0] : defaultSlug

const { data: projectsResponse, error } = await useAsyncData(
	`project-${slug}`,
	() =>
		find<Project>('projects', {
			filters: {
				slug: {
					$eq: slug,
				},
			},
			populate: {
				image: true,
				projects_tags: true,
			} as any,
		})
)

if (error.value) {
	throw createError({
		statusCode: 500,
		statusMessage: 'Ошибка загрузки проекта',
		fatal: true,
	})
}

const project = computed(() => {
	return projectsResponse.value?.data?.[0]
})

const title = computed(() => {
	return project.value?.title
})

const text = computed(() => {
	return project.value?.text
})

const image = computed(() => {
	return project.value?.image?.url
})

const nuxtApp = useNuxtApp()

const about = computed(() => nuxtApp.$markdown(project.value?.about ?? ''))
const whatDone = computed(() =>
	nuxtApp.$markdown(project.value?.what_done ?? '')
)
const result = computed(() => nuxtApp.$markdown(project.value?.result ?? ''))
</script>

<template>
	<div class="page" v-if="project">
		<section class="section section-hero">
			<div class="container">
				<div class="section__content" v-motion-slide-visible-once-bottom>
					<h1 class="page__title">{{ title }}</h1>
					<div class="page__description">
						<p>{{ text }}</p>
					</div>
				</div>
				<div class="section__image" v-motion-slide-visible-once-bottom>
					<img :src="image ? image : `/`" alt="" />
				</div>
			</div>
		</section>
		<section class="section">
			<div class="container">
				<div class="project">
					<div class="project__item" v-motion-slide-visible-once-bottom>
						<div class="icon">
							<AboutProjectsIcon />
						</div>
						<h2 class="h2">О проекте</h2>
						<div class="content" v-html="about"></div>
					</div>
					<div class="project__item" v-motion-slide-visible-once-bottom>
						<div class="icon">
							<WhatDoneIcon />
						</div>
						<h2 class="h2">Что было сделано</h2>
						<div class="content" v-html="whatDone"></div>
					</div>
					<div class="project__item" v-motion-slide-visible-once-bottom>
						<div class="icon">
							<ResultIcon />
						</div>
						<h2 class="h2">Результат</h2>
						<div class="content" v-html="result"></div>
					</div>
				</div>
			</div>
		</section>
		<sectionForm />
		<sectionContacts />
	</div>
	<div class="page" v-else>
		<section class="section">
			<div class="container">
				<h1>Проект не найден</h1>
			</div>
		</section>
	</div>
</template>

<style lang="scss" scoped>
.section-hero {
	.container {
		display: grid;
		grid-template-columns: 1fr;
		@include default-gap;

		@media screen and (min-width: 1280px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.section__image {
		@include default-border-radius;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
		}
	}
}

.project {
	display: grid;
	grid-template-columns: 1fr;
	@include default-gap;

	@media screen and (min-width: 1280px) {
		grid-template-columns: 1fr 1fr;
	}

	&__item {
		@include default-border-radius;
		@include default-padding;
		background-color: #fff;
		color: var(--p-text-primary);

		&:last-child {
			@media screen and (min-width: 1280px) {
				grid-column: 1 / 3;
			}
		}

		.h2 {
			margin-top: 40px;
		}
	}
}

.content {
	margin-top: 20px;
	font-size: 16px;
	line-height: 1.2;

	@media screen and (min-width: 1280px) {
		font-size: 18px;
	}

	@media screen and (min-width: 1920px) {
		font-size: 20px;
	}
}
</style>
