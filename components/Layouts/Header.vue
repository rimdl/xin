<template>
  <div :class="y-100>0?'backdrop-blur-xl shadow-sm':'bg-opacity-0'" class="transition duration-500 navbar bg-base-200 flex justify-between">
    <div class="flex-1 justify-start space-x-2">
        <div class="relative group ml-2 text-xl">
          <img v-if="!systemStore.music" src="../../public/x_logo.svg" class="w-8 h-8" :class="systemStore.music && !systemStore.pinMore?'animate-pulse':''" alt="xin">
          <svg v-if="systemStore.music" class="w-8 animate-pulse text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M10 21q-1.65 0-2.825-1.175T6 17q0-1.65 1.175-2.825T10 13q.575 0 1.063.138t.937.412V3h6v4h-4v10q0 1.65-1.175 2.825T10 21"/></svg>
          <div :class="systemStore.pinMore? '':'scale-0 opacity-0'" class="absolute top-8 left-0 group-hover:scale-100 group-hover:opacity-100 transition duration-500 origin-top-left">
            <HeaderMore/>
          </div>
        </div>
    </div>
    <transition name="my_bounce" mode="out-in">
      <div v-if="chageTitle && router.path.startsWith('/read')"
           class="flex-1 justify-center space-x-4 font-bold overflow-hidden flex-nowrap">
        <p class="text-center">{{ systemStore.nowPaper['title'] }}</p>
      </div>
      <div v-else class="flex-1 justify-center space-x-4 max-sm:hidden">

        <NuxtLink to="/">
          <div
              class="flex items-center rounded-full space-x-1 cursor-pointer hover:bg-gray-50 hover:-translate-y-1 transition duration-300 p-2">
            <label class="cursor-pointer font-semibold">
              主页
            </label>
          </div>
        </NuxtLink>
        <NuxtLink to="/categories">
          <div
              class="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 hover:-translate-y-1 transition duration-300 p-2 rounded-full">

            <label class="cursor-pointer font-semibold">
              分类
            </label>
          </div>
        </NuxtLink>
        <NuxtLink to="/tags">
          <div
              class="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 hover:-translate-y-1 transition duration-300 p-2 rounded-full">

            <label class="cursor-pointer font-semibold">
              标签
            </label>
          </div>
        </NuxtLink>
        <NuxtLink to="/archives">
          <div
              class="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 hover:-translate-y-1 transition duration-300 p-2 rounded-full">

            <label class="cursor-pointer font-semibold">
              归档
            </label>
          </div>
        </NuxtLink>

        <NuxtLink to="/addpaper">
          <div
              class="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 hover:-translate-y-1 transition duration-300 p-2 rounded-full">

            <label class="cursor-pointer font-semibold">
              添加
            </label>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin">
          <div
              class="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 hover:-translate-y-1 transition duration-300 p-2 rounded-full">

            <label class="cursor-pointer font-semibold">
              管理
            </label>
          </div>
        </NuxtLink>

      </div>
    </transition>
    <div class="flex-1 justify-end">
      <div class="max-sm:hidden flex items-center space-x-4">
        <div @click="showDialog"
             class="w-full flex items-center space-x-1 cursor-pointer hover:-translate-y-1 transition duration-500 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>
          <label class="cursor-pointer font-semibold">
            搜索
          </label>
        </div>
        <div class="tooltip tooltip-bottom" data-tip="切换主题">
          <label class="swap swap-rotate">

            <!-- this hidden checkbox controls the state -->
            <input type="checkbox" class="theme-controller" v-model="theme"/>

            <!-- sun icon -->
            <svg class="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
            </svg>

            <!-- moon icon -->
            <svg class="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
            </svg>

          </label>
        </div>
        <div class="">&nbsp;</div>
      </div>
      <div class="dropdown dropdown-hover dropdown-bottom dropdown-end md:hidden lg:hidden sm:hidden max-sm:display">
        <div tabindex="0" role="button" class="m-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
          </svg>

        </div>
        <ul tabindex="0" class="dropdown-content z-40 menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <NuxtLink to="/">
              <div
                  class="flex justify-center items-center space-x-1 cursor-pointer hover:-translate-y-1 transition duration-500 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                </svg>
                <label class="cursor-pointer text-lg font-semibold">
                  主页
                </label>
              </div>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/categories">
              <div
                  class="flex items-center space-x-1 cursor-pointer hover:-translate-y-1 transition duration-500 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor"
                     class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
                <label class="cursor-pointer text-lg font-semibold">
                  分类
                </label>
              </div>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/tags">
              <div
                  class="flex items-center space-x-1 cursor-pointer hover:-translate-y-1 transition duration-500 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor"
                     class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z"/>
                </svg>
                <label class="cursor-pointer text-lg font-semibold">
                  标签
                </label>
              </div>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/archives">
              <div
                  class="w-full flex items-center space-x-1 cursor-pointer hover:-translate-y-1 transition duration-500 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor"
                     class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"/>
                </svg>
                <label class="cursor-pointer text-lg font-semibold">
                  归档
                </label>
              </div>
            </NuxtLink>
          </li>
          <li @click="showDialog">
            <a>
              <div
                  class="w-full flex items-center space-x-1 cursor-pointer hover:-translate-y-1 transition duration-500 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                </svg>
                <label class="cursor-pointer text-lg font-semibold">
                  搜索
                </label>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <dialog class="modal" ref="modal">
    <div class="modal-box space-y-4">
      <div class="flex justify-between">
        <h3 class="font-bold text-lg text-primary">
          搜索
        </h3>
        <div class="flex items-center font-semibold">
          <div v-if="showTip" class="flex items-center">
            <svg class="w-6 h-6 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"/>
            </svg>
            <span class="animate-pulse">搜索中...</span>
          </div>
          <div class="flex items-center">
            <img v-if="!showTip" src="../../public/x_logo.svg" class="w-4 opacity-50" alt="">
            <span v-if="!showTip" class="opacity-50 ml-2">关闭</span>
            <button @click="closeModal" class="brn btn-circle btn-sm btn-ghost flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <hr>
      <div>
        <label class="input input-bordered input-primary flex items-center gap-2">
          <input class="grow "  type="text" @input="inputTextChange" v-model="inputText" placeholder="输入搜索内容..."/>
          <svg @click="search" class="w-4 h-4 opacity-70 hover:scale-105 hover:opacity-100 transition duration-300 cursor-pointer"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"/>
          </svg>
        </label>
      </div>
      <div v-if="searchTitles.length+searchDesc.length+searchContent.length+searchAuthor.length" class="max-h-96 overflow-y-scroll border border-primary rounded-lg p-1">
        <div v-if="searchTitles.length">
          <div>
            <h1>标题</h1>
            <hr>
          </div>
          <div class="rounded-lg mt-1">
            <div class="p-1 cursor-pointer"
                 v-for="(item,index) in searchTitles">
              <NuxtLink :to="`/read${item['_id']['$oid']}`" @click="closeModal">
                <div class="w-full space-x-2 p-1 bg-base-200 bg-opacity-50 rounded hover:-translate-y-0.5 transition duration-300">
                  <div class="font-semibold">
                    <span>{{ index + 1 }}.</span><span>标题：{{item.title}}</span>
                  </div>
                  <div class="flex flex-shrink-0 text-sm">
                    <span class="whitespace-nowrap">匹配内容：</span>
                    <p class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{{ item.title.toString().substring(0, 50) }}</p>
                  </div>
                </div>
              </NuxtLink>
            </div>

          </div>
        </div>
        <div v-if="searchContent.length">
          <div>
            <h1>内容</h1>
            <hr>
          </div>
          <div class="rounded-lg mt-1">

            <div class="p-1 cursor-pointer"
                 v-for="(item,index) in searchContent">
              <NuxtLink :to="`/read${item['_id']['$oid']}`" @click="closeModal">
                <div class="w-full space-x-2 p-1 bg-base-200 bg-opacity-50 rounded hover:-translate-y-0.5 transition duration-300">
                  <div class="font-semibold">
                    <span>{{ index + 1 }}.</span><span>标题：{{item.title}}</span>
                  </div>
                  <div class="flex flex-shrink-0 text-sm">
                    <span class="whitespace-nowrap">匹配内容：</span>
                    <p class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{{ item.content.toString().substring(0, 50) }}</p>
                  </div>
                </div>
              </NuxtLink>
            </div>

          </div>
        </div>
        <div v-if="searchDesc.length">
          <div>
            <h1>描述</h1>
            <hr>
          </div>
          <div class="rounded-lg mt-1">

            <div class="p-1 cursor-pointer"
                 v-for="(item,index) in searchDesc">
              <NuxtLink :to="`/read${item['_id']['$oid']}`">
                <div class="w-full space-x-2 p-1 bg-base-200 bg-opacity-50 rounded hover:-translate-y-0.5 transition duration-300">
                  <div class="font-semibold">
                    <span>{{ index + 1 }}.</span><span>标题：{{item.title}}</span>
                  </div>
                  <div class="flex flex-shrink-0 text-sm">
                    <span class="whitespace-nowrap">匹配内容：</span>
                    <p class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{{ item.desc.toString().substring(0, 50) }}</p>
                  </div>
                </div>
              </NuxtLink>
            </div>

          </div>
        </div>
        <div v-if="searchAuthor.length">
          <div>
            <h1>作者</h1>
            <hr>
          </div>
          <div class="rounded-lg mt-1">

            <div class="p-1 cursor-pointer"
                 v-for="(item,index) in searchAuthor">
              <NuxtLink :to="`/read${item['_id']['$oid']}`" @click="closeModal">
                <div class="w-full space-x-2 p-1 bg-base-200 bg-opacity-50 rounded hover:-translate-y-0.5 transition duration-300">
                  <div class="font-semibold">
                    <span>{{ index + 1 }}.</span><span>标题：{{item.title}}</span>
                  </div>
                  <div class="flex flex-shrink-0 text-sm">
                    <span class="whitespace-nowrap">匹配内容：</span>
                    <p class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{{ item?.author.toString().substring(0, 50) }}</p>
                  </div>
                </div>
              </NuxtLink>
            </div>

          </div>
        </div>
      </div>
      <div v-if="searchTitles.length+searchDesc.length+searchContent.length+searchAuthor.length">
        <span class="text-xs">搜索到&nbsp;<span>{{searchTitles.length+searchDesc.length+searchContent.length+searchAuthor.length}}</span>&nbsp;条结果，耗时{{(totalTime/1000).toFixed(1)}}s。</span>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop bg-base-100 bg-opacity-60 backdrop-blur">
      <button @click="closeModal">close</button>
    </form>
  </dialog>

