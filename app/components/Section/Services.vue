<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
const strapiUrl = runtimeConfig.public.strapi.url
const props = defineProps<{
	pageSize?: number
}>()

const { find } = useStrapi()

const { data: sectionService } = await useAsyncData('section-service', () =>
	find('section-service', {
		populate: { section: { populate: ['header', 'button'] } } as any,
	})
)
const sectionData = sectionService.value?.data as unknown as Sections
const sectionTitle = sectionData?.section?.header?.title || 'Services'
const buttonLink = sectionData?.section?.button?.link || '#'
const buttonText = sectionData?.section?.button?.text || 'Learn More'

const { data: services } = await useAsyncData('services', () =>
	find<Service>('services', {
		fields: ['id', 'title', 'content'],
		populate: {
			icon: true,
		} as any,
		sort: ['createdAt:asc'],
		pagination: {
			page: 1,
			pageSize: props.pageSize || 99,
		},
	})
)
</script>

<template>
	<section class="section">
		<div class="container">
			<div class="section__header" v-motion-slide-visible-once-bottom>
				<h2 class="section__title">{{ sectionTitle }}</h2>
			</div>
			<div class="wrapper">
				<UiCard
					v-motion-slide-visible-once-bottom
					v-for="(s, i) in services?.data"
					:key="s.id"
					:icon="s.icon?.url ? strapiUrl + s.icon.url : `/icons/${i + 1}.svg`"
					:title="s.title"
					:content="s.content?.[0]?.children?.[0]?.text || ''"
					:variant="'light'"
				/>
			</div>

			<NuxtLink
				v-motion-slide-visible-once-bottom
				:to="buttonLink"
				class="btn btn--accent btn--with-icon btn--center btn--mt"
				>{{ buttonText }}
			</NuxtLink>
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
