import {defineStore} from 'pinia'
import {type topicsInter} from "~/types";

export const useTopicStore = defineStore('topicStore', {
    state: ():{topics: topicsInter[]} => ({ topics: [] }),
    actions: {
        setTopics(topics: any) {
            this.topics = topics
        }
    },
})