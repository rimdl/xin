<template>
  <div class="flex justify-start flex-col space-y-2 h-full">
    <IndexSideInfo/>
    <ReadSideShare/>
    <div class="w-full sticky top-16 space-y-2">
      <ReadSideTopic class="mt-2 max-md:hidden"/>
      <ReadSideRecent/>
      <ReadSideJumptocontext :id="props.id"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps,ref} from "vue";

const props = defineProps({
  id:String
})
</script>

<style scoped>

</style>