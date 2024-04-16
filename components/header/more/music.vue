<template>

  <div :style="'background-image: url('+audio_src?.poster+');'" class="bg-base-content bg-cover bg-opacity-70 rounded-lg w-fit music">
    <div :class="minimize?'hover:backdrop-blur-lg':'backdrop-blur-lg'" class="p-4 rounded-lg relative transition duration-500">
      <div class="text-base-100 flex space-y-4 justify-center items-center flex-col w-full">
        <div :class="minimize?'h-0 overflow-hidden': ''" class="flex flex-col justify-center items-center w-full space-y-4">
          <div class="w-32 h-32 relative">
            <div class="absolute w-32 -z-10 h-32 bg-base-200 shadow-2xl border-base-300 border top-0 rounded-full my_pulse"></div>
            <img class="w-32 h-32 z-20 object-cover rounded-full bg-base-200" :class="playing?'my_spin':''"
                 :src="audio_src?.poster?audio_src?.poster:'./x_logo.svg'" alt="">

          </div>
          <h1>{{ audio_src?.title }}</h1>
          <audio ref="music" autoplay loop :src="audio_src?.src" muted></audio>
          <div class="w-full">
            <div class="w-full text-center min-h-16 flex flex-col items-center justify-center">
              <h1 v-if="show_lyrics" :class="lyrics_class" class="font-semibold">{{ show_lyrics }}</h1>
              <h1 v-if="next_lyrics" :class="next_lyrics_class" class="font-semibold text-sm">{{ next_lyrics }}</h1>
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="text-right">
            <span class="text-sm">{{Math.floor(currentTime/60)}}:{{Math.floor(currentTime % 60)}}/{{Math.floor(duration/60)}}:{{Math.floor(duration % 60)}}</span>
          </div>
          <div class="opacity-50 flex justify-between w-full items-center hover:opacity-100 transition duration-300 h-5 relative">
            <progress class="absolute top-0 progress progress-info w-full" :value="currentTime" :max="duration"></progress>
            <input  class="absolute top-0 range opacity-0 range-sm" type="range" min="0" :max="duration" v-model="newTime" @input="chageTime"/>
          </div>
        </div>
        <div class="flex justify-between w-full items-center">
          <div class="flex justify-between space-x-4 bg-base-200 bg-opacity-50 rounded-xl p-1">
            <button class="btn btn-circle btn-ghost btn-sm"  @click="changeSrc(true)">
              <svg class="w-6 h-6 cursor-pointer hover:scale-105 transition duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"/>
              </svg>
            </button>
            <div class="cursor-pointer hover:scale-105 transition duration-300">
              <transition name="my_bounce" mode="out-in">
                <button v-if="playing" @click="playing = !playing" class="btn-circle btn btn-ghost btn-sm">
                  <svg  xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/>
                  </svg>
                </button>
                <button v-else @click="playing = !playing" class="btn-circle btn btn-ghost btn-sm">
                  <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                  </svg>
                </button>
              </transition>
            </div>
            <button @click="changeSrc(false)" class="btn-circle btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer hover:scale-105 transition duration-300">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"/>
              </svg>
            </button>
            <div class="cursor-pointer hover:scale-105 transition duration-300">
              <transition name="my_bounce" mode="out-in">
                <button v-if="muted" @click="muted = !muted" class="btn-circle btn btn-ghost btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                  </svg>
                </button>
                <button v-else @click="muted = !muted" class="btn-circle btn btn-ghost btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                  </svg>
                </button>
              </transition>
            </div>
          </div>
          <div class="flex justify-end items-center space-x-4 w-full ml-1">
            <div class="rounded-xl bg-base-200 bg-opacity-50 p-2 overflow-hidden whitespace-nowrap max-sm:hidden w-28">
              <p class="lyrics-out w-fit" v-if="!minimize">{{audio_src?.artist}}</p>
              <p class="lyrics-out w-fit" v-else>{{show_lyrics}}</p>
            </div>
            <div class="dropdown dropdown-top dropdown-hover dropdown-end">
              <div tabindex="0" role="button" class="rounded-xl bg-base-200 bg-opacity-50 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                </svg>
              </div>
              <div tabindex="0" :class="minimize?'max-h-24':'max-h-72'" class="dropdown-content z-[1] p-1 shadow bg-base-100 text-base-content bg-opacity-80 rounded-lg w-52 overflow-y-scroll">
                <div @click="changeSrcByIndex(index)" class="w-full cursor-pointer rounded-lg p-1 hover:bg-base-content hover:bg-opacity-30" v-for="(item,index) in srcList" :key="item.src">
                  <p class="text-sm whitespace-nowrap overflow-ellipsis overflow-hidden w-full">{{index+1}}. {{item.title}}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="absolute top-1 right-10">
        <button class="btn btn-sm btn-circle btn-ghost" @click="minimize = !minimize">
          <transition name="my_bounce" mode="out-in">
            <svg v-if="!minimize" class="w-5 h-5 text-base-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 14h4m0 0v4m0-4l-6 6m14-10h-4m0 0V6m0 4l6-6"/></svg>
          <svg v-else class="w-5 h-5 text-base-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 20H4m0 0v-4m0 4l6-6m6-10h4m0 0v4m0-4l-6 6"/></svg>
          </transition>
        </button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useMediaControls} from '@vueuse/core'
