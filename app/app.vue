<template>
	<Body>
		<DialogProvider>
			<NuxtLoadingIndicator color="var(--color-primary)" />
			<Toaster position="top-center" :close-butt="true" :rich-colors="true" />
			<AppLoading />
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</DialogProvider>
	</Body>
</template>
