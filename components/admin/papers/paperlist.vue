

<template>
<div>
  <div class="flex justify-between items-center h-fit" ref="topRef">
    <h1 class="font-bold text-4xl h-full">文章 <span v-if="adminStore.nowPage == 'papers'">({{dataStore.totalPapers}})</span></h1>
    <div class="space-x-2 flex items-center">
      <Transition name="page" mode="out-in">
        <div class="dropdown dropdown-hover group" v-if="showmultiop">
          <div tabindex="0" role="button" class="btn btn-sm btn-outline m-1">
            批量操作
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2 group-hover:rotate-180 transition duration-300" viewBox="0 0 24 24"><path fill="currentColor" d="M4.253 3C2.524 3 1.441 4.87 2.302 6.37l7.744 13.502c.865 1.507 3.039 1.507 3.904 0l7.744-13.503C22.554 4.87 21.472 3 19.742 3z"/></svg>
          </div>
          <ul tabindex="0" class="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-fit">
            <li @click="downloadZip">
              <div class="flex justify-between items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>
                <a class="whitespace-nowrap font-bold">批量导出</a>
              </div>
            </li>
            <li @click="confirmDeleteDialogRef?.show()">
              <div class="flex justify-between items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24"><path fill="currentColor" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"/></svg>
                <a class="whitespace-nowrap font-bold">批量删除</a>
              </div>
              </li>
          </ul>
        </div>
      </Transition>
      <Transition name="page" mode="out-in">
      <button class="btn btn-secondary btn-sm" @click="downloadZip" v-if="showmultiop">批量导出</button>
      </Transition>
      <button class="btn btn-sm" v-if="adminStore.nowPage !=='papers'" @click="adminStore.setNowPage('papers')">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19H8q.425 0 .713.288T9 20q0 .425-.288.713T8 21H4q-.425 0-.712-.288T3 20v-4q0-.425.288-.712T4 15q.425 0 .713.288T5 16v1.6l2.4-2.4q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7zm11.2 0l-2.4-2.4q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l2.4 2.4V16q0-.425.288-.712T20 15q.425 0 .713.288T21 16v4q0 .425-.288.713T20 21h-4q-.425 0-.712-.288T15 20q0-.425.288-.712T16 19zM5 6.4V8q0 .425-.288.713T4 9q-.425 0-.712-.288T3 8V4q0-.425.288-.712T4 3h4q.425 0 .713.288T9 4q0 .425-.288.713T8 5H6.4l2.4 2.4q.275.275.275.7t-.275.7q-.275.275-.7.275T7.4 8.8zm14 0l-2.4 2.4q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7L17.6 5H16q-.425 0-.712-.287T15 4q0-.425.288-.712T16 3h4q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9q-.425 0-.712-.288T19 8z"/></svg>
      </button>
    </div>
  </div>
  <div class="overflow-x-auto" :class="adminStore.nowPage == 'papers'? '':'max-h-96'" :style="listStyle" ref="adminPaperListRef">
    <table class="table table-pin-rows" v-viewer>
      <!-- head -->
      <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" @click="clickcheckall = true" v-model="checkall"/>
          </label>
        </th>
        <th>作者/时间</th>
        <th>简介/标签</th>
        <th>分类</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="hover" v-for="(item,index) in papers">
        <th>
          <div  class="flex justify-between items-center">
            <span>{{index+1}} </span>
            <input type="checkbox" class="checkbox" @click="clickcheckall = false" v-model="papers[index].checked" />
          </div>
        </th>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img class="cursor-pointer" :src="item.cover == '请填写'?'':item.cover" alt="image" />
              </div>
            </div>
            <div>
              <div class="font-bold">{{item.author}}</div>
              <div class="text-sm opacity-50">{{item.date}}</div>
            </div>
          </div>
        </td>
        <td>
          {{item.desc.length > 30?item.desc.substring(0,30)+'...':item.desc}}
          <br/>
          <span class="space-x-1">
                <span class="badge badge-ghost badge-sm" v-for="tag in item.tags"># {{tag}}</span>
              </span>
        </td>
        <td>{{item.category}}</td>
        <th>
          <div class="whitespace-nowrap space-x-1 flex items-center">
            <button @click="readPaper(item.content,item.title,item._id.$oid)" class="btn btn-ghost btn-outline btn-xs whitespace-nowrap">查看</button>
            <button @click="editPaper(item._id['$oid'])" class="btn btn-primary btn-outline btn-xs whitespace-nowrap">编辑</button>

            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-error btn-outline btn-xs whitespace-nowrap m-1">删除</div>
              <div tabindex="0" class="dropdown-content z-20 ">
                <div class="space-x-1 p-2 w-fit">
                  <button class="btn btn-error btn-xs" @click="deletePaper([item],$event)">
                    确定
                    <span class="loading loading-spinner loading-xs hidden"></span>
                  </button>
                  <button class="btn btn-xs" @click="cancelDelete($event)">取消</button>
                </div>
              </div>
            </div>

            <div class="tooltip" data-tip="下载">
              <button class="btn btn-outline btn-xs btn-circle" @click="download(item)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3" viewBox="0 0 24 24"><path fill="currentColor" d="M4 22v-2h16v2zm8-4L5 9h4V2h6v7h4z"/></svg>
              </button>
            </div>
          </div>
        </th>
      </tr>
      </tbody>
      <!-- foot -->
      <tfoot>
      <tr>
        <th>
          <span v-if="countChecked">已选择：{{countChecked}}</span>
        </th>
        <th></th>
        <th></th>
        <th></th>
        <th>
          <Transition name="page" mode="out-in">
          <div class="w-full text-center" v-if="tips && paperListScroll.arrivedState.bottom">
            <span >{{tips}}</span>
          </div>
          </Transition>
          <Transition name="page" mode="out-in">
          <div  v-if="!tips && showLoading" class="flex items-center justify-center w-full">
            <span>加载中</span>
          <span class="loading loading-dots loading-lg"></span>
          </div>
          </Transition>
          <div class="w-full text-right">
            <button class="btn btn-ghost btn-sm" @click="loadMore" v-if="tips == '' && !showLoading && skip < paperStore.total_papers">加载更多</button>
          </div>
        </th>
      </tr>
      </tfoot>

    </table>
  </div>
