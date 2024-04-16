import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Viewer.setDefaults({
    navbar:false,
    title: false
})
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Viewer)
})