<template>
  <div>
    <div class="flex justify-between py-2 items-center flex-wrap max-sm:border max-sm:bg-base-200 max-sm:px-2" ref="topRef">
      <div class="max-sm:w-full sm:w-3/12">
        <label class="input input-sm input-bordered flex items-center gap-2 border-0 w-full">
          <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm2-4h7v-2H7zm0-4h10v-2H7zm0-4h10V7H7z"/>
          </svg>
          <input type="text" v-model="title" @input="changeTitle" class="w-full outline-0"
                 placeholder="请输入文章标题"/>
        </label>
      </div>
      <div class="max-sm:w-full sm:w-4/12 max-sm:justify-center flex space-x-2">
        <div class="dropdown dropdown-hover">
          <div tabindex="0" role="button" class="btn btn-sm m-1 whitespace-nowrap">选择分类</div>
          <div tabindex="0" class="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-fit">
            <div class="bg-base-200 rounded-lg p-2 font-bold">
              <span class=" flex items-center whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor"
                                                                                                  d="m22 10l-.625-1.375L20 8l1.375-.625L22 6l.625 1.375L24 8l-1.375.625L22 10Zm-3-4l-.95-2.05L16 3l2.05-.95L19 0l.95 2.05L22 3l-2.05.95L19 6ZM9 22q-.825 0-1.413-.588T7 20h4q0 .825-.588 1.413T9 22Zm-4-3v-2h8v2H5Zm.25-3q-1.725-1.025-2.738-2.75T1.5 9.5q0-3.125 2.188-5.313T9 2q3.125 0 5.313 2.188T16.5 9.5q0 2.025-1.012 3.75T12.75 16h-7.5Z"/></svg>
              <span>点击添加，再次点击取消</span>
              </span>
            </div>
            <div class="mt-2 mb-2">
              <label class="input input-sm input-bordered flex items-center gap-2">
                <input type="text" class="grow" placeholder="搜索" v-model="searchContent" @input="searchCategory"/>
                <button class="btn btn-sm btn-ghost btn-circle" @click="searchCategory">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
                </button>
              </label>
            </div>
            <div class="max-h-56 overflow-y-scroll">
              <ul v-if="!searchContent">
                <li v-for="(item,index) in dataStore.categoryLists" @click="addCategory(item)"><a>{{ index + 1 }}. {{ item }}</a>
                </li>
              </ul>
              <ul v-if="searchContent">
                <li v-for="(item,index) in searchCategoryList" @click="addCategory(item)"><a>{{ index + 1 }}. {{ item }}</a>
                </li>
              </ul>
            </div>
            <div>
              <button class="btn btn-primary btn-sm btn-block" @click="showAddProperty('category')">添加新的分类</button>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-hover">
          <div tabindex="0" role="button" class="btn btn-sm m-1 whitespace-nowrap">添加标签</div>
          <div tabindex="0" class="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-fit">
            <div class="bg-base-200 rounded-lg p-2 font-bold">
              <span class=" flex items-center whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor"
                                                                                                  d="m22 10l-.625-1.375L20 8l1.375-.625L22 6l.625 1.375L24 8l-1.375.625L22 10Zm-3-4l-.95-2.05L16 3l2.05-.95L19 0l.95 2.05L22 3l-2.05.95L19 6ZM9 22q-.825 0-1.413-.588T7 20h4q0 .825-.588 1.413T9 22Zm-4-3v-2h8v2H5Zm.25-3q-1.725-1.025-2.738-2.75T1.5 9.5q0-3.125 2.188-5.313T9 2q3.125 0 5.313 2.188T16.5 9.5q0 2.025-1.012 3.75T12.75 16h-7.5Z"/></svg>
              <span>点击添加，再次点击取消</span>
              </span>
            </div>
            <div class="mt-2 mb-2">
              <label class="input input-sm input-bordered flex items-center gap-2">
                <input type="text" class="grow" placeholder="搜索" v-model="searchTagContent" @input="searchTag"/>
                <button class="btn btn-sm btn-ghost btn-circle" @click="searchTag">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
                </button>
              </label>
            </div>
            <div class="max-h-40 overflow-y-scroll">
              <ul v-if="!searchTagContent">
                <li v-for="(item,index) in dataStore.tagsLists" @click="addTag(item)"><a>{{ index + 1 }}. {{ item }}</a>
                </li>
              </ul>
              <ul v-if="searchTagContent">
                <li v-for="(item,index) in searchTagList" @click="addTag(item)"><a>{{ index + 1 }}. {{ item }}</a>
                </li>
              </ul>
            </div>
            <div>
              <button class="btn btn-primary btn-sm btn-block" @click="showAddProperty('tag')">添加新的标签</button>
            </div>
          </div>

        </div>
        <div>
          <button class="btn btn-sm m-1 whitespace-nowrap" @click="showAddProperty('cover')">添加封面</button>
        </div>
        <div>
          <button class="btn btn-sm m-1 whitespace-nowrap" @click="showAddProperty('desc')">添加简介</button>
        </div>
      </div>
      <div class="max-sm:w-full sm:w-3/12 flex max-sm:justify-center sm:justify-end items-center space-x-2">
        <span class="text-primary opacity-50">{{ tips }}</span>
        <div class="flex flex-col justify-center items-center tooltip" :data-tip="autoSave?'自动保存：开':'自动保存：关'">
          <input type="checkbox" v-model="autoSave" class="toggle toggle-primary" checked/>
        </div>
        <button class="btn btn-outline btn-primary btn-sm">存草稿</button>
        <button class="btn btn-primary btn-sm" @click="publish(false)" v-if="!adminStore.editPaperId">发布</button>
        <button class="btn btn-primary btn-sm" @click="publish(true)" v-if="adminStore.editPaperId">更新</button>
      </div>
    </div>
    <Editor :value="content" ref="editorRef" :locale="juejin_zh" :plugins="plugins" :uploadImages="uploadImages"
            @change="handleChange" :placeholder="'开始写作吧...'"/>
  </div>

  <dialog ref="addDialog" id="dialog" class="modal backdrop-blur">
    <div class="modal-box">
      <div class="flex justify-between">
        <h3 class="font-bold text-lg" v-if="addType == 'category'">添加 分类</h3>
        <h3 class="font-bold text-lg" v-if="addType == 'tag'">添加 标签</h3>
        <h3 class="font-bold text-lg" v-if="addType == 'cover'">添加 封面</h3>
        <h3 class="font-bold text-lg" v-if="addType == 'desc'">添加 简介</h3>
        <span class="loading loading-ring loading-md" v-if="showLoading"></span>
      </div>
      <p class="py-4">
        <textarea v-if="addType == 'desc'" v-model="input_property" class="textarea textarea-bordered w-full" placeholder="请输入"></textarea>
        <label v-else class="input input-bordered flex items-center gap-2">
          <input type="text" v-model="input_property" class="grow" placeholder="请输入"/>
          <Transition name="my_bounce">
            <button class="btn btn-ghost btn-circle" v-if="input_property" @click="addProperty">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 48 48">
                <path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round"
                      stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25z"
                      clip-rule="evenodd"/>
              </svg>
            </button>
          </Transition>
        </label>
      </p>
      <div class="text-right group space-x-2" v-if="addType == 'desc' && input_property">
        <span class="opacity-0 font-bold group-hover:opacity-50 transition duration-300">完成并提交</span>
        <button class="btn btn-sm btn-primary btn-outline" @click="addProperty">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 48 48">
            <path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25z"
                  clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop bg-gray-500 opacity-35">
      <button @click="input_property = ''">close</button>
    </form>
  </dialog>

  <dialog id="leaveDialog" ref="leaveDialogRef" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import {ref, onMounted, toRaw,onBeforeUnmount} from "vue";
