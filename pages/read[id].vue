<template>
  <div class="flex w-full px-16 py-10 max-sm:p-0 flex-wrap">
    <div class="flex flex-wrap xl:w-3/4 lg:w-3/4 md:w-full sm:w-full max-sm:w-full max-sm:p-1 flex-col justify-start">
      <ReadPaper :id="route.params.id" />
    </div>
    <div class="px-10 max-sm:p-1 xl:w-1/4 lg:w-1/4 md:w-full sm:w-full max-sm:w-full max-sm:mt-2">
      <ReadSide :id="route.params.id"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
onBeforeMount(() => {
  if (route.params.id === "undefined"){
    router.back()
  }
  if (route.query.hasOwnProperty('access_token')){
    let loginData = {
      ...route.query,
      loginTime: Date.now()
    }
      localStorage.setItem("login",JSON.stringify(loginData))
  }
})

onMounted(()=>{
  if (route.query.hasOwnProperty('access_token')){
    router.push("/read"+route.params.id)
  }
})


</script>

<style scoped>

</style>