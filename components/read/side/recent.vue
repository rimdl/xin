<template>
<div class="rounded-md p-5 bg-base-200">
  <div class="flex justify-between">
    <div class="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
      <h1 class="font-bold text-lg">最新文章</h1>
    </div>
    <div>
      <NuxtLink to="/archives">
      <div class="rounded-lg p-1 hover:bg-base-100 transition duration-500 flex items-center group">
        <span class="scale-0 w-0 overflow-hidden whitespace-nowrap group-hover:w-fit group-hover:scale-100 transition duration-500">全部</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
        </svg>
      </div>
      </NuxtLink>
    </div>
  </div>


  <div v-for="item in newPapers">
    <NuxtLink :to="'/read'+item._id['$oid']">
    <div class="flex items-center space-x-2 rounded-xl hover:bg-primary hover:text-primary-content group p-3 transition duration-300">
      <div class="avatar online">
        <div class="w-16 mask mask-hexagon">
          <img :src="item.cover" />
        </div>
      </div>
      <div>
        <div class="max-h-20 overflow-y-hidden w-full">
          <h1 class="font-bold text-lg">{{item['title']}}</h1>
          <p class="w-full">{{item.desc}}</p>
        </div>
        <div class="flex justify-end mr-4">
          <div class="badge badge-outline">{{ item['category'] }}</div>
        </div>
      </div>
    </div>
    </NuxtLink>
  </div>
</div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {type paperInter} from "~/types";
import config from '../../../public/config.json'
import {getPapers} from "~/utils/getPapers";

const newPapers = ref<paperInter[]>([])

let baseUrl = config.baseUrl;

onMounted(async () => {
  let papers = await getPapers(baseUrl+"/api/papers/getpaperslimit?limit=4",{});
  newPapers.value = papers
})
</script>

<style scoped>

</style>