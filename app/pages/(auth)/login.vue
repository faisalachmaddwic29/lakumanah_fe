<template>
	<form id="login" class="relative px-4 py-4 flex flex-col" @submit="onSubmit">

		<NuxtImg src="/images/auth/logo-primary.png" alt="logo" class="size-[180px] mx-auto mb-8" />

		<!-- Form Login Password -->
		<div class="flex flex-col gap-5 mb-5">
			<FormInput
				id="email"
				v-model="email"
				label-text="Email"
				:is-required-label="true"
				type="text"
				name="email"
				placeholder="Masukkan alamat email"
				:error="errors.email"
			/>

			<FormInput
				id="password"
				v-model="password"
				label-text="Kata Sandi"
				:is-required-label="true"
				:is-password="true"
				:is-icon="true"
				icon-position="right"
				:type="showPassword ? 'text' : 'password'"
				name="password"
				placeholder="Masukan Kata Sandi"
				:error="errors.password"
			>
				<template #icon>
					<Icon v-if="showPassword" name="heroicons:eye" class="text-xl text-subtle cursor-pointer" @click="togglePassword" />
					<Icon v-else name="heroicons:eye-slash" class="text-xl text-subtle cursor-pointer" @click="togglePassword" />
				</template>
			</FormInput>
		</div>


		<div class="fixed w-full z-10 bottom-0 left-0 bg-white dark:bg-[#0F172A] shadow-[0px_-2px_4px_rgba(0,0,0,0.05)] py-4">
			<AppContainer>
				<Button class="w-full" type="submit" :disabled="!isFormFull">{{ isLoading ? 'Loading...' : 'Masuk' }}</Button>
				<!-- <NuxtLink to="//registration" class="w-full">Masuk</NuxtLink> -->
			</AppContainer>
		</div>
	</form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { urlAuthLogin } from '~/constants';

const title = 'Masuk Akun';

definePageMeta({
	layout: 'detail',
	noPadding: true,
  middleware: "guest",
	title: title,
})

useSeoMeta({
	title: title
});


const showPassword = ref(false)
const isLoading = ref(false)
const router = useRouter();
const loadingStore = useLoadingStore();
const authStore = useAuthStore();


// Schema validasi Zod (sama seperti sebelumnya)
const schema = z.object({
email: z.string()
  .min(1, 'Email harus diisi')
  .email('Format email tidak valid'),
	password: z.string()
		.min(1, 'Kata Sandi harus diisi')
})

// Setup vee-validate dengan zod schema
const { defineField, values, handleSubmit, errors, setErrors } = useForm({
	validationSchema: toTypedSchema(schema),
	initialValues: {
		email: '',
		password: ''
	}
})

const isFormFull = computed(() => {
  return values.email && values.password
})

// Define fields dengan vee-validate
const [email] = defineField('email')
const [password] = defineField('password')

// Toggle password
const togglePassword = () => {
	showPassword.value = !showPassword.value
}


interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
const appStore = useAppStore();

// Handle form submission
const onSubmit = handleSubmit(async (values) => {

	loadingStore.start();
	isLoading.value = true

	try {
		const response = await apiLakumanah.post<LoginResponse, LoginRequest>(urlAuthLogin, {
			"email": values.email,
			"password": values.password,
		});

		const { data , message } = response;

		  // Simpan token ke cookie dan state
    await authStore.saveToken({
      access_token: data.access_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
    });


		notify.success(message);

		// Redirect setelah berhasil
    appStore.reset();
		await router.replace('/');

	} catch (error: unknown) {
		handleValidationError(error, setErrors)

		// Handle error (bisa tambahkan toast/notification)
	} finally {
		isLoading.value = false
		loadingStore.stop();
	}
});

</script>
