<template>
  <div :data-theme="systemStore.theme" class="relative">
    <div :class="route.path === '/admin'?'h-16':'fixed w-full top-0 left-0 z-50 h-16'" ref="HeaderDiv">
      <LayoutsHeader/>
    </div>
    <div class="h-16" v-if="route.path !== '/' && route.path !== '/admin'"></div>
    <div :style="pageStyle">
      <NuxtPage />
    </div>
    <div ref="footerDiv" v-if="route.path !== '/admin'">
      <LayoutsFooter/>
    </div>
    <div class="fixed bottom-1 right-1 z-40">
      <SideBar/>
    </div>
    <transition name="my_bounce" mode="out-in">
      <div v-if="systemStore.loading" class="fixed top-0 left-0 w-full h-screen z-40 flex justify-center items-center">
        <svg class="animate-spin w-20 fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-opacity=".9" d="M12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75v-2.437A7.312 7.312 0 1 1 19.313 12h2.437c0-5.384-4.366-9.75-9.75-9.75"/></svg>
      </div>
    </transition>
  </div>
  <div class="toast toast-start">
    <div class="alert" :class="item.type" v-for="(item,index) in notifications">
      <span>{{ item.msg }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useSystemStore} from "~/stores/systemStore";
import {usePaperStore} from "~/stores/paperStore";
import {useDataStore} from "~/stores/dataStore";
import {useAdminStore} from "~/stores/adminStore";
import {getPapers} from "~/utils/getPapers";
import {getDatas} from "~/utils/getDatas";
import {getSystemSettings} from "~/utils/getSystemSettings";
import {useRoute} from "vue-router";
import config from "./public/config.json"
import {useElementSize} from "@vueuse/core";
import type {notificationInter} from "~/types";
import {checkAndRefreshToken} from "~/utils/tokenTool";
import {useToast} from "vue-toastification";

const toast = useToast()
const route = useRoute();
const systemStore = useSystemStore();
const paperStore = usePaperStore();
const dataStore = useDataStore();
const adminStore = useAdminStore();

const footerDiv = ref<HTMLDivElement>()
const HeaderDiv = ref<HTMLDivElement>()

const footerDivWH = useElementSize(footerDiv)
const HeaderDivWH = useElementSize(HeaderDiv)
const notifications = ref<notificationInter[]>([])

const baseUrl = config.baseUrl

const pageStyle = computed(() =>{
  let subH = 0;
  if (route.path === "/"){
    subH = footerDivWH.height.value;
  }
  else {
    subH = footerDivWH.height.value+HeaderDivWH.height.value;
  }
  return "min-height:calc(100vh - " + subH + "px);";
})
let timer:NodeJS.Timeout;

onBeforeMount(()=>{
  const localToken = localStorage.getItem("token");
  const localRefreshToken = localStorage.getItem("refresh_token");
  if (localToken){
    systemStore.setToken(JSON.parse(localToken));
  }
  if (localRefreshToken){
    systemStore.setRefreshToken(localRefreshToken);
  }
})
onMounted(async () => {
  timer = setInterval(() => {
    checkAndRefreshToken(systemStore.refresh_token,systemStore.token).then((res:any)=>{
      if (res){
        console.log("已过期,新token：",res)
        systemStore.setToken(res)
      }
      else{
        console.log("未到过期时间",res)
      }
    });
  }, 2*60*1000);
  fetch(baseUrl+"/api/users/getusers").then(res=>{
    if (res.ok){
      res.json().then((data)=>{
        dataStore.setUserInfo(data)
      })
    }
  })
  fetch(baseUrl+"/api/comments").then((res)=>{
    res.json().then((data)=>{
      dataStore.setTotalComments(data)
    })
  })
  let papers = await getPapers(baseUrl+"/api/papers/getpaperslimit?limit="+config.page_size+"&sort=desc",{});
  paperStore.setPapers(papers)
  let sysSettings = await getSystemSettings(baseUrl+"/api/settings/getsettings",{});
  systemStore.setSettings(sysSettings[0]);
  let data = await getDatas(baseUrl+"/api/data/getdata",{});
  dataStore.setTagsLists(data[0].tags);
  dataStore.setCategoryLists(data[0].categories);

  fetch(baseUrl+"/admin",{
    method:"GET",
    headers:{
      "Authorization":"Bearer "+systemStore.token.token
    }
  }).then((res)=>{
    res.json().then((res)=>{
      if (res.msg == 'Token has expired'){
        toast.error("登录过期，请重新登录")
      }
    })
  })
  fetch(baseUrl+"/api/papers").then((res)=>{
    res.json().then((data)=>{
      paperStore.setTotalPapers(data)
      dataStore.setTotalPapers(data)
    })
  })
  if (systemStore.token.token){
    adminStore.isLoggedIn =true;
  }
  else{
    adminStore.isLoggedIn = false;
  }
})

useSeoMeta({
  title: 'XIN',
  ogTitle: 'XIN',
  description: '这是一个博客网站，欢迎来到我的世界。',
  ogDescription: '这是一个博客网站，欢迎来到我的世界。',
  ogImage: './public/x_logo.svg',
  ogLocale: 'zh_CN'
})


watch(()=>systemStore.notification,(n,o)=>{
 if (n.msg){
   notifications.value.push(n)
   for (let i = 0; i < notifications.value.length; i++) {
     let timer;
     clearTimeout(timer);
     timer = setTimeout(()=>{
       notifications.value.shift()
     },3000)
   }
 }
})


onBeforeUnmount(() => {
  clearInterval(timer);
})
</script>
