<template>
  <ul :class="barClass">
    <li class="tooltip tooltip-left" data-tip="主页" v-if="route.path !== '/'">
      <NuxtLink to="/">
      <a @click="goToTop">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-content group-hover:text-base-content transition duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
      </a>
      </NuxtLink>
    </li>
    <li>
      <a @click="goToTop" class="tooltip tooltip-left" data-tip="回到顶部">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-5 h-5 text-primary-content group-hover:text-base-content transition duration-500">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
        </svg>
      </a>
    </li>
    <li>
      <a class="tooltip tooltip-left" :data-tip="hiddenSideBarTip" @click="hiddenSideBar">
        <transition name="my_bounce" mode="out-in">
          <svg v-if="autoShowSideBar" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary-content group-hover:text-base-content transition duration-500">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5 text-primary-content group-hover:text-base-content transition duration-500">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"/>
          </svg>
        </transition>
      </a>
    </li>
    <li>
      <a class="tooltip tooltip-left" data-tip="切换主题" @click="showThemeDialog">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary-content group-hover:text-base-content transition duration-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      </a>
    </li>
  </ul>

  <dialog ref="themeListDialog" class="modal">
    <div class="modal-box w-fit">
      <div class="px-16 flex flex-col items-center bg-base-300 rounded-2xl">
        <h3 class="font-bold text-lg">
          主题列表
        </h3>
        <h4>当前：{{systemStore.theme}}</h4>
      </div>
      <div class="h-96 overflow-y-scroll">
        <p class="p-2 hover:bg-base-300 hover:font-bold transition duration-300 rounded-md" v-for="item in themes" @click="changeTheme(item)"><a>{{ item }}</a></p>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop group">
      <button class="flex justify-center group relative">
        <div role="alert" class="alert w-fit mt-16 scale-0 group-hover:scale-100 -translate-y-16 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition duration-500 absolute top-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>点击空白区域关闭对话框</span>
        </div>
        <div role="alert" class="alert w-fit mt-16 scale-100 group-hover:scale-0 translate-y-0 group-hover:translate-y-16 group-hover:opacity-0 opacity-100 transition duration-500 absolute top-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>选择一个主题，点击切换</span>
        </div>
      </button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import {watch} from 'vue';
import {useSystemStore} from "~/stores/systemStore";
import {useRoute} from "vue-router";
const route = useRoute();

const systemStore = useSystemStore();
const themes = ref(["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset"]);
const theme = ref(true);
const barClass = ref('group menu bg-primary rounded-box scale-y-50 translate-x-3/4 hover:bg-base-200 hover:translate-x-0 hover:scale-y-100 transition duration-500')
const hiddenSideBarTip = ref('关闭自动展开侧边栏')

const themeListDialog = ref<HTMLDialogElement>()

watch(() => theme.value, () => {
  systemStore.setTheme(theme.value ? 'light' : 'dark')
  localStorage.setItem('theme', theme.value ? 'light' : 'dark')
})

const changeTheme = (theme: string) => {
  systemStore.setTheme(theme)
  localStorage.setItem('theme', theme)
  // themeListDialog.value?.close()
}

const showThemeDialog = () => {
  themeListDialog.value?.showModal()
}

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const autoShowSideBar = ref(true)
const hiddenSideBar = () => {
  autoShowSideBar.value = !autoShowSideBar.value
  if (!autoShowSideBar.value) {
    hiddenSideBarTip.value = '开启自动展开侧边栏'
  } else {
    hiddenSideBarTip.value = '关闭自动展开侧边栏'
  }
  barClass.value = "group menu bg-primary rounded-box scale-y-50 translate-x-3/4 hover:bg-base-200 hover:translate-x-0 hover:scale-y-100 transition duration-500"
}

onMounted(() => {
  window.addEventListener('scroll', handleWindowScroll);
});

// 不要忘记在组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('scroll', handleWindowScroll);
});

// 处理window滚动的函数
function handleWindowScroll(event: Event) {
  if (autoShowSideBar.value) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    let classStr = "group menu bg-primary rounded-box scale-y-50 translate-x-3/4 hover:bg-base-200 hover:translate-x-0 hover:scale-y-100 transition duration-500"
    if (scrollTop > screenHeight / 2) {
      classStr = "group menu bg-primary rounded-box scale-y-100 hover:bg-base-200 transition duration-500"
    }
    barClass.value = classStr
  }
}

</script>

<style scoped>


</style>