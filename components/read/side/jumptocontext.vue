<template>
  <div v-if="papers">推荐阅读</div>
  <div class="card w-full bg-base-100 shadow-xl image-full group" v-for="item in papers">
    <figure><img class="group-hover:scale-105 transition duration-300" :src="item.cover" alt="Shoes" /></figure>
    <div class="card-body w-full">
      <h2 class="card-title text-2xl">{{ item.title }}</h2>
      <p class="text-lg h-10 overflow-hidden">{{item.desc}}</p>
      <div class="card-actions justify-center">
        <NuxtLink :to="`/read${item['_id']['$oid']}`">
        <button class="btn btn-primary">点击浏览</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted,defineProps} from "vue"
import {get_json} from "~/utils/fetch_tools";
import config from "public/config.json";
import type {paperInter} from "~/types";

const props = defineProps({
  id:String
})

const baseUrl = config.baseUrl
const papers = ref<paperInter[]>()

function getRandomIntInclusive(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

onMounted(()=>{
  const skip = 0;

  get_json(baseUrl+'/api/papers/getpaperbyid?_id=' + props.id, {}).then(paper=>{
    console.log(paper[0].tags)
    const tagsLength = paper[0].tags.length;
    let index = 0;
    if (tagsLength){
      index = getRandomIntInclusive(1,tagsLength);
    }
    const tagName = paper[0].tags[index];
    get_json(baseUrl+"/api/papers/getpapersbytag?tag="+tagName+"&limit=1&sort=desc&skip="+skip,{}).then(res=>{
      if (res.length<=1){
        get_json(baseUrl+"/api/papers/getpaperslimit?limit=3&sort=desc",{}).then(res=>{
          if (res.length){
            for (let i = 0; i < res.length; i++) {
              if (res[i]._id.$oid == props.id){
                res.splice(i,1);
                break;
              }
            }
            papers.value = res
          }
        })
      }
      else {
        if (res.length){
          for (let i = 0; i < res.length; i++) {
            if (res[i]._id.$oid == props.id){
              res.splice(i,1);
              break;
            }
          }
          papers.value = res
        }
      }
    })
  })
})

</script>

<style scoped>

</style>