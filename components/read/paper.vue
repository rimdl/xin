<template>
  <Head>
    <Title>{{ paper?.title ? paper?.title : 'XIN' }}</Title>
  </Head>
  <div>
    <div v-if="showSkeleton" class="flex flex-col gap-4 w-full">
      <div class="skeleton h-32 w-full"></div>
      <div class="skeleton h-4 w-28"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
    </div>
  </div>
  <div v-if="!showSkeleton" ref="paperMain" class="w-full">
    <div class="space-y-4 w-full sm:rounded-2xl bg-cover max-w-sm:rounded-0"
         :style="'background-image: url('+paper?.cover+');'">
      <div
          class="px-5 py-20 hover:backdrop-blur-0 backdrop-blur-xl transition duration-500 sm:rounded-2xl max-w-sm:rounded-0">
        <div class="flex space-x-4 items-center flex-wrap">
          <button class="btn btn-primary bg-opacity-30 border-0 rounded-2xl text-lg">原创内容</button>
          <button class="btn btn-primary bg-opacity-30 border-0 rounded-2xl text-lg">{{ paper?.category }}</button>
          <div class="p-1 space-x-1">
            <div class=" badge bg-opacity-30 border-0 hover:bg-opacity-100 transition duration-500 text-xl h-full"
                 v-for="tag in paper?.tags"># {{ tag }}
            </div>
          </div>
        </div>
        <div class="mt-4">
          <h1 class="mb-5 text-7xl font-bold break-words">{{ paper?.title }}</h1>
        </div>
        <div class="flex flex-wrap space-x-4 items-center">
          <div data-tip="发布日期"
               class="tooltip flex items-center space-x-1 hover:bg-base-300 hover:text-base-content rounded-xl transition duration-300 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
            </svg>

            <span class="text-sm">{{ paper?.date }}</span>
          </div>
          <div @click="scrollDownOneScreen('xin_comment')" data-tip="评论"
               class="tooltip cursor-pointer flex items-center space-x-1 hover:bg-base-300 hover:text-base-content rounded-xl transition duration-300 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
            </svg>
            <span>{{ paperStore.comment_count }}</span>
          </div>
          <div data-tip="字数"
               class="tooltip flex items-center space-x-1 hover:bg-base-300 hover:text-base-content rounded-xl transition duration-300 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"/>
            </svg>
            <span>{{ paper?.words }} word</span>
          </div>
          <div data-tip="预计用时"
               class="tooltip flex items-center space-x-1 hover:bg-base-300 hover:text-base-content rounded-xl transition duration-300 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>
            <span>{{ need_time }} min</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-primary" @click="test">test</button>
    </div>
    <div class="relative w-full border border-base-300 bg-base-100 mt-2 rounded-md p-3 flex mb-16">

      <Viewer ref="viewerRef" :value="paper?.content" :plugins="plugins" v-viewer/>
    </div>
  </div>
  <div class="mt-16">
    <ReadPaperCopyright :author="paper?.author"/>
  </div>
  <div class="mt-2">
    <ReadPaperComment :id="props.id" :title="paper?.title"/>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from 'vue';
import {type paperInter, type treeInter} from "~/types";
import {marked} from "marked";
import {mdPreManage} from "~/utils/mdPreManage";
import {getTopic} from "~/utils/getTopic";
import config from "../../public/config.json";
import {getPaperById} from "~/utils/getPaperById";
import {useTopicStore} from "~/stores/topicStore";
import {useSystemStore} from "~/stores/systemStore";
import {useElementSize} from '@vueuse/core';
import {usePaperStore} from "~/stores/paperStore";
import {Viewer} from "@bytemd/vue-next";
import frontMatter from "@bytemd/plugin-frontmatter";
import juejin_theme from "~/utils/juejin_theme";
import breaks from "@bytemd/plugin-breaks";
import highlightSsr from "@bytemd/plugin-highlight-ssr";
import gfm from "@bytemd/plugin-gfm";
import mathSsr from "@bytemd/plugin-math-ssr";
import gemoji from "@bytemd/plugin-gemoji";
import mermaid from "@bytemd/plugin-mermaid";
import {getProcessor} from "bytemd";


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

const viewerRef = ref()
const systemStore = useSystemStore();
const topicStore = useTopicStore();
const paperStore = usePaperStore();
const paper = ref<paperInter>()

const paperMain = ref<HTMLDivElement>()
const articleElement = ref()
const need_time = ref(0)

