<template>
  <div class=" w-full rounded-lg p-1 bg-base-100 border-base-300 border h-fit">
    <div class="px-2 flex justify-between">
      <span class="font-semibold text-xl">所有分类</span>
      <div @click="get_all_papers()" class="tooltip cursor-pointer" data-tip="全部">
        <svg  class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
        </svg>
      </div>
    </div>
    <div class="divider"></div>
    <div class="w-full font-semibold p-1">
      <div :class="systemStore.now_category == item ? 'bg-base-200' : ''" @click="filter_by_category(item)" class="group flex justify-between p-2 cursor-pointer hover:bg-base-200 transition duration-300 rounded-lg" v-for="item in dataStore.categoryLists">
        <span>{{item}}<sup class="text-xs text-gray-300"></sup></span>
        <span>
              <svg  class="w-5 h-5 group-hover:animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>

            </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useDataStore} from "~/stores/dataStore";
import {useSystemStore} from "~/stores/systemStore";
import {usePaperStore} from "~/stores/paperStore";
import {get_json} from "~/utils/fetch_tools";
import config from "public/config.json";
const dataStore = useDataStore();
const systemStore = useSystemStore();
const paperStore = usePaperStore();

const baseUrl = config.baseUrl;
const total_papers = ref(0)

const filter_by_category = (category:string) =>{
  systemStore.setNowCategory(category)
  systemStore.setLoading(true)
  get_json(baseUrl+`/api/papers?count_filter={"category":"${category}"}`,{}).then((res: number)=> {
    total_papers.value = res
    systemStore.setNotification({"msg":"该分类下共有"+res+"篇文章","type":"alert-success"})
    get_json(baseUrl + `/api/papers/getpapersbycategory?category=${category}&limit=${config.page_size}`, {}).then(res => {
      paperStore.setPapers(res)
      systemStore.setLoading(false)
    })
  }).catch(err=>{
    systemStore.setLoading(false)
  })
}

const get_all_papers =()=>{
  systemStore.setLoading(true)
  systemStore.setNowCategory("")
  get_json(baseUrl+"/api/papers/getpaperslimit?limit="+config.page_size+"&sort=desc",{}).then(res=>{
    paperStore.setPapers(res)
    systemStore.setLoading(false)
  }).catch(err=>{
    systemStore.setLoading(false)
  })
}

onMounted(()=>{
  get_all_papers()
})
</script>

<style scoped>

</style>