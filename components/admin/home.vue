

<template>
<div class="w-full space-y-4">
  <div class="w-full">
    <div class="stats shadow w-full">
      <div class="stat cursor-pointer hover:scale-95 transition duration-300">
        <div class="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-8 h-8 stroke-current" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm2-4h7v-2H7zm0-4h10v-2H7zm0-4h10V7H7z"/></svg>
        </div>
        <div class="stat-title">文章数量</div>
        <div class="stat-value text-primary">{{ dataStore.totalPapers }}</div>
        <div class="stat-desc">最近一周新增<span class="px-1">{{countRecentPapers}}</span>篇</div>
      </div>

      <div class="stat cursor-pointer hover:scale-95 transition duration-300">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-8 h-8 stroke-current" viewBox="0 0 24 24"><path fill="currentColor" d="M6 14h12v-2H6zm0-3h12V9H6zm0-3h12V6H6zM4 18q-.825 0-1.412-.587T2 16V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v18l-4-4z"/></svg>
        </div>
        <div class="stat-title">评论量</div>
        <div class="stat-value text-secondary">{{ dataStore.totalComments }}</div>
        <div class="stat-desc"><span class="px-1">{{ moment(recentComments[0]?.date).fromNow() }}</span>有人评论</div>
      </div>

      <div class="stat cursor-pointer hover:scale-95 transition duration-300">
        <div class="stat-figure text-primary/50">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-8 h-8 stroke-current" viewBox="0 0 256 256"><path fill="currentColor" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8"/></svg>
        </div>
        <div class="stat-title">用户数量</div>
        <div class="stat-value text-primary/50">{{countUsers}}</div>
        <div class="stat-desc">本月新增<span class="px-1">{{ countRecentUsers }}</span>人</div>
      </div>

      <div class="stat cursor-pointer hover:scale-95 transition duration-300">
        <div class="stat-figure text-secondary">
          <div class="avatar online">
            <div class="w-16 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </div>
        <div class="stat-value">xinsi</div>
        <div class="stat-title">用户信息</div>
        <div class="stat-desc text-secondary">管理员</div>
      </div>

    </div>
  </div>
  <div class="flex sm:space-x-4 max-sm:flex-wrap">
    <div class="max-sm:w-full sm:w-2/3 rounded-lg shadow p-2">
      <AdminPapersPaperlist/>
    </div>
    <div class="max-sm:w-full sm:w-1/3 rounded-lg shadow p-2 h-fit">
      <AdminCommentsCommentlist/>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import config from "~/public/config.json";
import {formatDate} from "~/utils/formatDate";
import type {commentInter} from "~/types";
import moment from 'moment';
import {usePaperStore} from "~/stores/paperStore";
import {useDataStore} from "~/stores/dataStore";

const dataStore = useDataStore();
const paperStore = usePaperStore();
const baseUrl = config.baseUrl;
const countComments = ref(0);
const countUsers = ref(0);
const countRecentPapers = ref(0);
const countRecentUsers = ref(0);
const recentComments = ref<Array<commentInter>>([]);


onMounted(()=>{

  fetch(baseUrl+"/api/users").then((res)=>{
    res.json().then((data)=>{
      countUsers.value = data
    })
  })
  let now_date = new Date();
  now_date.setDate(now_date.getDate()-7);
  let date = formatDate(now_date,"yyyy/MM/dd")+" 00:00:00"
  fetch(baseUrl+"/api/papers/countpapergtedate?date="+date).then((res)=>{
    res.json().then((data)=>{
      countRecentPapers.value = data.length
    })
  })
  fetch(baseUrl+"/api/comments/getrecentcomments").then((res)=>{
    res.json().then((data)=>{
      recentComments.value = data
    })
  })
  let dateStr = now_date.getFullYear()+"/"+(now_date.getMonth()+1)+"/01" + " 00:00:00";
  let newDate = new Date(dateStr);
  let monthDate = formatDate(newDate,"yyyy/MM/dd")+" 00:00:00"
  fetch(baseUrl+"/api/users/countusergtedate?register_time="+monthDate).then((res)=>{
    res.json().then((data)=>{
      countRecentUsers.value = data.length
    })
  })
})

</script>

<style scoped>

</style>