import {defineStore} from 'pinia'

export const useAdminStore = defineStore('adminStore', {
    state: () => ({ nowPage:'home',isLoggedIn:false,editPaperId:"" }),
    actions: {
        setNowPage(page:string){
            this.nowPage = page
        },
        setEditPaperId(id:string){
            this.editPaperId = id
        }
    },
})