// @ts-ignore
import {Editor} from "@bytemd/vue-next";
import {useElementSize} from "@vueuse/core";
import {type frontMatterInter} from "~/types";
import juejin_theme from "~/utils/juejin_theme";
import frontMatter from "@bytemd/plugin-frontmatter";
import breaks from "@bytemd/plugin-breaks";
import highlightSsr from "@bytemd/plugin-highlight-ssr";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import mathSsr from "@bytemd/plugin-math-ssr";
import mermaid from "@bytemd/plugin-mermaid";
import yaml from "js-yaml";
import {useDebounceFn} from '@vueuse/core';
import {useStorage} from '@vueuse/core';
import {useTimeoutFn} from '@vueuse/core';
import {useDataStore} from "~/stores/dataStore";
import config from "~/public/config.json";
import { useToast } from "vue-toastification";
import _ from "lodash";
import {useAdminStore} from "~/stores/adminStore";
import {usePaperStore} from "~/stores/paperStore";
import {get_json} from "~/utils/fetch_tools";
import juejin_zh from "~/public/juejin_zh.json";
import {formatDate} from "~/utils/formatDate";
import {useSystemStore} from "~/stores/systemStore";

const systemStore = useSystemStore();
const paperStore = usePaperStore();
const toast = useToast()
const adminStore = useAdminStore();
const baseUrl = config.baseUrl;
const dataStore = useDataStore();
const editorRef = ref();
const topRef = ref();
const topRefSize = useElementSize(topRef);
const content = ref('')
const title = ref("")
const autoSave = ref(false)
const drafts = useStorage('drafts', [])
const tips = ref("");
const tags = ref<Array<string>>([])
const addDialog = ref<HTMLDialogElement>();
const leaveDialogRef = ref<HTMLDialogElement>();
const addType = ref("");
const input_property = ref("");
const searchContent = ref("");
const searchTagContent = ref("");
const searchCategoryList = ref<Array<string>>([]);
const searchTagList = ref<Array<string>>([]);
const showLoading = ref(false)

