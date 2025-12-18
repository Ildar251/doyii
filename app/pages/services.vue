<script lang="ts" setup>
import Dialog from 'primevue/dialog'
const runtimeConfig = useRuntimeConfig()
const strapiUrl = runtimeConfig.public.strapi.url
const { find } = useStrapi()
const { data: services } = await useAsyncData('services-page', () =>
	find<Service>('services', {
		fields: ['id', 'title', 'shortText', 'content'],
		populate: {
			icon: true,
			image: true,
		} as any,
		sort: ['createdAt:asc'],
	})
)

const dialogVisible = ref(false)
const selectedService = ref<Service | null>(null)

const dialogRef = ref<InstanceType<typeof Dialog> | null>(null)

const openModal = (service: Service) => {
	selectedService.value = service
	dialogVisible.value = true
}

const closeModal = () => {
	dialogVisible.value = false
	selectedService.value = null
}

const nuxtApp = useNuxtApp()
const renderedContent = computed(() =>
	nuxtApp.$markdown(selectedService.value?.content)
)
</script>

<template>
	<div class="page">
		<section class="section section-services">
			<div class="container">
				<div class="section__header" v-motion-slide-visible-once-bottom>
					<h1 class="h1">Услуги</h1>
				</div>

				<div class="wrapper">
					<UiCard
						v-motion-slide-visible-once-bottom
						:clickable="true"
						v-for="(s, i) in services?.data"
						:key="s.id"
						:icon="s.icon?.url ? strapiUrl + s.icon.url : `/icons/${i + 1}.svg`"
						:title="s.title"
						:content="s.shortText || ''"
						variant="light"
						@click="openModal(s)"
					/>

					<Dialog
						class="modal"
						ref="dialogRef"
						v-model:visible="dialogVisible"
						modal
						:closable="true"
						:dismissableMask="true"
						:header="selectedService?.title"
					>
						<div class="modal__wrapper">
							<div
								class="modal__content content"
								v-html="renderedContent"
							></div>

							<div class="modal__image">
								<img
									:src="
										selectedService?.image?.url
											? strapiUrl + selectedService?.image.url
											: `/`
									"
									alt=""
								/>
							</div>
						</div>
					</Dialog>
				</div>
			</div>
		</section>
		<SectionForm />
		<SectionContacts />
	</div>
</template>

<style lang="scss" scoped></style>
