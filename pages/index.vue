<template>
  <div>
    <div class="w-full flex flex-col h-screen bg-cover" :style="bg_style">

      <LayoutsFirstPage class="flex-grow-1"/>
    </div>
    <div class="flex w-full px-16 py-10 max-sm:p-0 flex-wrap">
      <div class="flex flex-wrap xl:w-3/4 lg:w-3/4 md:w-full sm:w-full max-sm:w-full flex-col justify-start">
        <IndexPapers />
      </div>
      <div class="px-10 max-sm:p-1 xl:w-1/4 lg:w-1/4 md:w-full sm:w-full max-sm:w-full ">
        <IndexSide/>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {useSystemStore} from "~/stores/systemStore";
const systemStore = useSystemStore();
const bg_style = computed(() => {
  if (systemStore.settings.bgCover){
    for (let s of systemStore.settings.bgCover) {
      if (systemStore.theme.toString() === s.name.toString()){
        return "background-image: url('"+s.cover.toString()+"')";
      }
    }
  }
  else return "";
});

</script>

<style scoped>
</style>