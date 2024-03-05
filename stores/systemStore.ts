import {defineStore} from 'pinia'

export const useSystemStore = defineStore('systemStore', {
    state: () => ({ theme: "light",settings: {} }),
    actions: {
        setTheme(theme: string) {
            this.theme = theme
        },
        setSettings(settings: string) {
            this.settings = settings
        },
    },
})