import {defineStore} from 'pinia'
import type {userInfosInter} from "~/types";

export const useDataStore = defineStore('dataStore', {
    state: () => ({ tagsLists: [],categoryLists: [],totalText: 0,totalPapers: 0,totalComments: 0,buildDays: 0,userList:<Array<userInfosInter>>[]}),
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
        setTotalComments(totalComments: number) {
            this.totalComments = totalComments
        },
        setBuildDays(buildDays: number) {
            this.buildDays = buildDays
        },
        setUserInfo(userList:any){
            this.userList = userList
        }
    },
})