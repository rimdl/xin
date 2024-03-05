<template>
  <div :data-theme="systemStore.theme" >
    <NuxtPage/>
    <LayoutsFooter/>
  </div>
</template>
<script setup lang="ts">
import {useSystemStore} from "~/stores/systemStore";
import {usePaperStore} from "~/stores/paperStore";
import {useDataStore} from "~/stores/dataStore";
import {getPapers} from "~/utils/getPapers";
import {getDatas} from "~/utils/getDatas";
import {getSystemSettings} from "~/utils/getSystemSettings";

const systemStore = useSystemStore();
const paperStore = usePaperStore();
const dataStore = useDataStore();

const baseUrl ="http://localhost:8000"
onMounted(async () => {
  let papers = await getPapers(baseUrl+"/",{});
  paperStore.setPapers(papers);
  let data = await getDatas(baseUrl+"/getData",{});
  dataStore.setTagsLists(data.tagsLists);
  dataStore.setCategoryLists(data.categoryLists);
  dataStore.setTotalText(data.totalText);
  dataStore.setBuildDays(data.buildDays);
  dataStore.setTotalPapers(data.totalPapers);
  let sysSettings = await getSystemSettings(baseUrl+"/getSysSettings",{});
  systemStore.setSettings(sysSettings);
})


</script>

<style>

</style>