<template>
  <div class="flex flex-wrap">
    <div class="flex max-sm:w-full sm:w-1/5 p-2">
      <CategoriesMainSide/>
    </div>
    <div class="max-sm:w-full sm:w-4/5 p-2">
      <CategoriesMainContent/>
    </div>
  </div>
</template>


<script setup lang="ts">
import {useDataStore} from "~/stores/dataStore";

const dataStore = useDataStore();
</script>


<style scoped>

</style>