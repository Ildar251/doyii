<script lang="ts" setup></script>

<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__bottom">
				<div class="column">
					<p>АО „ОЭЗ ППТ «Алабуга»</p>
					<p>ИНН 1646019914</p>
					<p>ОГРН 1061674037259</p>
				</div>

				<div class="footer__links">
					<NuxtLink to="/cookie" class="link-underline">Куки</NuxtLink>
					<NuxtLink to="/privacy-policy" class="link-underline"
						>Политика конфиденциальности</NuxtLink
					>
				</div>

				<div class="column">
					<p>
						423601, Республика Татарстан, район Елабужский,
						ОЭЗ Алабуга тёр., ул.. Ш-2, 15
					</p>
					<a href="mailto:service@alabuga.ru">service@alabuga.ru</a>
					<p>(c) ОЭЗ ППТ «Алабуга», все права защищены.</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	background-color: var(--p-primary-900);
	padding: 40px 0 40px;
	color: #fff;

	@media screen and (min-width: 1280px) {
		padding: 40px 0 80px;
	}

	&__bottom {
		display: flex;
		justify-content: space-between;

		flex-direction: column;
		@include default-gap;

		@media screen and (min-width: 1280px) {
			flex-direction: row;
			align-items: center;
		}
	}
}

.column {
	display: flex;
	flex-direction: column;
	gap: 12px;
	max-width: 380px;
}

.footer__links {
	display: flex;
	gap: 12px;
}
</style>
