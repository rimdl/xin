import {useAdminStore} from "~/stores/adminStore";
import {useSystemStore} from "~/stores/systemStore";
import config from "~/public/config.json";
import {useToast} from "vue-toastification";

const toast = useToast();
const baseUrl = config.baseUrl;
const systemStore = useSystemStore();


export default defineNuxtRouteMiddleware(async (to, from) => {


    const response = await fetch(baseUrl + "/admin",{
        method:"GET",
        headers:{
            "Authorization": "Bearer "+systemStore.token.token
        }
    })
    const data = await response.json();
    if (response.status !== 200){
        if (response.status == 401){
            toast.error("未登录或登录过期")
        }
        else{
            toast.error(`出现错误：${response.status}`)
        }
        return navigateTo("/login")
    }
    if (data.role === 'user'){
        toast.error("你没有权限访问此页面！")
        return navigateTo("/")
    }
    console.log("200")
})