// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@/assets/index.css'],
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt'
    ],
    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
    },
})