const nowDate = new Date();
const date = formatDate(nowDate, "yyyy/MM/dd HH:mm:ss")
const init_data = ref({
  title: "未命名",
  date: date,
  cover: "未设置封面",
  desc: "无简介",
  theme: "github",
  highlight: "github",
  author: "xin"
})

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.el.children[0].style.height = "calc(100vh - 4rem - " + topRefSize.height.value + "px)";
    editorRef.value.el.children[0].children[1].children[0].children[0].style.fontFamily = "auto"
  }
  content.value = "---\n" + yaml.dump(init_data.value) + "---\n"
  if (adminStore.editPaperId){
    fetch(baseUrl+"/api/papers/getpaperbyid?_id="+adminStore.editPaperId).then(res=>{
      res.json().then(data=>{
        content.value = data[0].content
        const frontMatterJson = getFrontMatterJson(content.value)
        if (frontMatterJson?.title){
          title.value = frontMatterJson.title
        }
      })
    })
  }
})


onBeforeUnmount( () => {
  const frontmatterStart = content.value.indexOf('---');
  const frontmatterEnd = content.value.indexOf('---', frontmatterStart + 3);
  let text = ""
  if (frontmatterStart > -1 && frontmatterEnd > -1) {
    text = content.value.substring(frontmatterEnd+3);
  }
  if (text.length>1) {
    const isConfirm = confirm("有内容未保存，是否保存至草稿箱？")
    if (isConfirm){
      console.log("保存草稿")
    }
    else {
      console.log("未保存")
    }
  }
});



const plugins = [
  gfm({
    locale:juejin_zh
  }),
  mathSsr({
    locale:juejin_zh
  }),
  mermaid({
    locale:juejin_zh
  }),
  frontMatter(),
  juejin_theme({
    theme: "github",
    highlight: "github"
  }),
  breaks(),
  highlightSsr(),
  mediumZoom(),
  gemoji(),

]
const handleChange = (value: string) => {
  content.value = value
  if (autoSave.value) {
    debouncedFn()
  }
}
const id = Date.now();
const debouncedFn = useDebounceFn(() => {
  let draft = {
    id: id,
    content: content.value,
    title: title.value || "未命名",
  }
  for (let i = 0; i < drafts.value.length; i++) {
    if (drafts.value[i].id === id) {
      drafts.value.splice(i, 1, draft)
      tips.value = "保存成功"
      useTimeoutFn(() => {
        tips.value = ""
      }, 2000)
      return;
    }
  }
  drafts.value.push(draft)
  tips.value = "保存成功"
  useTimeoutFn(() => {
    tips.value = ""
  }, 2000)
}, 5000)

