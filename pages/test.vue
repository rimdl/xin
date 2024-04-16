<template>

  <span @click="changePlay">
    <span>
                      <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" fill="none"
                           viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/>
                    </svg>
    </span>
              </span>
  <div class="w-full flex justify-center mb-16 z-10">
    <svg @click="scrollDownOneScreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-bounce cursor-pointer">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"/>
    </svg>
  </div>
  <div class="absolute w-full h-screen top-0 -z-1" v-if="systemStore.settings['bgVideo']">
    <div class="w-full h-screen bg-base-200">
      <video class="w-full h-screen object-cover" ref="bgVideoEl" autoplay controls preload="metadata" loop
             src="https://s3.231147.xyz/file/xinsis3test/video+(18).mp4"
             :poster="bgVideoPoster"></video>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useSystemStore} from "~/stores/systemStore";
import {useMediaControls} from '@vueuse/core'

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

onMounted(() => {
  muted.value = true
  viewportHeight.value = window.innerHeight;
});


const temp = ref(true)
const changePlay = () => {
  playing.value = !playing.value
}
const videoMuted = () => {
  muted.value = !muted.value
}

// 定义滚动方法
function scrollDownOneScreen() {
  window.scrollTo({
    top: viewportHeight.value,
    behavior: 'smooth',
  });
}

</script>

<style scoped>

</style>