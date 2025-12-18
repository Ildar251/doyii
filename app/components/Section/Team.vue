<script lang="ts" setup>
import { Keyboard, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import RightIcon from '~/assets/icons/right.svg'
const modules = [Navigation, Keyboard]

const { find } = useStrapi()

const { data: sectionTeam } = await useAsyncData('section-team', () =>
	find('section-team', {
		populate: {
			section: { populate: ['header', 'button'] },
		} as any,
	})
)

const sectionData = sectionTeam.value?.data as unknown as Sections
const heroTitle = sectionData?.section?.header?.title || ''
const heroDescription = sectionData?.section?.header?.description || ''

const { data: teams } = await useAsyncData('teams', () =>
	find<Team>('teams', {
		fields: ['id', 'fio', 'info'],
		populate: {
			image: true,
		} as any,
		sort: ['createdAt:asc'],
	})
)

const prevEl = ref<HTMLElement | null>(null)
const nextEl = ref<HTMLElement | null>(null)

const onBeforeInit = (swiper: any) => {
	swiper.params.navigation.prevEl = prevEl.value
	swiper.params.navigation.nextEl = nextEl.value
}
</script>

<template>
	<section class="section">
		<div class="container">
			<div class="section__header" v-motion-slide-visible-once-bottom>
				<div class="section__header-row">
					<h2 class="section__title">{{ heroTitle }}</h2>

					<div class="section__nav">
						<button
							ref="prevEl"
							class="nav-btn nav-btn--prev"
							aria-label="Назад"
						>
							<RightIcon class="icon icon--left" aria-hidden="true" />
						</button>
						<button
							ref="nextEl"
							class="nav-btn nav-btn--next"
							aria-label="Вперёд"
						>
							<RightIcon class="icon" aria-hidden="true" />
						</button>
					</div>
				</div>

				<div class="section__description">
					{{ heroDescription }}
				</div>
			</div>

			<ClientOnly>
				<Swiper
					:modules="modules"
					:slides-per-view="1.1"
					:space-between="24"
					:keyboard="{ enabled: true }"
					:navigation="true"
					:breakpoints="{
						560: {
							slidesPerView: 2.3,
							spaceBetween: 24,
						},
						1280: {
							slidesPerView: 3.3,
							spaceBetween: 24,
						},
						1920: { slidesPerView: 4, spaceBetween: 28 },
					}"
					class="teams-swiper"
					@before-init="onBeforeInit"
				>
					<SwiperSlide
						v-for="p in teams?.data"
						:key="p.id"
						v-motion-slide-visible-once-bottom
					>
						<UiCardSlide :title="p.fio" :text="p.info" :url="p.image?.url" />
					</SwiperSlide>
				</Swiper>
			</ClientOnly>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.teams-swiper .swiper-slide {
	height: auto;
}
</style>