const props = defineProps({
  id: String
})
const markedText = ref('')
const showSkeleton = ref(true)


onMounted(() => {

  getPaperById(config.baseUrl + '/api/papers/getpaperbyid?_id=' + props.id, {}).then(res => {
    paper.value = res;

    if (paper.value?.words) {
      need_time.value = Math.ceil(paper.value?.words / 750)
    }
    systemStore.setNowPaper(res);
    // const html = marked(paper.value?.content as string) as string
    // markedText.value = mdPreManage(html);

    let topics = getTopic(markedText.value);

    topicStore.setTopics(topics);
    showSkeleton.value = false;
    const {height} = useElementSize(paperMain)
    setTimeout(() => {
      if (paperMain.value) {
        systemStore.setPaperHeight(height)
      }
    }, 1000)
  });


  setTimeout(() => {
    let btnCopys = document.querySelectorAll('.copyBtn');
    btnCopys.forEach((btn: Element | HTMLButtonElement, key: number, parent: NodeListOf<Element>) => {
      if (btn.parentElement?.previousElementSibling && "innerText" in btn.parentElement?.previousElementSibling) {
        btn.addEventListener("click", function () {
          let temp = btn.parentElement?.previousElementSibling as HTMLElement;
          let codeText = temp.innerText
          navigator.clipboard.writeText(codeText).then(() => {
            btn.parentElement?.setAttribute('data-tip', '复制成功');
            setTimeout(() => {
              btn.parentElement?.setAttribute('data-tip', '复制代码');
            }, 2000)
          })
        })
      }
    })
    // hljs.highlightAll();
  }, 1000);
})

function scrollDownOneScreen(id: string) {
  const targetElement = document.getElementById(id);
  if (targetElement) {
    targetElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}



const test = ()=>{
  let hast
  getProcessor({
    plugins: [
      {
        rehype: (p) =>
            p.use(() => (tree:Node) => {
              hast = tree
            }),
      },
    ],
  }).processSync(viewerRef.value);

  console.log(hast)
}

watch(()=>viewerRef.value, (newValue) => {
  const trees = getTree(newValue)
  if (trees){
    let tocs = [];
    let index = 0;
    console.log(trees)
    for (let i = 0; i < trees.children.length; i++) {
      if (trees.children[i].type === 'element'){
        if (trees.children[i].tagName === 'h1'){
          const toc = {
            id: "heading-"+index,
            text:trees.children[i].children[0].value,
            level: 1,
          }
          index++;
          tocs.push(toc)
        }
        else if (trees.children[i].tagName === 'h2'){
          const toc = {
            id: "heading-"+index,
            text:trees.children[i].children[0].value,
            level: 2,
          }
          index++;
          tocs.push(toc)
        }
        else if (trees.children[i].tagName === 'h3'){
          const toc = {
            id: "heading-"+index,
            text:trees.children[i].children[0].value,
            level: 3,
          }
          index++;
          tocs.push(toc)
        }
        else if (trees.children[i].tagName === 'h4'){
          const toc = {
            id: "heading-"+index,
            text:trees.children[i].children[0].value,
            level: 4,
          }
          index++;
          tocs.push(toc)
        }
        else if (trees.children[i].tagName === 'h5'){
          const toc = {
            id: "heading-"+index,
            text:trees.children[i].children[0].value,
            level: 5,
          }
          index++;
          tocs.push(toc)
        }
        else if (trees.children[i].tagName === 'h6'){
          const toc = {
            id: "heading-"+index,
            text:trees.children[i].children[0].value,
            level: 6,
          }
          index++;
          tocs.push(toc)
        }
      }
    }
    topicStore.setTopics(tocs)
  }

})

const getTree = (el:any):treeInter =>{
  let hast:treeInter = {};
  getProcessor({
    plugins: [
      {
        rehype: (p) =>
            p.use(() => (tree:treeInter) => {
              hast = tree
            }),
      },
    ],
  }).processSync(el);
  console.log(hast)
  for (let i = 0; i < hast.children.length; i++) {
    if (hast.children[i].type === 'element' && hast.children[i].tagName === 'h2'){
      if (hast.children[i].children[0].type === 'text'){
        if (hast.children[i].children[0].value){
          if (hast.children[i].children[0].value.indexOf('theme:')>-1){
            hast.children.splice(i,1)
            break;
          }

        }
      }
    }
  }

  return hast;
}


</script>

<style>
.markdown-body {
  width: 100%;
}
</style>