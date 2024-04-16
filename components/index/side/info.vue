<template>
  <div class="card w-full bg-base-100 shadow-xl image-full group">
    <figure><img class="group-hover:scale-105 transition duration-300 origin-center" :src="systemStore.settings.admin_info?.bgcover" alt="Shoes" /></figure>
    <div class="card-body">
      <div class="w-fit flex group-hover:translate-x-full transition duration-500">
        <span class="font-semibold text-xl group-hover:scale-150 transition duration-500">{{ systemStore.settings.admin_info?.name }}</span>
      </div>
      <div class="info relative w-full flex flex-col justify-center overflow-y-scroll">
        <div class="w-full text-center flex justify-center absolute origin-center scale-0 group-hover:scale-100 group-hover:translate-y-0 translate-y-10 transition duration-500">
          {{systemStore.settings.admin_info?.bio}}
        </div>
        <div class="w-full flex justify-center absolute origin-center group-hover:scale-0 group-hover:translate-y-10 transition duration-500">
          <div class="avatar">
            <div class="w-28 mask mask-squircle">
              <img :src="systemStore.settings.admin_info?.avatar" />
            </div>
          </div>
        </div>
      </div>
      <div class="card-actions justify-between items-center">
        <a :href="systemStore.settings.admin_info?.github" target="_blank" class="btn btn-circle btn-ghost hover:bg-primary">
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
        </a>
        <a :href="'mailto:'+systemStore.settings.admin_info?.email" class="btn btn-circle btn-ghost hover:bg-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </a>
        <a :href="systemStore.settings.admin_info?.tiktok" target="_blank" class="btn btn-circle btn-ghost hover:bg-primary">
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M232 80v40a8 8 0 0 1-8 8a103.25 103.25 0 0 1-48-11.71V156a76 76 0 0 1-152 0c0-36.9 26.91-69.52 62.6-75.88A8 8 0 0 1 96 88v42.69a8 8 0 0 1-4.57 7.23A20 20 0 1 0 120 156V24a8 8 0 0 1 8-8h40a8 8 0 0 1 8 8a48.05 48.05 0 0 0 48 48a8 8 0 0 1 8 8"/></svg>
        </a>
        <a :href="systemStore.settings.admin_info?.bilibili" target="_blank" class="btn btn-circle btn-ghost hover:bg-primary">
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 0 1 1.767-1.768l2.652 2.652c.079.079.145.165.198.257h3.213c.053-.092.12-.18.199-.258l2.651-2.652a1.25 1.25 0 0 1 1.768 0m.027 5.42H5.75a1.25 1.25 0 0 0-1.247 1.157l-.003.094v7.5c0 .659.51 1.198 1.157 1.246l.093.004h12.5a1.25 1.25 0 0 0 1.247-1.157l.003-.093v-7.5c0-.69-.56-1.25-1.25-1.25m-10 2.5c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25m7.5 0c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25"/></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useSystemStore} from "~/stores/systemStore";

const systemStore = useSystemStore();
</script>

<style scoped>
.info{
  height: 200px;
}
</style>