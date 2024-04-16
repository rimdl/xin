import {defineStore} from 'pinia';
import {type paperInter} from "~/types";

export const usePaperStore = defineStore('paperStore', {
    state: () => ({ papers: [],comment_count: 0 ,total_papers:0}),
    actions: {
        setPapers(papers: any) {
            this.papers = papers
        },
        setCommentCount(count:number) {
            this.comment_count = count
        },
        setTotalPapers(count:number){
            this.total_papers = count
        }
    },
})