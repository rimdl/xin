import {defineStore} from 'pinia'

export const useDataStore = defineStore('dataStore', {
    state: () => ({ tagsLists: [],categoryLists: [],totalText: 0,totalPapers: 0,buildDays: 0}),
    actions: {
        setTagsLists(tagsLists: []) {
            this.tagsLists = tagsLists
        },
        setCategoryLists(categoryLists: []) {
            this.categoryLists = categoryLists
        },
        setTotalText(totalText: number) {
            this.totalText = totalText
        },
        setTotalPapers(totalPapers: number) {
            this.totalPapers = totalPapers
        },
        setBuildDays(buildDays: number) {
            this.buildDays = buildDays
        }
    },
})