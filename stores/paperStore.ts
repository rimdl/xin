import {defineStore} from 'pinia'

export const usePaperStore = defineStore('paperStore', {
    state: () => ({ papers: [] }),
    actions: {
        setPapers(papers: []) {
            this.papers = papers
        }
    },
})