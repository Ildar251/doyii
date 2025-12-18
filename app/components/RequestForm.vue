<script lang="ts" setup>
import { useToast } from 'primevue/usetoast'
import { Field as VField, Form as VForm } from 'vee-validate'

import * as yup from 'yup'

const toast = useToast()

// 2. Схема валидации Yup
const schema = yup.object({
	name: yup.string().required('Имя обязательно для заполнения'),
	organization: yup.string().required('Организация обязательна'),
	email: yup
		.string()
		.required('Email обязателен')
		.email('Неверный формат email'),
	phone: yup
		.string()
		.required('Телефон обязателен')
		.matches(
			/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/, // Строгая проверка маски
			'Телефон должен быть в формате +7 (XXX) XXX-XX-XX'
		),
	file: yup
		.mixed()
		.nullable()
		.test(
			'fileSize',
			'Файл слишком большой (макс. 2МБ)',
			value => !value || (value && (value as File).size <= 2000000) // 2MB
		),
})

// 3. Обработчик отправки формы
const onSubmit = (values: any, { resetForm }: any) => {
	console.log('Данные формы:', {
		...values,
		fileName: values.file?.name,
		fileSize: values.file?.size,
	})

	toast.add({
		severity: 'success',
		summary: 'Успешно!',
		detail: 'Ваша заявка отправлена.',
		life: 3000,
	})

	resetForm()
}

const formatKB = (f?: File) =>
	typeof f?.size === 'number' ? `${(f.size / 1024).toFixed(1)} KB` : ''
</script>

<template>
	<Toast />

	<VForm :validation-schema="schema" @submit="onSubmit" class="form-container">
		<VField name="name" v-slot="{ field, errors, errorMessage }">
			<div class="field">
				<FloatLabel variant="in">
					<InputText
						v-bind="field"
						id="name"
						:invalid="!!errors.length"
						aria-describedby="name-error"
					/>
					<label for="name">Имя</label>
				</FloatLabel>
				<Transition name="error-fade">
					<small
						v-if="errorMessage"
						id="name-error"
						class="p-error error-message"
					>
						{{ errorMessage }}
					</small>
				</Transition>
			</div>
		</VField>

		<VField name="organization" v-slot="{ field, errors, errorMessage }">
			<div class="field">
				<FloatLabel variant="in">
					<InputText
						v-bind="field"
						id="organization"
						:invalid="!!errors.length"
						aria-describedby="org-error"
					/>
					<label for="organization">Организация</label>
				</FloatLabel>
				<Transition name="error-fade">
					<small
						v-if="errorMessage"
						id="name-error"
						class="p-error error-message"
					>
						{{ errorMessage }}
					</small>
				</Transition>
			</div>
		</VField>

		<VField name="email" v-slot="{ field, errors, errorMessage }">
			<div class="field">
				<FloatLabel variant="in">
					<InputText
						v-bind="field"
						id="email"
						type="email"
						:invalid="!!errors.length"
						aria-describedby="email-error"
					/>
					<label for="email">Email</label>
				</FloatLabel>
				<Transition name="error-fade">
					<small
						v-if="errorMessage"
						id="name-error"
						class="p-error error-message"
					>
						{{ errorMessage }}
					</small>
				</Transition>
			</div>
		</VField>

		<VField name="phone" v-slot="{ field, errors, errorMessage }">
			<div class="field">
				<FloatLabel variant="in">
					<InputMask
						v-bind="field"
						id="phone"
						mask="+7 (999) 999-99-99"
						:invalid="!!errors.length"
						aria-describedby="phone-error"
					/>
					<label for="phone">Телефон</label>
				</FloatLabel>
				<Transition name="error-fade">
					<small
						v-if="errorMessage"
						id="name-error"
						class="p-error error-message"
					>
						{{ errorMessage }}
					</small>
				</Transition>
			</div>
		</VField>

		<VField name="file" v-slot="{ value, setValue, errors, errorMessage }">
			<div class="field file-field">
				<FileUpload
					ref="uploader"
					name="userFile"
					:multiple="false"
					:fileLimit="1"
					accept=".pdf,.doc,.docx,image/*"
					:maxFileSize="3_000_000"
					:auto="false"
					:customUpload="true"
					:showUploadButton="false"
					:showCancelButton="false"
					@select="e => setValue(e.files?.[0] ?? null)"
					@clear="() => setValue(null)"
					class="my-fileupload"
				>
					<template #header="{ chooseCallback, clearCallback, files }">
						<div class="fu-header">
							<Button
								size="small"
								outlined
								:icon="files?.length ? 'pi pi-times' : 'pi pi-link'"
								:label="value ? 'Удалить' : 'Выберите файл'"
								@click="files?.length ? clearCallback() : chooseCallback()"
							/>
						</div>
					</template>

					<template #content="{ files, removeFileCallback }">
						<div v-if="files?.length" class="fu-row">
							<i class="pi pi-file" />
							<div class="fu-info">
								<div class="fu-name">{{ files[0]?.name }}</div>
								<small class="fu-size">{{ formatKB(files?.[0]) }}</small>
							</div>
						</div>
						<div v-else class="fu-empty">Прикрепите файл для загрузки.</div>
					</template>
				</FileUpload>

				<Transition name="error-fade">
					<small v-if="errorMessage" class="p-error error-message">
						{{ errorMessage }}
					</small>
				</Transition>
			</div>
		</VField>

		<button
			type="submit"
			label="Отправить заявку"
			class="submit-button btn btn--with-icon icon-light"
		>
			Отправить заявку
		</button>
	</VForm>
</template>

<style lang="scss" scoped>
.btn {
	width: 100%;
	max-width: unset;
}

.form-container {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.field {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;
	position: relative;
	padding-bottom: 1rem;
}

:deep(.p-floatlabel) {
	width: 100%;

	.p-inputtext,
	.p-inputmask {
		width: 100%;
	}
}

.file-field {
}

.p-fileupload {
	@include default-border-radius;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

:deep(.p-fileupload-content) {
	padding: 0;
}

.error-message {
	position: absolute;
	bottom: -0.25rem;
	left: 1.5rem;
	font-size: 0.875rem;
	line-height: 1.3;
	color: var(--p-red-500);
}

.error-fade-enter-active,
.error-fade-leave-active {
	transition: opacity 0.2s ease, transform 0.2s ease;
}

.error-fade-enter-from,
.error-fade-leave-to {
	opacity: 0;
	transform: translateY(-5px); /* Появляется "выпадая" сверху */
}

.error-fade-enter-to,
.error-fade-leave-from {
	opacity: 1;
	transform: translateY(0);
}
.submit-button {
	margin-top: 1rem;
}

.fu-row {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	color: green;
}

.fu-info {
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	gap: 0.5rem;
}

.fu-name {
	font-weight: 500;
	color: var(--p-text-color-secondary);
	max-width: 440px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