</div>
  <dialog id="adminhomedialog" ref="adminHomeDialogRef" class="modal backdrop-blur">
    <div class="modal-box w-11/12 max-w-5xl">
      <div class="w-full flex justify-between">
        <h1 class="font-bold text-2xl">本文标题：{{ readContent?.title }}</h1>
        <NuxtLink :to="'/read'+readContent?.oid">
          <button class="btn btn-sm btn-primary btn-outline">在阅读页打开</button>
        </NuxtLink>
      </div>
      <div class="divider"></div>
      <Viewer ref="viewerRef" :value="readContent.content" :plugins="plugins" v-viewer/>

    </div>
    <form method="dialog" class="modal-backdrop bg-gray-500 bg-opacity-50">
      <button>close</button>
    </form>
  </dialog>

  <dialog id="confirmDeleteDialog" ref="confirmDeleteDialogRef" class="modal backdrop-blur">
    <div class="modal-box w-fit p-10 space-y-4" >
      <h3 class="font-bold text-lg">确定要删除吗？</h3>
      <div class="flex justify-center space-x-4">
        <button class="btn btn-error btn-sm" @click="deleteCheckedPaper">确定</button>
        <button class="btn btn-primary btn-outline btn-sm" @click="confirmDeleteDialogRef?.close()">取消</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop bg-gray-500 bg-opacity-50">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
//@ts-ignore
import {Viewer} from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import mathSsr from "@bytemd/plugin-math-ssr";
import frontMatter from "@bytemd/plugin-frontmatter";
import juejin_theme from "~/utils/juejin_theme";
import breaks from "@bytemd/plugin-breaks";
import highlightSsr from "@bytemd/plugin-highlight-ssr";
import gemoji from "@bytemd/plugin-gemoji";
import mermaid from "@bytemd/plugin-mermaid";
import {ref,defineProps,onMounted} from "vue";
import {usePaperStore} from "~/stores/paperStore";
import { useScroll } from '@vueuse/core';
import config from "public/config.json";
import {type paperInter} from "~/types";
import JSZip from "jszip";
// @ts-ignore
import {saveAs} from "file-saver";
import {useToast} from "vue-toastification";
import {useAdminStore} from "~/stores/adminStore";
import {useElementSize} from "@vueuse/core";
import {useSystemStore} from "~/stores/systemStore";
import {useDataStore} from "~/stores/dataStore";

const dataStore = useDataStore();
const systemStore = useSystemStore();
const topRef = ref<HTMLDivElement>()
const topRefSize = useElementSize(topRef);
const listStyle = ref("")
const adminStore = useAdminStore();
const toast = useToast()
const baseUrl = config.baseUrl;
const paperStore = usePaperStore();
const adminHomeDialogRef = ref<HTMLDialogElement>();
const confirmDeleteDialogRef = ref<HTMLDialogElement>();
const adminPaperListRef = ref<HTMLDivElement>();
const readContent = ref({title:'',content:'',oid:''});
const paperListScroll = useScroll(adminPaperListRef);
const papers = ref<Array<paperInter>>([]);
const tips = ref("")
const continueRead = ref(true)
const showLoading = ref(false)
const checkall = ref(false)
const clickcheckall = ref(false)
const showmultiop = ref(false)
const skip = ref(0);
const countChecked = ref(0);

