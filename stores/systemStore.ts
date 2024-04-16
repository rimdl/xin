import {defineStore} from 'pinia'
import {type sysLoginUserInter, type settingsInter, type notificationInter, type paperInter} from "~/types";


export const useSystemStore = defineStore('systemStore', {
    state: () => ({ theme: "",settings: <settingsInter>{},paperHeight: {},nowPaper: <paperInter>{},loginUser:<sysLoginUserInter>{}, loading:false,notification:<notificationInter>{},now_category:"",pinMore:false,music:false ,token:{token:"",exp:0,role:""},refresh_token:""}),
    actions: {
        setTheme(theme: string) {
            this.theme = theme
        },
        setSettings(settings: any) {
            this.settings = settings
        },
        setPaperHeight(paperHeight: any) {
            this.paperHeight = paperHeight
        },
        setNowPaper(nowPaper: any) {
            this.nowPaper = nowPaper
        },
        setLoginUser(loginUser: any) {
            this.loginUser = loginUser
        },
        setLoading(loading: boolean) {
            this.loading = loading
        },
        setNotification(notification: any) {
            this.notification = notification
        },
        setNowCategory(now_category: string) {
            this.now_category = now_category
        },
        setPinMore(pinMore: boolean) {
            this.pinMore = pinMore
        },
        setMusic(music: boolean) {
            this.music = music
        },
        setToken(token:{token:string,exp:number,role:string}){
            this.token = token
        },
        setRefreshToken(refresh_token:string){
            this.refresh_token = refresh_token
        }
    },
})