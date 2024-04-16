<template>
  <div>
    <p class="text-lg font-semibold">所有标签<sup class="text-gray-300">&nbsp;{{dataStore.tagsLists.length}}</sup></p>
    <div class="divider"></div>
    <div class="flex w-full flex-wrap">
      <div class="max-sm:w-full sm:w-1/4 flex flex-wrap h-fit">
        <div class="p-1">
          <button class="btn" :class="tagName=='全部'? 'btn-primary':''" @click="tagName = '全部'">全部</button>
        </div>
        <div class="p-1" v-for="item in dataStore.tagsLists">
          <button class="btn" :class="tagName==item? 'btn-primary':''" @click="tagName = item"><span>#</span> {{item}}</button>
        </div>
      </div>
      <div class="max-sm:w-full sm:w-3/4">
        <TagsPaperList :tagName="tagName"/>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {useDataStore} from "~/stores/dataStore";
import {defineProps} from "vue";

const dataStore = useDataStore();
const tagName = ref("")

const props = defineProps({
  tag: String
})


onBeforeMount(()=>{
  if (props.tag){
    tagName.value = props.tag
  }
})
</script>

<style scoped>

</style>