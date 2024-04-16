<<template>
  <div>
    <div class="flex justify-between items-center" ref="topRef">
      <h1 class="font-bold text-4xl h-full">评论 <span v-if="adminStore.nowPage == 'comments'">({{dataStore.totalComments}})</span></h1>
      <div class="space-x-2 flex items-center">
        <Transition name="page" mode="out-in">
          <div class="dropdown dropdown-hover dropdown-end group" v-if="showmultiop">
            <div tabindex="0" role="button" class="btn btn-sm btn-outline m-1">
              批量操作
              <svg xmlns="http://www.w3.org/2000/svg" class="w-2 group-hover:rotate-180 transition duration-300" viewBox="0 0 24 24"><path fill="currentColor" d="M4.253 3C2.524 3 1.441 4.87 2.302 6.37l7.744 13.502c.865 1.507 3.039 1.507 3.904 0l7.744-13.503C22.554 4.87 21.472 3 19.742 3z"/></svg>
            </div>
            <ul tabindex="0" class="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-fit">
              <li @click="confirmDeleteDialogRef?.show()">
                <div class="flex justify-between items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24"><path fill="currentColor" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"/></svg>
                  <a class="whitespace-nowrap font-bold">批量删除</a>
                </div>
              </li>
              <li @click="mutliHiddenComment(true)">
                <div class="flex justify-between items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 1024 1024"><path fill="currentColor" d="M508 624a112 112 0 0 0 112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43m370.72-458.44L836 122.88a8 8 0 0 0-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 0 0 0 11.31L155.25 889a8 8 0 0 0 11.31 0l712.16-712.12a8 8 0 0 0 0-11.32M332 512a176 176 0 0 1 258.88-155.28l-48.62 48.62a112.08 112.08 0 0 0-140.92 140.92l-48.62 48.62A175.09 175.09 0 0 1 332 512"/><path fill="currentColor" d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 0 1 445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5"/></svg>
                  <a class="whitespace-nowrap font-bold">批量隐藏</a>
                </div>
              </li>
              <li @click="mutliHiddenComment(false)">
                <div class="flex justify-between items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                  <a class="whitespace-nowrap font-bold">取消隐藏</a>
                </div>
              </li>
            </ul>
          </div>
        </Transition>
        <span></span>
        <button class="btn btn-sm" v-if="adminStore.nowPage !== 'comments'" @click="adminStore.setNowPage('comments')">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19H8q.425 0 .713.288T9 20q0 .425-.288.713T8 21H4q-.425 0-.712-.288T3 20v-4q0-.425.288-.712T4 15q.425 0 .713.288T5 16v1.6l2.4-2.4q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7zm11.2 0l-2.4-2.4q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l2.4 2.4V16q0-.425.288-.712T20 15q.425 0 .713.288T21 16v4q0 .425-.288.713T20 21h-4q-.425 0-.712-.288T15 20q0-.425.288-.712T16 19zM5 6.4V8q0 .425-.288.713T4 9q-.425 0-.712-.288T3 8V4q0-.425.288-.712T4 3h4q.425 0 .713.288T9 4q0 .425-.288.713T8 5H6.4l2.4 2.4q.275.275.275.7t-.275.7q-.275.275-.7.275T7.4 8.8zm14 0l-2.4 2.4q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7L17.6 5H16q-.425 0-.712-.287T15 4q0-.425.288-.712T16 3h4q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9q-.425 0-.712-.288T19 8z"/></svg>
        </button>
      </div>
    </div>
    <div class="overflow-x-auto" :class="adminStore.nowPage == 'comments'? '':'max-h-96'" :style="listStyle" ref="adminCommentListRef">
        <table class="table table-pin-rows" v-viewer>
          <!-- head -->
          <thead>
          <tr>
            <th v-if="adminStore.nowPage == 'comments'">
              <label>
                <input type="checkbox" class="checkbox" @click="clickcheckall = true" v-model="checkall"/>
              </label>
            </th>
            <th>用户/评论时间</th>
            <th>评论内容</th>
            <th v-if="adminStore.nowPage == 'comments'">信息</th>
          </tr>
          </thead>
          <tbody>
          <!-- row 1 -->
          <tr v-for="(item,index) in comments">
            <th v-if="adminStore.nowPage == 'comments'">
              <div  class="flex justify-between items-center">
                <input type="checkbox" class="checkbox" @click="clickcheckall=false" v-model="comments[index].checked" />
              </div>
            </th>
            <td>
              <div class="flex items-center gap-3">
                <span class="font-bold">{{index+1}}</span>
                <div class="avatar">
                  <div class="mask mask-circle w-10 h-10">
                    <img class="cursor-pointer" :src="getUserInfo(item.userid)?.avatar" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{{getUserInfo(item.userid)?.username}}</div>
                  <div class="text-sm opacity-50">{{ item.date }}</div>
                </div>
              </div>
            </td>
            <td class="space-y-2">
              <div v-if="adminStore.nowPage == 'comments'">
                <span class="font-bold">来自文章：</span><button @click="showPaper(item.paperid)" class="btn btn-xs rounded-full btn-outline">{{item.title?item.title:item.paperid}}</button>
              </div>
              <div class="w-full overflow-scroll max-h-56 bg-base-200 bg-opacity-50 rounded-lg p-2">
                {{item.content}}
              </div>
            </td>
            <td v-if="adminStore.nowPage == 'comments'">
              <div class="whitespace-nowrap">
                <h1>{{item.login}}</h1>
                <h1>{{item.platform}}</h1>
                <h1>{{item.ip}}</h1>
                <h1>{{item.location}}</h1>
                <h1><span class="badge badge-outline badge-info" v-if="item.hidden">已隐藏本条评论</span></h1>
              </div>
            </td>
            <td v-if="adminStore.nowPage == 'comments'">
              <div class="whitespace-nowrap space-x-2">
                <div class="dropdown dropdown-end">
                  <div tabindex="0" role="button" class="btn btn-error btn-outline btn-xs whitespace-nowrap m-1">删除</div>
                  <div tabindex="0" class="dropdown-content z-20 ">
                    <div class="space-x-1 p-2 w-fit">
                      <button class="btn btn-error btn-xs" @click="deleteComment([item],$event)">
                        确定
                        <span class="loading loading-spinner loading-xs hidden"></span>
                      </button>
                      <button class="btn btn-xs" @click="cancelDelete($event)">取消</button>
                    </div>
                  </div>
                </div>
                <button class="btn btn-xs btn-primary" v-if="!item.hidden" @click="hiddenComment([item],true)">隐藏</button>
                <button class="btn btn-xs btn-primary" v-if="item.hidden" @click="hiddenComment([item],false)">取消隐藏</button>
              </div>
            </td>
          </tr>
          </tbody>
          <!-- foot -->
          <tfoot>
          <tr>
            <th>
              <Transition name="page" mode="out-in">
                <div class="w-full text-center" v-if="tips && commentListScroll.arrivedState.bottom">
                  <span >{{tips}}</span>
                </div>
              </Transition>
              <Transition name="page" mode="out-in">
                <div  v-if="!tips && showLoading" class="flex items-center justify-center w-full">
                  <span>加载中</span>
                  <span class="loading loading-dots loading-lg"></span>
                </div>
              </Transition>
              <div class="w-full text-left">
                <button class="btn btn-ghost btn-sm" @click="loadMore" v-if="tips == '' && !showLoading && skip < dataStore.totalComments">加载更多</button>
              </div>
            </th>
            <th v-if="adminStore.nowPage == 'comments'">
                <span v-if="countChecked">已选择：{{countChecked}}</span>
            </th>
            <th v-if="adminStore.nowPage == 'home'"></th>
            <th v-if="adminStore.nowPage == 'comments'"></th>
            <th v-if="adminStore.nowPage == 'comments'"></th>
            <th v-if="adminStore.nowPage == 'comments'"></th>

          </tr>
          </tfoot>

        </table>
    </div>
  </div>

  <dialog id="admincommentdialog" ref="adminCommentDialogRef" class="modal backdrop-blur">
    <div class="modal-box w-11/12 max-w-5xl">
      <div class="w-full flex justify-between">
        <h1 class="font-bold text-2xl">本文标题：{{ paper?.title }}</h1>
        <NuxtLink :to="'/read'+paper?._id.$oid">
          <button class="btn btn-sm btn-primary btn-outline">在阅读页打开</button>
        </NuxtLink>
      </div>
      <div class="divider"></div>
      <Viewer ref="viewerRef" :value="paper?.content" :plugins="plugins" v-viewer/>

    </div>
    <form method="dialog" class="modal-backdrop bg-gray-500 bg-opacity-50">
      <button>close</button>
    </form>
  </dialog>

  <dialog id="confirmDeleteDialog" ref="confirmDeleteDialogRef" class="modal backdrop-blur">
    <div class="modal-box w-fit p-10 space-y-4" >
      <h3 class="font-bold text-lg">确定要删除吗？</h3>
      <div class="flex justify-center space-x-4">
        <button class="btn btn-error btn-sm" @click="deleteCheckedComment">确定</button>
        <button class="btn btn-primary btn-outline btn-sm" @click="confirmDeleteDialogRef?.close()">取消</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop bg-gray-500 bg-opacity-50">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import {useAdminStore} from "~/stores/adminStore";
