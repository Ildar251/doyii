<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
const strapiUrl = runtimeConfig.public.strapi.url
const { find } = useStrapi()

const { data: sectionClients } = await useAsyncData('section-client', () =>
	find('section-client', {
		populate: {
			section: {
				populate: ['header'],
			},
			clients: true,
		} as any,
	})
)

const sectionData = sectionClients.value?.data as unknown as Sections
const sectionTitle = sectionData?.section?.header?.title || ''
const sectionDescription = sectionData?.section?.header?.description || ''
const clientsItems = sectionData?.clients || []
</script>

<template>
	<section class="section">
		<div class="container">
			<div class="section__header" v-motion-slide-visible-once-bottom>
				<h2 class="section__title">{{ sectionTitle }}</h2>
				<div class="section__description">
					{{ sectionDescription }}
				</div>
			</div>
		</div>

		<NuxtMarquee
			:autoFill="true"
			class="clients"
			v-motion-slide-visible-once-bottom
		>
			<div v-for="slide in clientsItems" :key="slide.id" class="clients__item">
				<img :src="strapiUrl + slide?.url" />
			</div>
		</NuxtMarquee>
	</section>
</template>

<style lang="scss" scoped>
.clients {
	gap: 16px;

	&__item {
		background-color: #fff;
		@include default-border-radius;
		width: 138px;
		height: 130px;
		display: flex;
		align-items: center;
		justify-content: center;

		@media screen and (min-width: 1280px) {
			width: 313px;
			height: 229px;

			img {
				scale: 1.5;
			}
		}
	}

	:deep(.vfm-parent) {
		gap: 16px;
	}
}
</style>