</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useSystemStore} from "~/stores/systemStore";
import {useWindowScroll} from '@vueuse/core';
import {useRoute} from "vue-router";
import {get_json} from "~/utils/fetch_tools";
import config from "~/public/config.json"

const baseUrl = config.baseUrl;
const router = useRoute();
const {x, y} = useWindowScroll();

const systemStore = useSystemStore();
const theme = ref(true);
const modal = ref<HTMLDialogElement>();
const chageTitle = ref(false);
const searchTitles = ref([]);
const searchContent = ref([]);
const searchDesc = ref([]);
const searchAuthor = ref([]);
const inputText = ref("");
const showTip = ref(false);
const totalTime = ref(0);

const showDialog = () => {
  modal.value?.showModal()
}


onBeforeMount(() => {
  const localTheme = localStorage.getItem("theme")
  if (localTheme) {
    systemStore.setTheme(localTheme);
    if (localTheme === 'light') {
      theme.value = true
    } else if (localTheme === 'dark') {
      theme.value = false
    }
  }
})

watch(() => theme.value, () => {
  systemStore.setTheme(theme.value ? 'light' : 'dark')
  localStorage.setItem('theme', theme.value ? 'light' : 'dark')
})

watch(y, (nv, ov) => {
  if (router.path.startsWith("/read")) {
    if (nv > ov) {
      chageTitle.value = true;
    } else {
      chageTitle.value = false;
    }
  }
})

