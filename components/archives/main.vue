<template>
  <div class="bg-base-100 shadow-2xl w-full h-fit rounded-xl p-2">
    <div class="text-3xl font-semibold">文章<sup class="text-gray-300 p-1">{{ totalPapers }}</sup></div>
    <div v-for="item in papers">
      <div class="divider" >{{item.year}}</div>
      <div class="flex p-3 items-center space-x-2 hover:bg-base-200 rounded-xl transition duration-300 group" v-for="paper_item in item.items">
        <NuxtLink :to="`/read${paper_item['_id']['$oid']}`">
        <img class="shadow-lg group-hover:scale-105 transition duration-300 min-w-40 max-w-40 h-24 object-cover rounded-xl" :src="paper_item.cover" alt="">
        </NuxtLink>
        <div class="space-y-4">
          <NuxtLink :to="`/read${paper_item['_id']['$oid']}`">
          <h1 class="font-semibold group-hover:text-primary">{{ paper_item.title }}</h1>
          </NuxtLink>
          <p class="text-sm">
            <span v-for="tag in paper_item.tags">
              <NuxtLink :to="'/tags?tag='+tag">
              <span class="text-gray-300">#</span>{{tag}}&nbsp;
              </NuxtLink>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="w-full">
      <div class="join flex justify-center">
        <input v-if="total_pages<=10 && total_pages >1" class="join-item btn btn-square" type="radio" name="options" :aria-label="item" v-for="item in total_pages" @click="change_page(item)" />
        <input v-if="total_pages>10" class="join-item btn btn-square" type="radio" name="options" :aria-label="item" v-for="item in 5" @click="change_page(item)" />

        <div v-if="total_pages>10" class="dropdown">
          <div tabindex="0">
            <button class="join-item btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </button>
          </div>
          <div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit">
            <label class="input input-bordered flex items-center gap-2">
              <input type="number" min="1" :max="total_pages" class="grow w-12" placeholder="Search" v-model="input_page" />
              <svg @click="change_page(input_page)" class="w-5 h-5 cursor-pointer hover:scale-105 transition duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>

            </label>
          </div>
        </div>
        <button v-if="total_pages>10" class="join-item btn btn-square">
          {{total_pages}}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {countCollection} from "~/utils/countCollection";
import config from '~/public/config.json';
import {get_json} from "~/utils/fetch_tools";
import type {paperInter} from "~/types";

const baseUrl = config.baseUrl;
const page_size = config.page_size;
const totalPapers = ref(0);
const total_pages = ref(0);
const input_page = ref(0);
const papers = ref();

onMounted(()=>{
  countCollection(baseUrl+'/api/papers', {}).then(res=>{
    totalPapers.value = res
    total_pages.value = Math.ceil(totalPapers.value / page_size)
  })
  getPapers(0)
})

const change_page = (num: number)=>{
  const skip = (num-1)*page_size;
  getPapers(skip);
  goToTop();
}

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const getPapers = (skip:number)=>{
  get_json(baseUrl+"/api/papers/getpaperslimit?limit="+config.page_size+"&sort=desc&skip="+skip,{}).then(res=>{
    papers.value = res
    const groupedByYear = res.reduce((acc: any[][], item: { date: string | number | Date; }) => {
      const year = new Date(item.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {});
    const sortedGroups = Object.entries(groupedByYear)
        .sort((a, b) => b[0] - a[0])
        .map(([year, items]) => ({ year, items }));
    papers.value = sortedGroups
  })
}
</script>

<style scoped>

</style>