import {ref,watch} from  "vue";
import {useElementSize, useScroll} from "@vueuse/core";
import config from "public/config.json";
import type {commentInter, paperInter} from "~/types";
import {useDataStore} from "~/stores/dataStore";
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
import {useToast} from "vue-toastification";
import {useSystemStore} from "~/stores/systemStore";

const toast = useToast()
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
const adminCommentListRef = ref<HTMLDivElement>()
const commentListScroll = useScroll(adminCommentListRef);
const systemStore = useSystemStore()
const dataStore = useDataStore();
const baseUrl = config.baseUrl;
const listStyle = ref('')
const adminStore = useAdminStore();
const topRef = ref<HTMLDivElement>()
const topRefSize = useElementSize(topRef);
const skip = ref(0)
const comments = ref<Array<commentInter>>([])
const continueRead = ref(false)
const showLoading = ref(false)
const paper = ref<paperInter>()
const adminCommentDialogRef = ref<HTMLDialogElement>()
const confirmDeleteDialogRef = ref<HTMLDialogElement>()
const checkall = ref(false)
const clickcheckall = ref(false)
const showmultiop = ref(false)
const countChecked = ref(0)
const tips = ref("")

watch(()=>topRefSize.height.value,(nv)=>{
  if (adminStore.nowPage == 'comments'){
    listStyle.value = `max-height:calc(100vh - 4rem - ${topRefSize.height.value}px)`
  }
})
watch(()=>commentListScroll.arrivedState.bottom,(nv)=>{
  if (nv && continueRead.value){
    showLoading.value = true
    continueRead.value = false
    clickcheckall.value = false
    if (skip.value <= dataStore.totalComments){
      loadMore()
    }
    else{
      tips.value = '别划了，到底了~'
      continueRead.value = false
      showLoading.value = false
    }
  }
})
watch(()=>checkall.value,(nv)=>{
  if (clickcheckall.value){
    if (nv){
      for (let i = 0; i < comments.value.length; i++) {
        comments.value[i].checked = true
      }
    }
    else{
      for (let i = 0; i < comments.value.length; i++) {
        comments.value[i].checked = false
      }
    }
  }
})

