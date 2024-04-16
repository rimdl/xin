<template>
  <div class="menu bg-base-200 rounded-md p-3" v-if="topicStore.topics.length>0">
    <div class="p-3 flex justify-between items-center">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
        <label class="text-lg font-semibold">目录</label>
      </div>
      <div class="flex-grow p-1">
        <progress v-if="y<=systemStore.paperHeight && y>0" class="progress progress-primary w-full" :value="(y/systemStore.paperHeight*100).toFixed(1)" max="100"></progress>
        <progress v-if="y>systemStore.paperHeight" class="progress progress-primary w-full" value="100" max="100"></progress>
      </div>
      <div>
        <span v-if="y<=systemStore.paperHeight && y>0">{{ (y/systemStore.paperHeight*100).toFixed(1) }}%</span>
        <span v-if="y>systemStore.paperHeight">100%</span>
      </div>
    </div>
    <div class="max-h-96 overflow-y-scroll">
      <ul class=" w-full rounded-box">
        <li v-for="item in topicStore.topics">
          <a @click="scrollDownOneScreen(item.id)">
            <span>{{ item.text }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup lang="ts">
import {useTopicStore} from "~/stores/topicStore";
import { useWindowScroll } from '@vueuse/core';
import {useSystemStore} from "~/stores/systemStore";
const systemStore = useSystemStore();
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
const { x, y } = useWindowScroll();

const topicStore = useTopicStore();

function scrollDownOneScreen(id:string) {
  const targetElement = document.getElementById(id);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}

</script>

<style scoped>

</style>