const uploadImages = (files: File[]) => {
  // TODO... 上传文件的代码
  return [
    {
      title: files.map((i) => i.name),
      url: 'http' // 这里需要的是自己上传服务器返回的地址
    }
  ]
}

const changeTitle = () => {
  addFrontMatter("title", title.value, "未命名")
}
let local_category = ""
const addCategory = (category: string) => {
  if (local_category == category) {
    addFrontMatter("category", "", "")
    local_category = "";
  } else {
    addFrontMatter("category", category, "")
    local_category = category;
  }
}
const addTag = (tag: string) => {
  if (tags.value) {
    for (let i = 0; i < tags.value.length; i++) {
      if (tag === tags.value[i]) {
        tags.value.splice(i, 1);
        const frontmatterTags = yaml.dump(tags.value);
        if (tags.value.length == 0) {
          addFrontMatter("tags", "", "")
        } else {
          addFrontMatter("tags", frontmatterTags, "")
        }
        return;
      }
    }
  }
  tags.value?.push(tag)

  function removeDuplicates(arr: Array<string>) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  tags.value = removeDuplicates(tags.value || [])
  if (!tags.value) {
    addFrontMatter("tags", "", "")
  } else {
    addFrontMatter("tags", tags.value, "")
  }
}

const getFrontMatterJson = (content:string) : frontMatterInter | null=>{
  const frontmatterStart = content.indexOf('---');
  const frontmatterEnd = content.indexOf('---', frontmatterStart + 3);
  let frontmatter: frontMatterInter | null = null;
  if (frontmatterStart > -1 && frontmatterEnd > -1) {
    const frontmatterStr = content.substring(frontmatterStart + 3, frontmatterEnd);
    frontmatter = <frontMatterInter>yaml.load(frontmatterStr);
  }
  return frontmatter;
}

const addFrontMatter = (key: string, value: any, default_value: any) => {
  const frontmatterStart = content.value.indexOf('---');
  const frontmatterEnd = content.value.indexOf('---', frontmatterStart + 3);
  if (frontmatterStart > -1 && frontmatterEnd > -1) {
    const frontmatterStr = content.value.substring(frontmatterStart + 3, frontmatterEnd);
    const frontmatter = <frontMatterInter>yaml.load(frontmatterStr);
    if (value) {
      frontmatter[key] = value;
    } else {
      if (default_value) {
        frontmatter[key] = default_value
      } else {
        delete frontmatter[key]
      }
    }
    let temp = toRaw(content.value)
    content.value = "---\n" + yaml.dump(frontmatter) + "---" + temp.substring(frontmatterEnd + 3)
  }
}