watch(()=>comments.value,(nv)=>{
  for (let i = 0; i < nv.length; i++) {
    if (!nv[i].checked){
      checkall.value = false
      break
    }else {
      checkall.value = true
    }
  }
  for (let i = 0; i < nv.length; i++) {
    if (nv[i].checked){
      showmultiop.value = true
      break
    }else {
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

onMounted(()=>{
  loadMore()
})

const loadMore = ()=> {
  let tempSkip = skip.value
  clickcheckall.value = false
  fetch(baseUrl+`/api/comments/getcommentslimit?limit=${config.page_size}&skip=${skip.value}`).then((res)=>{
    res.json().then(data=>{
      comments.value.push(...data)
      tempSkip += config.page_size
      skip.value = tempSkip
      continueRead.value = true
      showLoading.value = false
    })
  })
}

const getUserInfo = (userid:string) => {
  if (dataStore.userList){
    for (let i = 0; i < dataStore.userList.length; i++) {
      if (dataStore.userList[i].userid === userid){
        return dataStore.userList[i];
      }
    }
  }
}

const showPaper = (paperid:string) => {
  if (paperid){
    fetch(baseUrl+"/api/papers/getpaperbyid?_id="+paperid).then(res=>{
      if (res.ok){
        res.json().then((data)=>{
          if (data[0]){
            paper.value = data[0];
            adminCommentDialogRef.value?.show()
          }
          else{
            toast.error("没有找到文章")
          }
        })
      }
    })
  }
}

const hiddenComment = async (commentlist:Array<commentInter>,flag:boolean) => {
  if (flag){
    toast.info("开始隐藏...")
  }
  else{
    toast.info("取消隐藏...")
  }
  for (let i = 0; i < commentlist.length; i++) {
    const response = await fetch(baseUrl+"/api/comments/hiddencomment?id="+commentlist[i]._id.$oid+"&flag="+flag,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${systemStore.token.token}`
      }
    })
    if (response.ok){
      commentlist[i].hidden = flag;
      if (commentlist.length- 1 - i == 0){
        if (flag){
          const msg = "隐藏成功，共计："+(commentlist.length)+"个"
          toast.success(msg)
        }
        else{
          toast.success("取消隐藏成功")
        }
      }
    }
    else{
      const msg = "出错了："+response.status
      toast.error(msg)
    }
  }

}

const mutliHiddenComment = (flag:boolean) => {
  let commentlist = <Array<commentInter>>[]
  for (let i = 0; i < comments.value.length; i++) {
    if (comments.value[i].checked){
      if (flag){
        if(!comments.value[i].hidden){
          commentlist.push(comments.value[i])
        }
      }
      else{
        if(comments.value[i].hidden){
          commentlist.push(comments.value[i])
        }
      }
    }
  }
  if (commentlist.length > 0){
    hiddenComment(commentlist,flag)
  }
}

const deleteComment = (commentList:Array<commentInter>,e?:any) => {
  toast.info("正在删除...")
  if(e){
    if (e.target.children){
      e.target.children[0].classList.remove("hidden")
    }
  }
  let idList = []
  for (let i = 0; i < commentList.length; i++) {
    idList.push({_id:commentList[i]._id})
  }
  fetch(baseUrl+`/api/comments/deletecomment`,{
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
        dataStore.setTotalComments(dataStore.totalComments - data.deleted_count)
        for (let i = 0; i < commentList.length; i++) {
          comments.value.splice(comments.value.indexOf(commentList[i]),1)
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
const deleteCheckedComment = () => {
  let commentList = []
  for (let i = 0; i < comments.value.length; i++) {
    if (comments.value[i].checked){
      commentList.push(comments.value[i])
    }
  }
  if (commentList.length>0){
    deleteComment(commentList)
    confirmDeleteDialogRef.value?.close()
  }
  else{
    toast.error("请选择要删除的评论")
  }
}
</script>

<style scoped>

</style>>