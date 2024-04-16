<template>
  <div class="flex w-full px-16 py-10 max-sm:p-0 flex-wrap">
    <div class="flex flex-wrap xl:w-3/4 lg:w-3/4 md:w-full sm:w-full max-sm:w-full flex-col justify-start">
      <TagsMain :tag="router.currentRoute.value.query.tag"/>
    </div>
    <div class="px-10 max-sm:p-1 xl:w-1/4 lg:w-1/4 md:w-full sm:w-full max-sm:w-full max-sm:mt-2">
      <CategoriesSide/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
const router = useRouter();
</script>

<style scoped>

</style>