onMounted(()=>{

})

watch(()=>topRefSize.height.value,(nv)=>{
  if (adminStore.nowPage == 'papers'){
    listStyle.value = `max-height:calc(100vh - 4rem - ${topRefSize.height.value}px)`
  }
})

const plugins = [
  gfm(),
  mathSsr(),
  frontMatter(),
  juejin_theme(),
  breaks(),
  highlightSsr(),
  gemoji(),
  mermaid()
]


const readPaper = (content:string,title:string,oid:string)=>{
  adminHomeDialogRef.value?.show()
  readContent.value.content = content
  readContent.value.title = title
  readContent.value.oid = oid
}

const loadMore = ()=> {
  let tempSkip = skip.value
  fetch(baseUrl+`/api/papers/getpaperslimit?limit=${config.page_size}&skip=${skip.value}`).then((res)=>{
    res.json().then(data=>{
      papers.value.push(...data)
      tempSkip += config.page_size
      skip.value = tempSkip
      continueRead.value = true
      showLoading.value = false
    })
  })
}
watch(()=>paperListScroll.arrivedState.bottom,(nv)=>{
  if (nv && continueRead.value){
    showLoading.value = true
    continueRead.value = false
    clickcheckall.value = false
      if (skip.value <= paperStore.total_papers){
        loadMore()
      }
      else{
        tips.value = '别划了，到底了~'
        continueRead.value = false
        showLoading.value = false
      }
  }
})

watch(()=>papers.value,(nv)=>{
  for (let i = 0; i < papers.value.length; i++) {
    if (!papers.value[i].checked){
      checkall.value = false
      break
    }
    else {
      checkall.value = true
    }
  }
  for (let i = 0; i < papers.value.length; i++) {
    if (papers.value[i].checked){
      showmultiop.value = true
      break
    }
    else {
      showmultiop.value = false
    }
  }
  countChecked.value = 0
  for (let i = 0; i < nv.length; i++) {
    if (nv[i].checked){
      countChecked.value++
    }
  }
},{
  deep:true
})

watch(()=>checkall.value,(nv)=>{
  if (clickcheckall.value){
    if (nv){
      for (let i = 0; i < papers.value.length; i++) {
        papers.value[i].checked = true
      }
    }
    else {
      for (let i = 0; i < papers.value.length; i++) {
        papers.value[i].checked = false
      }
    }
  }
})

const download = (item:paperInter)=>{
  const blob = new Blob([item.content], { type: 'text/plain' });
  saveAs(blob, item.title+'.md');
}

const downloadZip = async () =>{
    const zip = new JSZip();
  for (let i = 0; i < papers.value.length; i++) {
    if (papers.value[i].checked){
      zip.file(papers.value[i].title+'.md', papers.value[i].content);
    }
  }
  const zipBinaryData = await zip.generateAsync({type:"blob"});
  const nowDate = new Date();
  const date = formatDate(nowDate, 'yyyy_MM_dd_HH-mm-ss');
  saveAs(zipBinaryData, date+"_papers.zip");
}

const deletePaper = (paperList:Array<paperInter>,e?:any) => {
  if(e){
    if (e.target.children){
      e.target.children[0].classList.remove("hidden")
    }
  }
  let idList = []
  for (let i = 0; i < paperList.length; i++) {
    idList.push({_id:paperList[i]._id})
  }
  fetch(baseUrl+`/api/papers/deletepaper`,{
    method:'DELETE',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + systemStore.token.token
    },
    body:JSON.stringify(idList)
  }).then((res)=>{
    res.json().then((data)=>{
      if (data.deleted_count){
        toast.success(`删除成功（删除 ${data.deleted_count} 条）`,{timeout:2000})
        dataStore.setTotalPapers(dataStore.totalPapers - data.deleted_count)
        for (let i = 0; i < paperList.length; i++) {
          papers.value.splice(papers.value.indexOf(paperList[i]),1)
        }
        e?.target.blur()
      }
      else{
        toast.error("删除失败")
      }
      if (e){
        if(e.target.children){
          e.target.children[0]?.classList.add("hidden")
        }
      }
    })
  })
}

const cancelDelete = (e:any) => {
  e.target.blur()
}

const deleteCheckedPaper = () => {
  let paperList = []
  for (let i = 0; i < papers.value.length; i++) {
    if (papers.value[i].checked){
      paperList.push(papers.value[i])
    }
  }
  if (paperList.length>0){
    deletePaper(paperList)
    confirmDeleteDialogRef.value?.close()
  }
  else{
    toast.error("请选择要删除的文章")
  }
}
const editPaper = (oid:string) => {
  adminStore.setEditPaperId(oid);
  adminStore.setNowPage("write");
}
</script>

<style scoped>

</style>