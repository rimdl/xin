

<template>
  <div class="mockup-window bg-base-300">
    <div class="flex justify-center flex-wrap px-4 bg-base-200 py-2">
      <label class="w-full boder border-b-2">标签({{dataStore.tagsLists.length}})</label>
      <div v-for="item in dataStore.tagsLists.slice(0,30)" class=" mt-1 ml-2 hover:scale-105 hover:shadow">
        <div class="indicator">
          <span class="indicator-item badge">{{ item.count }}</span>
          <button class="btn btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
            {{item.name}}
          </button>
        </div>

      </div>
      <div class="w-full mt-2">
        <button class="btn btn-outline btn-primary btn-sm w-full">查看全部标签</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useDataStore} from "~/stores/dataStore";

const dataStore = useDataStore();
</script>

<style scoped>

</style>