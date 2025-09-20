<template>
	<form id="forgot-password" class="flex flex-col min-h-screen p-4" @submit="onSubmit">

		<p class="text-sm text=[#171717] mb-5.5">Masukkan email baru Anda, untuk mengubah email yang ada.</p>


		<div class="flex flex-col gap-5">
			<FormInput
				id="email"
				v-model="email"
				label-text="Email"
				:is-required-label="true"
				type="text"
				name="email"
				placeholder="Masukkan alamat email"
				:error="errors.email"
				:read-only="true"
			/>

			<FormInput
				id="email_baru"
				v-model="email_baru"
				label-text="Email Baru"
				:is-required-label="true"
				type="text"
				name="email_baru"
				placeholder="Masukkan alamat email baru"
				:error="errors.email_baru"
			/>
		</div>


		<div class="fixed w-full z-10 bottom-0 left-0 bg-white dark:bg-[#0F172A] shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] py-4">
			<AppContainer>
				<Button class="w-full" type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Kirim' }}</Button>
			</AppContainer>
		</div>
	</form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { urlAuthChangeEmail } from '~/constants';

const title = "Ubah Email";

definePageMeta({
  layout: "detail",
	noPadding: true,
	middleware: 'auth',
	title: title,
});

useSeoMeta({
	title: title,
});

const isLoading = ref(false)
const loadingStore = useLoadingStore();

const authStore = useAuthStore();

// Ambil data user dari store
const user = computed(() => authStore.user);

// Schema validasi Zod (sama seperti sebelumnya)
const schema = z.object({
email: z.string()
  .min(1, 'Email harus diisi')
  .email('Format email tidak valid'),
email_baru: z.string()
	.min(1, 'Email Baru harus diisi')
	.email('Format email baru tidak valid'),
})

// Setup vee-validate dengan zod schema
const { defineField, handleSubmit, errors, setErrors } = useForm({
	validationSchema: toTypedSchema(schema),
	initialValues: {
		email: '',
		email_baru: '',
	}
})

// Define fields dengan vee-validate
const [email] = defineField('email')
const [email_baru] = defineField('email_baru')


// Handle form submission
const onSubmit = handleSubmit(async (values) => {
	loadingStore.start();
	isLoading.value = true

	try {
		const response = await apiLakumanah.post(urlAuthChangeEmail, {
			"new_email": values.email_baru,
		});

		const { message } = response;

		// logout
		notify.success(message);


		// Redirect setelah berhasil

	} catch (error: unknown) {
		handleValidationError(error, setErrors)

		// Handle error (bisa tambahkan toast/notification)
	} finally {
		isLoading.value = false
		loadingStore.stop();
	}
});

// const handleLogout = () => {
//   authStore.logout({ redirectTo: '/auth', callApi: true });
// };

onMounted(() => {

  if (!authStore.user) {
    // Pulihkan user dari cookie jika hilang
    authStore.getUser();
  }
	if(user.value){
		email.value = user.value?.email
	}
});

</script>
