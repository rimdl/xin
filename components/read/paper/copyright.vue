<template>
  <div>
    <div class="w-full px-4 py-5 bg-base-200 rounded-md flex flex-col items-center space-y-2">
      <div class="avatar -mt-16">
        <div class="w-24 rounded-full group">
          <img class="group-hover:scale-110 transition duration-500" :src="systemStore.settings.admin_info?.avatar" />
        </div>
      </div>
      <p>
        <span class="font-bold">{{author}}</span>
      </p>
      <div class="relative flex flex-col items-center group">
        <button class="btn btn-primary text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
          打赏
        </button>
        <div v-viewer class="cursor-pointer flex space-x-2 absolute origin-top top-0 bg-base-300 w-96 scale-0 group-hover:-translate-y-full group-hover:scale-100 transition duration-300 p-4 rounded-lg">
          <div class="w-1/2 flex flex-col justify-between items-center" v-for="item in systemStore.settings.admin_info?.reward">
            <img class="object-cover border-base-300 rounded w-full h-full" :src="item.url" alt="">
            <span class="p-1 rounded bg-base-200 mt-1">{{ item.msg }}</span>
          </div>

        </div>
      </div>
      <p class="flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <label>
          <span class="font-semibold">版权声明：</span>
          本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" class="link font-bold">CC BY-NC-SA 4.0</a> 许可协议。转载请注明来自 <a class="link font-bold" href="/">{{author}}</a>！
        </label>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted} from "vue";
import {useSystemStore} from "~/stores/systemStore";

const systemStore = useSystemStore();

const link = ref("")
onMounted(()=>{
  link.value = window.location.href;

})
const props = defineProps({
  author: String
})

</script>

<style scoped>
.scr{
  animation: scroll 1s infinite linear alternate;
}
@keyframes scroll {
  from{
    transform: translateY(-50px);
  }
  to{
    transform: translateY(0px);
  }
}
</style>