import type {musicInter} from "~/types";
import {get_json} from "~/utils/fetch_tools";
import config from "~/public/config.json";
import {useSystemStore} from "~/stores/systemStore";

const systemStore = useSystemStore();

type LyricsType = {
  timeInSeconds: number;
  content: string;
}
const baseUrl = config.baseUrl;

const music = ref()
const {playing, currentTime, duration, volume,muted} = useMediaControls(music)
const newTime = ref(0);
const audio_src = ref<musicInter>()
const srcList = ref<musicInter[]>([])
const lyrics = ref<LyricsType[]>([])
const show_lyrics = ref("")
const next_lyrics = ref("")
const lyrics_class = ref("")
const next_lyrics_class = ref("")
const minimize = ref(false)
const chageTime = () => {
  currentTime.value = newTime.value
}


watch(()=>show_lyrics.value,(nv)=>{
  lyrics_class.value = "lyrics-in";
  next_lyrics_class.value = "next-lyrics-in opacity-50";
  let timer;
  clearTimeout(timer);
  timer = setTimeout(()=>{
    lyrics_class.value = ""
    next_lyrics_class.value = "opacity-50"
  },1000)
})


watch(()=>playing.value,()=>{
  systemStore.setMusic(playing.value)
})
function parseLyrics(lrc:string){
  const lines = lrc.split('\n');

  const lyricsArray = <LyricsType[]>[];
  lines.forEach(line => {
    const parts = line.trim().split(']');
    if (parts && parts.length > 1) {
      // @ts-ignore
      const content = parts.pop().trim();
      parts.forEach(timeStr => {
        const time = timeStr.slice(1).trim();
        const [minutes, seconds] = time.split(':');
        const timeInSeconds = parseInt(minutes) * 60 + parseFloat(seconds);
        const formattedTimeInSeconds = timeInSeconds.toFixed(2);
        lyricsArray.push({
          timeInSeconds: parseFloat(formattedTimeInSeconds),
          content
        });
      });
    }
  });
  return lyricsArray;
}

watch(() => currentTime.value, (nv) => {
  if (lyrics.value.length > 0){
    let i = 0;

    while (i < lyrics.value.length-1){
      let nowT = nv;
      let lyT = lyrics.value[i+1]?.timeInSeconds;
      if (nowT <= lyT){
        show_lyrics.value = lyrics.value[i].content
        next_lyrics.value = lyrics.value[i+1]?.content || ""
        break
      }
      else {
          show_lyrics.value = lyrics.value[lyrics.value.length-1].content
          next_lyrics.value = ""
      }
      i++
    }
  }
 if (typeof nv == "number"){
   if (duration.value - nv < 1){
     changeSrc(false)
     getLyrics()
   }
 }
})
onMounted(()=>{
  get_json(baseUrl+'/api/settings/getplaylist',{}).then(res=>{
    srcList.value = res
    audio_src.value = srcList.value[0];
    getLyrics()
  })
})



const getLyrics = () => {
  if (audio_src.value?.lyrics){
    fetch(audio_src.value.lyrics).then(res => res.text()).then(res => {
    // fetch(baseUrl+'/api/settings/lyrics').then(res => res.text()).then(res => {
      lyrics.value = parseLyrics(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  else {
    lyrics.value = []
    show_lyrics.value = "当前歌曲没有歌词"
  }
}

const changeSrcByIndex = (index:number)=>{
  audio_src.value = srcList.value[index]
  music.value.play();
  music.value.muted = false;
  getLyrics();
}

const changeSrc = (flag: boolean) => {
  if (flag && audio_src.value) {
    const now_index = srcList.value.indexOf(audio_src.value)
    let index = 0;
    if (now_index == 0) {
      index = srcList.value.length - 1
    } else {
      index = now_index - 1
    }
    audio_src.value = srcList.value[index]
    music.value.play();
    music.value.muted = false;
  } else if(!flag && audio_src.value){
    const now_index = srcList.value.indexOf(audio_src.value)
    let index = 0;
    if (now_index == srcList.value.length - 1) {
      index = 0
    } else {
      index = now_index + 1
    }
    audio_src.value = srcList.value[index]
    music.value.play();
    music.value.muted = false;
  }
  getLyrics()
}

</script>

<style scoped>
.my_spin {
  animation: my_spin 4s linear infinite;
}

@keyframes my_spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.my_pulse {
  scale: 1.1;
  animation: my_pulse 4s linear infinite;
  background-image: linear-gradient(to bottom, #ff9903, #1ad1a5, #ff9b9b), repeating-linear-gradient(to right, #0fb0ff, #fff 10px, #000 10px, #000 20px);
}

@keyframes my_pulse {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

.lyrics-in {
  animation: lyricsIn 1s forwards;
}

@keyframes lyricsIn {
  from {
    opacity: 0;
    scale: 0.6;

  }
  to {
    opacity: 1;
    scale: 1;

  }
}
.next-lyrics-in {
  animation: netxLyricsIn 1s forwards;
}

@keyframes netxLyricsIn {
  from {
    transform: translateY(15px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 0.5;
  }
}

.lyrics-out {
  animation: scroll 3s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(105%);
  }
  to{
    transform: translateX(-105%);
  }
}

</style>