type DebounceCallback = (...args: any[]) => void;

function debounce(fn: DebounceCallback, delay: number): DebounceCallback {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<DebounceCallback>): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, args as any);
      timeoutId = null;
    }, delay);
  };
}

const inputTextChange = () => {
  if (inputText.value !== "") {
    search()
  } else {
    showTip.value = false;
    searchTitles.value = []
    searchDesc.value = []
    searchContent.value = []
    searchAuthor.value = []
  }
}

const search = debounce(function () {
  const nowTime = Date.now();
  searchTitles.value = []
  searchDesc.value = []
  searchContent.value = []
  searchAuthor.value = []
  showTip.value = true;
  if (inputText.value !== "") {
    get_json(baseUrl + '/api/papers/searchpapers?col=title&keyword=' + inputText.value, {}).then(res => {
      searchTitles.value = res
      get_json(baseUrl + '/api/papers/searchpapers?col=content&keyword=' + inputText.value, {}).then(res => {
        searchContent.value = res
        get_json(baseUrl + '/api/papers/searchpapers?col=desc&keyword=' + inputText.value, {}).then(res => {
          searchDesc.value = res
          get_json(baseUrl + '/api/papers/searchpapers?col=author&keyword=' + inputText.value, {}).then(res => {
            searchAuthor.value = res
            showTip.value = false;
            const endTime = Date.now();
            totalTime.value = endTime - nowTime;
          })
        })
      })
    })
  }
}, 1000)

const closeModal = () =>{
  modal.value?.close();
  searchTitles.value = []
  searchDesc.value = []
  searchContent.value = []
  searchAuthor.value = []
  inputText.value = ""
}
</script>

<style scoped>

</style>