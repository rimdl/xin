

<template>
  <ul class="menu bg-base-100 w-full h-full shadow">
    <li @click="changePage('write')">
      <button class="btn btn-primary btn-block">写作</button>
    </li>
    <li :class="adminStore.nowPage == 'home'?'bg-base-200 rounded-lg':''" class="mt-2" @click="changePage('home')">
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        首页
      </a>
    </li>
    <li>
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        设置
      </a>
    </li>
    <li>
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        管理
      </a>
    </li>
    <li @click="changePage('drafts')">
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m-4-4v-3.075l6.575-6.55l3.075 3.05L11.075 16zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45L9.5 13.55zm3.525-3.525l-.475-.45l.925.925z"/></svg>
        草稿
      </a>
    </li>
    <li @click="changePage('papers')">
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m-4-4v-3.075l6.575-6.55l3.075 3.05L11.075 16zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45L9.5 13.55zm3.525-3.525l-.475-.45l.925.925z"/></svg>
        文章
      </a>
    </li>
    <li @click="changePage('comments')">
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m-4-4v-3.075l6.575-6.55l3.075 3.05L11.075 16zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45L9.5 13.55zm3.525-3.525l-.475-.45l.925.925z"/></svg>
        评论
      </a>
    </li>
  </ul>

  <dialog ref="dialogRef" id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">提示</h3>
      <p class="py-4">草稿箱中还有 {{drafts.length}} 篇草稿，是否编辑草稿？</p>
      <div class="max-h-32 overflow-y-scroll">
        <table class="table ">
          <tbody>
          <tr class="hover" v-for="(item,index) in drafts">
            <th>{{index+1}}</th>
            <td>{{item['title']}}</td>
            <td class="text-right space-x-1">
              <button class="btn btn-xs btn-primary btn-outline">编辑</button>
              <button class="btn btn-xs btn-secondary btn-outline">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-end space-x-2 mt-2">
        <button @click="changePage('drafts')" class="btn-sm btn btn-primary btn-outline">打开草稿箱</button>
        <button @click="newPaper" class="btn-sm btn btn-secondary btn-outline">否：开始新的写作</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import {ref,onMounted} from "vue";
import {useAdminStore} from "~/stores/adminStore";
import { useStorage } from '@vueuse/core';

const drafts = useStorage('drafts', [{}])
const adminStore = useAdminStore();
const dialogRef = ref<HTMLDialogElement>();
const changePage = (page:string)=>{
  if (page == 'write'){
    if (drafts.value.length>0){
      dialogRef.value?.showModal()
    }
  }
  else{
    adminStore.setNowPage(page)
    dialogRef.value?.close()
  }
}
const newPaper = ()=>{
  adminStore.setNowPage('write')
  dialogRef.value?.close()
}
</script>

<style scoped>

</style>