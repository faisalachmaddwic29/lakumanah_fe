import { ref, onMounted, onBeforeUnmount } from 'vue'

export function usePwaInstall() {
  const deferredPrompt = ref<Event | null>(null)
  const isInstallable = ref(false)

  const handleBeforeInstallPrompt = (e: Event) => {
    e.preventDefault()
    deferredPrompt.value = e
    isInstallable.value = true
  }

  const promptInstall = async () => {
    if (!deferredPrompt.value) return

    // @ts-ignore → event type belum ada di TS
    deferredPrompt.value.prompt()
    // @ts-ignore
    const choice = await deferredPrompt.value.userChoice

    if (choice.outcome === 'accepted') {
      console.log('✅ User accepted the install')
    } else {
      console.log('❌ User dismissed the install')
    }

    deferredPrompt.value = null
    isInstallable.value = false
  }

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  })

  return {
    isInstallable,
    promptInstall
  }
}
