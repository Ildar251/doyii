<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
const strapiUrl = runtimeConfig.public.strapi.url
const { find } = useStrapi()

const { data: sectionAdvantages } = await useAsyncData(
	'section-advantage',
	() =>
		find('section-advantage', {
			populate: {
				section: {
					populate: ['header', 'button'],
				},
				advantages_items: {
					populate: ['icon'],
				},
			} as any,
		})
)

const sectionData = sectionAdvantages.value?.data as unknown as Sections
const sectionTitle = sectionData?.section?.header?.title || 'Наши преимущества'
const advantagesItems = sectionData?.advantages_items || []
console.log(advantagesItems)
</script>

<template>
	<section class="section" id="advantages">
		<div class="container">
			<div class="section__header" v-motion-slide-visible-once-bottom>
				<h2 class="section__title">{{ sectionTitle }}</h2>
			</div>

			<div class="wrapper">
				<UiCard
					v-motion-slide-visible-once-bottom
					v-for="(s, i) in advantagesItems"
					:key="s.id"
					:icon="s.icon?.url ? strapiUrl + s.icon.url : `/icons/${i + 1}.svg`"
					:title="s.title"
					:variant="'light'"
				/>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
