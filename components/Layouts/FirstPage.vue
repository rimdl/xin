<template>
  <div class="relative h-screen">
    <div class="h-full flex justify-center items-center z-10 w-full absolute">
      <div class="hero h-full">
        <div class="hero-content text-center">
          <div class="p-5 transition duration-300 hover:backdrop-blur-xl rounded-xl">
              <h1 class="text-7xl -skew-x-12 font-semibold font-mono firstPageTitle text_reflect mix-blend-difference">{{ systemStore.settings.title }}</h1>
              <p class="py-6 firstPageSub font-semibold text-xl">
                {{ systemStore.settings.sub_title }}
                <span class="text_cursor">|</span>
              </p>
            <div v-if="systemStore.settings['bgVideo']">
              <ul v-if="currentTime>0"
                  class="menu menu-horizontal bg-primary-content/20 hover:bg-base-200 transition duration-500 rounded-box">
                <li>
                  <a @click="muted=!muted" v-if="bgVideoEl">
                    <transition name="my_bounce" mode="out-in">
                      <svg v-if="!muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                           stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
                      </svg>

                      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
                      </svg>
                    </transition>
                  </a>
                </li>
                <li>
              <span @click="playing = !playing">
                <transition name="my_bounce" mode="out-in">
                      <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" fill="none"
                           viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/>
                    </svg>
                </transition>
              </span>
                </li>
              </ul>
              <div v-if="currentTime>0" class="w-full mt-2 flex justify-center items-center space-x-2">
                <input type="range"
                       class="w-3/5 range range-primary opacity-40 range-sm hover:opacity-100 hover:scale-105 transition duration-300"
                       min="0" :max="dur" v-model="currentTime">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center mb-16 z-10 bottom-10 absolute">
      <svg @click="scrollDownOneScreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="w-10 h-10 animate-bounce cursor-pointer">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"/>
      </svg>
    </div>
    <div class="absolute w-full h-screen top-0 -z-1" v-if="systemStore.settings['bgVideo']">
      <div class="w-full h-screen bg-base-200">
        <video class="w-full h-screen object-cover" ref="bgVideoEl" muted autoplay loop :src="vsrc"
               :poster="bgVideoPoster"></video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useSystemStore} from "~/stores/systemStore";
import {useMediaControls} from '@vueuse/core';

const systemStore = useSystemStore();
const viewportHeight = ref(0);


const bgVideoEl = ref<HTMLVideoElement | null>();

const {playing, currentTime, duration, muted} = useMediaControls(bgVideoEl)

const vsrc = computed(() => {
  if (systemStore.settings.bgVideo) {
    for (let s of systemStore.settings['bgVideo']) {
      if (systemStore.theme.toString() === s.name.toString()) {
        return s.cover.toString()
      }
    }
  }
})

const bgVideoPoster = computed(() => {
  let posterStr = "./x_logo.svg"
  if (systemStore.settings['bgVideo']) {
    for (let s of systemStore.settings['bgVideo']) {
      if (systemStore.theme.toString() === s.name.toString()) {
        if (s.poster) {
          posterStr = s.poster.toString();
        }
      }
    }
  }
  return posterStr;
});

const dur = ref(0)

onMounted(() => {
  muted.value = true
  viewportHeight.value = window.innerHeight;
});

watch(duration,()=>{
  dur.value = duration.value
})


// 定义滚动方法
function scrollDownOneScreen() {
  window.scrollTo({
    top: viewportHeight.value,
    behavior: 'smooth',
  });
}

</script>

<style scoped>
.text_reflect{
  -webkit-box-reflect: below 0px -webkit-linear-gradient(transparent,transparent,#0005);
}
.text_cursor{
 animation: textCursor 1s steps(1) infinite;
}

@keyframes textCursor{
  0%{
    opacity: 1;
  }
  50%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>