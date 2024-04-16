

<template>
  <div class=" stats bg-base-300 stats-vertical text-primary-content">
    <div class="stat place-items-center">
      <div class="w-full chat chat-start">
        <div class="chat-bubble">文章总数</div>
      </div>
      <div class="stat-value text-primary">{{ paperStore.total_papers }} <span class="text-2xl">articles</span></div>
    </div>
    <div class="stat place-items-center">
      <div class="w-full chat chat-start">
        <div class="chat-bubble">总字数</div>
      </div>
      <div class="stat-value text-primary">{{ totalText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useDataStore} from "~/stores/dataStore";
import {usePaperStore} from "~/stores/paperStore";
import {countCollection} from "~/utils/countCollection";
import {get_json} from "~/utils/fetch_tools";
import config from "~/public/config.json"

const dataStore = useDataStore();
const paperStore = usePaperStore();

const baseUrl = config.baseUrl

const totalText =ref<string>("")


onMounted(()=>{
  countCollection(baseUrl+'/api/papers', {}).then(res=>{
    paperStore.setTotalPapers(res)
  })
  get_json(baseUrl+'/api/papers/getpaperswords', {}).then(res=>{
    let total = 0;
    for (let i = 0; i < res.length; i++) {
     total+=parseInt(res[i]['words'])
    }
    totalText.value = formatNumberWithSuffix(total)
  })
})

function formatNumberWithSuffix(num:number):string {
  if (num < 1000) {
    return num.toString();
  } else if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'K';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  else return ""
}
</script>

<style scoped>

</style>