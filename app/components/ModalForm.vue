<script lang="ts" setup>
const { isOpen, open, close, toggle } = useRequestModal()
</script>

<template>
	<Dialog
		class="modal modal--form"
		v-model:visible="isOpen"
		modal
		:closable="true"
		:dismissableMask="true"
		:header="'Оставьте заявку на просчёт КП'"
		@hide="close"
	>
		<div class="modal__wrapper">
			<RequestForm />
		</div>
	</Dialog>
</template>

<style lang="scss"></style>
