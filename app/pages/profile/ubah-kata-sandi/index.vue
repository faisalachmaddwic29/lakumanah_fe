<template>
	<form id="ubah-password" class="relative p-4 flex flex-col" @submit="onSubmit">

		<p class="text-sm md:text-base mb-5.5">Kata sandi baru Anda harus berbeda dari Kata sandi yang digunakan sebelumnya</p>
		<div class="flex flex-col gap-5 mb-5">
		<div class="w-full flex flex-col gap-2">
			<FormInput
				id="kata_sandi_lama"
				v-model="kata_sandi_lama"
				label-text="Kata sandi lama"
				:is-required-label="true"
				:is-password="true"
				:is-icon="true"
				icon-position="right"
				:type="showKataSandiLama ? 'text' : 'password'"
				name="kata_sandi_lama"
				placeholder="Masukan kata sandi lama"
				:error="errors.kata_sandi_lama"
			>
				<template #icon>
					<Icon v-if="showKataSandiLama" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="toggleKataSandiLama" />
					<Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="toggleKataSandiLama" />
				</template>
			</FormInput>

			<Button type="button" variant="link" class="font-bold p-0 h-fit text-xs md:text-sm cursor-pointer ml-auto inline-block" @click="$router.push('/forgot-password')">Lupa Kata Sandi</Button>
		</div>

			<FormInput
				id="kata_sandi_baru"
				v-model="kata_sandi_baru"
				:type="showKataSandiBaru ? 'text' : 'password'"
				name="kata_sandi_baru"
				placeholder="Kata sandi baru (min 8 karakter)"
				label-text="Kata sandi baru"
				:is-required-label="true"
				:is-icon="true"
				icon-position="right"
				:error="errors.kata_sandi_baru"
			>
				<template #icon>
					<Icon v-if="showKataSandiBaru" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="toggleKataSandiBaru" />
					<Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="toggleKataSandiBaru" />
				</template>
			</FormInput>

			<FormInput
				id="konfirmasi_kata_sandi_baru"
				v-model="konfirmasi_kata_sandi_baru"
				:type="showKonfirmasiKataSandiBaru ? 'text' : 'password'"
				name="konfirmasi_kata_sandi_baru"
				placeholder="Konfirm Password"
				label-text="Konfirmasi Password"
				:is-required-label="true"
				:is-icon="true"
				icon-position="right"
				:error="errors.konfirmasi_kata_sandi_baru"
			>
				<template #icon>
					<Icon v-if="showKonfirmasiKataSandiBaru" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="toggleKonfirmasiKataSandiBaru" />
					<Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="toggleKonfirmasiKataSandiBaru" />
				</template>
			</FormInput>

		</div>

		<div class="fixed w-full z-10 bottom-0 left-0 bg-grey py-4">
			<AppContainer>
				<Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Simpan' }}</Button>
				<!-- <NuxtLink to="//registration" class="w-full">Masuk</NuxtLink> -->
			</AppContainer>
		</div>
	</form>
</template>


<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { urlAuthChangePassword } from '~/constants';

const title = 'Ubah Kata Sandi';

definePageMeta({
	layout: 'detail',
	isPaddingTop: true,
	middleware: 'auth',
	isPaddingBottom: true,
	title: title,
})

useSeoMeta({
	title: title
});

const router = useRouter();
const isLoading = ref(false)
const loadingStore = useLoadingStore();
const showKataSandiLama = ref(false);
const showKataSandiBaru = ref(false);
const showKonfirmasiKataSandiBaru = ref(false);

// Schema validasi Zod (sama seperti sebelumnya)
const schema = z.object({
	kata_sandi_lama: z.string()
		.min(1, 'Kata sandi lama harus diisi'),
	kata_sandi_baru: z.string()
		.min(1, 'Kata sandi baru harus diisi')
		.min(8, 'Kata sandi baru minimal 8 karakter'),
		// .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password harus mengandung huruf besar, huruf kecil, dan angka'),

	konfirmasi_kata_sandi_baru: z.string()
		.min(1, 'Konfirmasi password harus diisi')
}).refine((data) => data.kata_sandi_baru === data.konfirmasi_kata_sandi_baru, {
	message: 'Konfirmasi password tidak cocok',
	path: ['konfirmasi_kata_sandi_baru']
})

// Setup vee-validate dengan zod schema
const { defineField, handleSubmit, errors, setErrors } = useForm({
	validationSchema: toTypedSchema(schema),
	initialValues: {
		kata_sandi_lama: '',
		kata_sandi_baru: '',
		konfirmasi_kata_sandi_baru: ''
	},
	validateOnMount: false
})

// Define fields
const [kata_sandi_lama] = defineField('kata_sandi_lama')
const [kata_sandi_baru] = defineField('kata_sandi_baru')
const [konfirmasi_kata_sandi_baru] = defineField('konfirmasi_kata_sandi_baru')

// Toggle password
const toggleKataSandiLama = () => {
	showKataSandiLama.value = !showKataSandiLama.value
}

const toggleKataSandiBaru = () => {
	showKataSandiBaru.value = !showKataSandiBaru.value
}

// Toggle confirm password visibility
const toggleKonfirmasiKataSandiBaru = () => {
	showKonfirmasiKataSandiBaru.value = !showKonfirmasiKataSandiBaru.value
}



// Handle form submission
const onSubmit = handleSubmit(async (values) => {
	loadingStore.start();
	isLoading.value = true

	try {
		const response = await apiLakumanah.post(urlAuthChangePassword, {
		  "old_password": values.kata_sandi_lama,
			"new_password": values.kata_sandi_baru,
			"new_password_confirmation": values.konfirmasi_kata_sandi_baru,
		});

		const { message } = response;
		notify.success(message);

		// Redirect setelah berhasil
		await router.replace('/profile');


	} catch (error: unknown) {
		handleValidationError(error, setErrors)

		// Handle error (bisa tambahkan toast/notification)
	} finally {
		isLoading.value = false
		loadingStore.stop();
	}
});

</script>
