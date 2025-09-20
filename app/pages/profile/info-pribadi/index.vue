<template>
	<form id="info-pribadi" class="relative px-4 py-8 flex flex-col" @submit="onSubmit">

			<!-- Form Login Password -->
		<div class="flex flex-col gap-5 mb-5">
			<div class="flex flex-col" w-full>
				<PhotoProfile :width="100" :height="100" :image-url="imageUrl" />
				<input ref="fileInput" type="file" accept="image/png, image/jpg, image/jpeg" class="hidden"  @change="handleFileChange">
				<!-- <Button variant="outline-primary" size="sm" type="button" class="w-1/3 m-auto mt-5" @click="triggerFileInput">Upload</Button> -->
				<FormMessageError v-if="errors?.avatar_url" :message="errors?.avatar_url" />
			</div>

			<FormInput
				id="nama"
				v-model="name"
				label-text="Nama"
				:is-required-label="true"
				type="text"
				name="name"
				placeholder="Nama lengkap"
				:error="errors.name"
        :read-only="true"
			/>

			<div class="relative">
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
			</div>

			<FormInput
				id="phone"
				v-model="phone"
				label-text="Nomor Telepon"
				type="text"
				name="phone"
				placeholder="Masukkan nomor telepon"
        :is-required-label="true"
        :is-number="true"
				:error="errors.phone"
        :read-only="true"
			/>

		</div>
	</form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { urlAuthProfile } from '~/constants';
import type { UserResponse } from '~/types/auth/user';

const title = 'Info Pribadi';

definePageMeta({
	layout: 'detail',
	isPaddingTop: true,
	isPaddingBottom: true,
	title: title,
})

useSeoMeta({
	title: title
});

const isLoading = ref(false)
const loadingStore = useLoadingStore();

const authStore = useAuthStore();

// Ambil data user dari store
const user = computed(() => authStore.user);

// Schema validasi Zod (sama seperti sebelumnya)
const schema = z.object({
	name: z.string()
		.min(1, 'Nama lengkap harus diisi')
		.max(50, 'Nama maksimal 50 karakter'),
	email: z.string()
		.min(1, 'Email harus diisi')
		.email('Format email tidak valid'),
	phone: z.string()
		.min(1, 'Nomor telepon harus diisi'),
  avatar_url: z.string().optional()
});

// Setup vee-validate dengan zod schema
const { defineField, handleSubmit, errors, setErrors } = useForm({
	validationSchema: toTypedSchema(schema),
	initialValues: {
		name: '',
		email: '',
		phone: '',
    avatar_url: ''
	},
	validateOnMount: false
})


// Define fields
const [name] = defineField('name')
const [email] = defineField('email')
const [phone] = defineField('phone')

// Handle File

const imageUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const fileInput = ref<HTMLInputElement | null>(null);


const handleFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput?.files ? fileInput.files[0] : null;

  if (file && file.size <= 2 * 1024 * 1024) {
    selectedFile.value = file;
		const reader = new FileReader();
		reader.onload = (e) => {
			imageUrl.value = e.target?.result as string;
		};
		reader.readAsDataURL(selectedFile.value);
  } else {
    notify.error('Ukuran file tidak boleh lebih dari 2MB');
  }
};

const router = useRouter();

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
	loadingStore.start();
	isLoading.value = true

	try {
		const response = await apiLakumanah.post<UserResponse>(urlAuthProfile, {
			avatar_url : selectedFile.value,
			metadata : JSON.stringify({
				"name": values.name,
				"email": values.email,
				"phone": values.phone,
			}),
			_method : 'PUT'
		},undefined,{'Content-Type': 'multipart/form-data'});

		const { data, message } = response;
		notify.success(message);
		authStore.setUser(data?.user);

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


onMounted(() => {

  if (!authStore.user) {
    // Pulihkan user dari cookie jika hilang
    authStore.getUser();
  }
	if(user.value){
		name.value = user.value?.name ?? ''
		email.value = user.value?.email ?? ''
		phone.value = user.value?.phone ?? ''
		imageUrl.value = user.value?.avatar_url
	}
});

</script>
