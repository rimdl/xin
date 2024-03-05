<template>
  <div class="w-full flex flex-row flex-wrap">
    <div class="w-full">
      <ul class="menu bg-base-200 lg:menu-horizontal rounded-box">
        <li class="bg-primary rounded">
          <a class="text-base-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            分类
          </a>
        </li>
        <li v-for="item in dataStore.categoryLists.slice(0, 10)">
          <a>
            {{item.name}}
            <span class="badge badge-sm">{{item.count}}</span>
          </a>
        </li>
        <li class="bg-base-100 rounded">
          <a>
            更多
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>


          </a>
        </li>
      </ul>
    </div>
    <div v-for="item in paperStore.papers" :key="item.id"
         class="p-5 max-sm:p-1 mt-2 md:w-1/2 sm:w-full max-sm:w-full lg:w-1/2 xl:w-1/2">
      <div class=" card glass group hover:bg-base-200 hover:shadow transition duration-500">
        <figure><img class="w-full h-72 transition duration-500 group-hover:scale-105" :src="item.cover" alt="car!"/></figure>
        <div class="card-body">
          <div class="flex justify-between">
            <div class="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
              <span class="font-extralight text-sm">{{item.categories}}</span>
            </div>
            <div class="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span class="font-extralight text-xs">{{item.date}}</span>
            </div>
          </div>
          <h2 class="card-title group-hover:text-primary">{{ item.title }}</h2>
          <p class="overflow-ellipsis w-full whitespace-nowrap overflow-hidden group-hover:text-primary"
             v-text="item.desc ? item.desc : item.content"></p>
          <div class="card-actions items-center justify-between">
            <div class="space-x-1 w-3/5 overflow-hidden overflow-ellipsis whitespace-nowrap">
              <span v-for="i in item.tags" >
              <span class="font-semibold text-sm">#</span>
                {{i}}
              </span>
            </div>
            <div class="w-1/5">
              <button class="btn btn-primary btn-sm justify-end">阅读</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="join flex justify-center">
        <button class="join-item btn">1</button>
        <button class="join-item btn">2</button>
        <button class="join-item btn">3</button>
        <button class="join-item btn">4</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePaperStore} from "~/stores/paperStore";
import {useDataStore} from "~/stores/dataStore";
const paperStore = usePaperStore();
const dataStore = useDataStore();

</script>

<style scoped>

</style>