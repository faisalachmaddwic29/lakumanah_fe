import tailwindcss from '@tailwindcss/vite'
// import fs from 'node:fs'
// import path from 'node:path'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/google-fonts',
    '@vite-pwa/nuxt',
  ],
  googleFonts: {
    families: {
      Manrope: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Lato: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      "Nunito Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
    },
  },
  plugins: ['~/plugins/pinia.ts'], // Pastikan file ini terdaftar
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "~/components/ui"
     */
    componentDir: '~/components/ui'
  },
  css: ['~/assets/css/tailwind.css', 'vue-sonner/style.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      sourcemap: false, // Matikan sourcemap untuk build production
    },
  },
  components: {
    dirs: [
      {
        path: '~/components/Base',
        pathPrefix: true,
      },
    ],
  },
  imports: {
    dirs: ['stores/**', 'utils', 'constants', 'types'],
    autoImport: true,
  },
  future: {
    typescriptBundlerResolution: true,
  },
  experimental: {
    payloadExtraction: false,
    watcher: 'parcel',
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      routes: ['/'],

    },
  },
  pwa: {
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    strategies: 'generateSW', // ✅ biarin auto
    // injectManifest: {
    // 	swSrc: 'service-worker/sw.js'
    // },
    // strategies: 'injectManifest',
    // srcDir: 'service-worker',
    // filename: 'sw.ts',
    // ⛔️ BUKAN DI DALAM `workbox`
    // navigateFallback: false, // ✅ Ini wajib ada DI SINI kalau pakai injectManifest
    manifest: {
      id: 'Lakumanah',
      description: 'Lakumanah',
      name: 'Lakumanah',
      short_name: 'Lakumanah',
      theme_color: '#215D66',
      background_color: '#FFF',
      start_url: '/',        // ini juga penting untuk manifest
      display: 'standalone', // pastikan properti ini ada
      orientation: "portrait",
      lang: "id",
      // Tambahkan edge_side_panel untuk pengalaman yang lebih baik
      edge_side_panel: {
        preferred_width: 412
      },
      protocol_handlers: [
        {
          protocol: 'web+Lakumanah',
          url: '/handle-protocol?q=%s'
        }
      ],
      screenshots: [
        {
          src: "/favicon/screenshots/home.png",
          sizes: "512x512",
          type: "image/png",
          form_factor: "wide",
          label: "Lakumanah - Wide"
        },
        {
          src: "/favicon/screenshots/home.png",
          sizes: "512x512",
          type: "image/png",
          form_factor: "narrow",
          label: "Lakumanah - Mobile"
        }
      ],
      icons: [
        // Standard icons
        {
          src: "/favicon/android/android-launchericon-48-48.png",
          sizes: "48x48",
          type: "image/png"
        },
        {
          src: "/favicon/android/android-launchericon-72-72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/favicon/android/android-launchericon-96-96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/favicon/ios/144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/favicon/android/android-launchericon-192-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        // Tambahkan icon yang lebih besar dan maskable
        {
          src: "/favicon/ios/256.png",
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: "/favicon/android/android-launchericon-512-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "/favicon/android/android-launchericon-512-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ],
    },
    workbox: {
      navigateFallback: undefined,
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      clientsClaim: true,
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      globIgnores: ['_nuxt/builds/**/*.json'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
  // Untuk dev tolong jalanin sekali aja
  // hooks: {
  //   'build:before': () => {
  //     const manifest = {
  //       id: 'Lakumanah',
  //       description: 'Lakumanah',
  //       name: 'Lakumanah',
  //       short_name: 'Lakumanah',
  //       theme_color: '#215D66',
  //       background_color: '#FFF',
  //       start_url: '/',        // ini juga penting untuk manifest
  //       display: 'standalone', // pastikan properti ini ada
  //       orientation: "portrait",
  //       lang: "id",
  //       // Tambahkan edge_side_panel untuk pengalaman yang lebih baik
  //       edge_side_panel: {
  //         preferred_width: 412
  //       },
  //       protocol_handlers: [
  //         {
  //           protocol: 'web+Lakumanah',
  //           url: '/handle-protocol?q=%s'
  //         }
  //       ],
  //       screenshots: [
  //         {
  //           src: "/favicon/screenshots/home.png",
  //           sizes: "512x512",
  //           type: "image/png",
  //           form_factor: "wide",
  //           label: "Lakumanah - Wide"
  //         },
  //         {
  //           src: "/favicon/screenshots/home.png",
  //           sizes: "512x512",
  //           type: "image/png",
  //           form_factor: "narrow",
  //           label: "Lakumanah - Mobile"
  //         }
  //       ],
  //       icons: [
  //         // Standard icons
  //         {
  //           src: "/favicon/android/android-launchericon-48-48.png",
  //           sizes: "48x48",
  //           type: "image/png"
  //         },
  //         {
  //           src: "/favicon/android/android-launchericon-72-72.png",
  //           sizes: "72x72",
  //           type: "image/png",
  //         },
  //         {
  //           src: "/favicon/android/android-launchericon-96-96.png",
  //           sizes: "96x96",
  //           type: "image/png",
  //         },
  //         {
  //           src: "/favicon/ios/144.png",
  //           sizes: "144x144",
  //           type: "image/png",
  //         },
  //         {
  //           src: "/favicon/android/android-launchericon-192-192.png",
  //           sizes: "192x192",
  //           type: "image/png",
  //         },
  //         // Tambahkan icon yang lebih besar dan maskable
  //         {
  //           src: "/favicon/ios/256.png",
  //           sizes: "256x256",
  //           type: "image/png",
  //         },
  //         {
  //           src: "/favicon/android/android-launchericon-512-512.png",
  //           sizes: "512x512",
  //           type: "image/png",
  //           purpose: "any"
  //         },
  //         {
  //           src: "/favicon/android/android-launchericon-512-512.png",
  //           sizes: "512x512",
  //           type: "image/png",
  //           purpose: "maskable"
  //         }
  //       ],
  //     };

  //     // Path ke file manifest.json di direktori public
  //     const manifestPath = path.resolve(process.cwd(), './public/manifest.json');

  //     // Buat direktori public jika belum ada
  //     if (!fs.existsSync(path.dirname(manifestPath))) {
  //       fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  //     }

  //     // Tulis manifest.json ke folder public
  //     fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  //     console.log('✅ Manifest generated at ./public/manifest.json');
  //   },
  // },
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      // user-scalable=no,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=1' },
        { name: 'description', content: 'Lakumanah' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'application-name', content: 'Lakumanah' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/favicon/android/android-launchericonicon-144-144.png' },
        { name: 'theme-color', content: '##215D66' }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/ios/57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/ios/60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/ios/72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/ios/76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/ios/114x.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/ios/120x.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/ios/144x.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/ios/152x.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/ios/180x.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/ios/16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/ios/32.png' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon/android/android-launchericonicon-48-48.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/android/android-launchericonicon-96-96.png' },
        { rel: 'icon', type: 'image/png', sizes: '144x144', href: '/favicon/android/android-launchericonicon-144-144.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android/android-launchericonicon-192-192.png' },
        { rel: 'manifest', href: '/manifest.json' } // Pastikan file ini valid!

      ]
    }
  }
})