const showAddProperty = (type: string) => {
  addDialog.value?.show()
  addType.value = type
}
const addProperty = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  showLoading.value = true
  if (addType.value == 'cover') {
    addFrontMatter("cover", input_property.value, "请填写")
    showLoading.value = false
    input_property.value = ""
    addDialog.value?.close()
  }
  else if (addType.value == 'desc') {
    addFrontMatter("desc", input_property.value, "请填写")
    showLoading.value = false
    input_property.value = ""
    addDialog.value?.close()
  }
  else if (addType.value == 'category'){
    fetch(baseUrl+"/api/data/replacedata",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+token.token
      },
      body: JSON.stringify({
        category: input_property.value,
      })
    }).then(res=>{
      if (res.ok){
        res.json().then((data)=>{
          if (data.msg == 'success'){
            fetch(baseUrl+"/api/data/getdata").then(res=>{
              res.json().then((data)=>{
                dataStore.setCategoryLists(data[0].categories);
                input_property.value = ""
                addDialog.value?.close()
                showLoading.value = false
              })
            })
          }
        })
      }
      else if(res.status == 401){
        toast.error("未登录，或登录过期了")
        showLoading.value = false
      }
    })
  }
  else if (addType.value == 'tag'){
    const token = JSON.parse(localStorage.getItem('token'))
    fetch(baseUrl+"/api/data/replacedata",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+token.token
      },
      body: JSON.stringify({
        tag: input_property.value,
      })
    }).then(res=>{
      if (res.ok){
        res.json().then((data)=>{
          if (data.msg == 'success'){
            fetch(baseUrl+"/api/data/getdata").then(res=>{
              res.json().then((data)=>{
                dataStore.setTagsLists(data[0].tags);
                input_property.value = ""
                addDialog.value?.close()
                showLoading.value = false
              })
            })
          }
        })
      }
      if(res.status == 401){
        toast.error("未登录，或登录过期了")
        showLoading.value = false
      }
    })
  }
}

const searchCategory = () =>{
  searchCategoryList.value = []
  dataStore.categoryLists.forEach((item:string) => {
    if (item.includes(searchContent.value)){
      searchCategoryList.value.push(item)
    }
  })
}

const searchTag = () =>{
  searchTagList.value = []
  dataStore.tagsLists.forEach((item:string) => {
    if (item.includes(searchTagContent.value)){
      searchTagList.value.push(item)
    }
  })
}

const publish = (update:boolean) => {
  const frontmatterStart = content.value.indexOf('---');
  const frontmatterEnd = content.value.indexOf('---', frontmatterStart + 3);
  if (frontmatterStart > -1 && frontmatterEnd > -1) {
    const frontmatterStr = content.value.substring(frontmatterStart + 3, frontmatterEnd);
    const frontmatter = <frontMatterInter>yaml.load(frontmatterStr);
    const count_chars = _.countBy(content.value.substring(frontmatterEnd+3))
    let words = 0
    for (let countCharsKey in count_chars) {
      if (!isPunctuationChar(countCharsKey)){
        words += count_chars[countCharsKey]
      }
    }
    addFrontMatter("words", words, 0);
    const start = content.value.indexOf('---');
    const end = content.value.indexOf('---', frontmatterStart + 3);
    const new_frontmatter = <frontMatterInter>yaml.load(content.value.substring(start + 3, end));
    if (words > 0){
      let url = baseUrl+"/api/papers/addpaper";
      let bodyData = JSON.stringify({
        ...new_frontmatter,
        content: content.value,
      })
      if(update){
        url = baseUrl+"/api/papers/updatepaper";
        bodyData = JSON.stringify({
          paper:{
            ...new_frontmatter,
            content: content.value,
          },
          paperid: adminStore.editPaperId
        })
      }
      fetch(url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+ systemStore.token.token
        },
        body: bodyData
      }).then(res=>{
        if (res.ok){
          if (update){
            toast.success("更新成功")
            res.json().then((data)=>{
              console.log(data)
            })
          }
          else{
            toast.success("发布成功")
          }
          content.value = ""
          adminStore.setNowPage("home")
          get_json(baseUrl + `/api/papers/getpaperslimit?limit=${config.page_size}`, {}).then(res => {
            paperStore.setPapers(res)
          })
          fetch(baseUrl+"/api/papers").then((res)=>{
            res.json().then((data)=>{
              paperStore.setTotalPapers(data)
            })
          })
        }
        else if(res.status == 401){
          toast.error("未登录，或登录过期了")
        }
      })
    }
    else{
      toast.error("还没有输入内容")
    }
  }
}

function isPunctuationChar(char:string) {
  const punctuationRegex = /[!\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u00A1-\u00BF\u2010-\u206F\u2E00-\u2E7F\u3000-\u303F\n \t\r]/;
  return punctuationRegex.test(char);
}
</script>

<style scoped>

</style>