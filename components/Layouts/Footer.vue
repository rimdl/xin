

<template>
<div class="relative">
  <div class="flex justify-center items-center space-x-10" ref="imgElement" :style="imgDivStyle">
    <div class="z-10">
      <a :href="systemStore.settings.admin_info?.gitee" target="_blank" class="btn btn-circle btn-ghost bg-black text-base-100 hover:bg-black hover:scale-105 transition duration-300 btn-sm">
        <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M6.315 6.176c-.25-.638-.24-1.367-.129-2.034a6.77 6.77 0 0 1 2.12 1.07c.28.214.647.283.989.18A9.343 9.343 0 0 1 12 5c.961 0 1.874.14 2.703.391c.342.104.709.034.988-.18a6.77 6.77 0 0 1 2.119-1.07c.111.667.12 1.396-.128 2.033c-.15.384-.075.826.208 1.14C18.614 8.117 19 9.04 19 10c0 2.114-1.97 4.187-5.134 4.818c-.792.158-1.101 1.155-.495 1.726c.389.366.629.882.629 1.456v3a1 1 0 0 0 2 0v-3c0-.57-.12-1.112-.334-1.603C18.683 15.35 21 12.993 21 10c0-1.347-.484-2.585-1.287-3.622c.21-.82.191-1.646.111-2.28c-.071-.568-.17-1.312-.57-1.756c-.595-.659-1.58-.271-2.28-.032a9.081 9.081 0 0 0-2.125 1.045A11.432 11.432 0 0 0 12 3c-.994 0-1.953.125-2.851.356a9.08 9.08 0 0 0-2.125-1.045c-.7-.24-1.686-.628-2.281.031c-.408.452-.493 1.137-.566 1.719l-.005.038c-.08.635-.098 1.462.112 2.283C3.484 7.418 3 8.654 3 10c0 2.992 2.317 5.35 5.334 6.397A3.986 3.986 0 0 0 8 17.98l-.168.034c-.717.099-1.176.01-1.488-.122c-.76-.322-1.152-1.133-1.63-1.753c-.298-.385-.732-.866-1.398-1.088a1 1 0 0 0-.632 1.898c.558.186.944 1.142 1.298 1.566c.373.448.869.916 1.58 1.218c.682.29 1.483.393 2.438.276V21a1 1 0 0 0 2 0v-3c0-.574.24-1.09.629-1.456c.607-.572.297-1.568-.495-1.726C6.969 14.187 5 12.114 5 10c0-.958.385-1.881 1.108-2.684c.283-.314.357-.756.207-1.14"/></g></svg>
      </a>
    </div>
    <div class="z-10">
      <a :href="systemStore.settings.admin_info?.gitee" target="_blank" class="btn btn-circle btn-ghost bg-black text-base-100 hover:bg-black hover:scale-105 transition duration-300 btn-sm">
        <svg class="w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.33 13.33"><path d="M18.07,5.33a.6.6,0,0,1,.6.6V7.41a.61.61,0,0,1-.6.59H9.78A1.78,1.78,0,0,0,8,9.78v5.63a.6.6,0,0,0,.59.59h5.63A1.78,1.78,0,0,0,16,14.22v-.29a.59.59,0,0,0-.59-.6H11.26a.58.58,0,0,1-.59-.59V11.26a.58.58,0,0,1,.59-.59h6.81a.59.59,0,0,1,.6.59v3.41a4,4,0,0,1-4,4H5.93a.6.6,0,0,1-.6-.6h0V9.78A4.45,4.45,0,0,1,9.78,5.33h8.29Z" transform="translate(-5.33 -5.33)"/></svg>
      </a>
    </div>
    <div @click="goTop" class="z-10 avatar group cursor-pointer tooltip" data-tip="回到顶部">
      <div class="w-24 rounded-full relative">
        <img class="group-hover:scale-110 rounded-full transition duration-500 group-hover:-translate-y-full origin-bottom" :src="systemStore.settings.admin_info?.avatar" />
        <div class="flex justify-center w-full absolute top-0 left-0 rounded-full transition duration-500 group-hover:-rotate-0 translate-y-full group-hover:translate-y-0 origin-bottom">
          <img class="-rotate-45" src="../../public/images/rocket.gif" alt="">
        </div>
      </div>
    </div>
    <div class="z-10">
      <a :href="systemStore.settings.admin_info?.bilibili" target="_blank" class="btn btn-circle btn-ghost bg-black text-base-100 hover:bg-black hover:scale-105 transition duration-300 btn-sm">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 0 1 1.767-1.768l2.652 2.652c.079.079.145.165.198.257h3.213c.053-.092.12-.18.199-.258l2.651-2.652a1.25 1.25 0 0 1 1.768 0m.027 5.42H5.75a1.25 1.25 0 0 0-1.247 1.157l-.003.094v7.5c0 .659.51 1.198 1.157 1.246l.093.004h12.5a1.25 1.25 0 0 0 1.247-1.157l.003-.093v-7.5c0-.69-.56-1.25-1.25-1.25m-10 2.5c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25m7.5 0c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25"/></svg>
      </a>
    </div>
    <div class="z-10">
      <a :href="systemStore.settings.admin_info?.tiktok" target="_blank" class="btn btn-circle btn-ghost bg-black text-base-100 hover:bg-black hover:scale-105 transition duration-300 btn-sm">
      <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="3.833" d="M21.358 19.14c-5.889-.284-9.982 1.815-12.28 6.298c-3.446 6.725-.598 17.729 10.9 17.729c11.5 0 11.832-11.112 11.832-12.276V17.875c2.46 1.557 4.533 2.495 6.22 2.813c1.689.317 2.761.458 3.22.422v-6.476c-1.561-.188-2.911-.547-4.05-1.076c-1.709-.794-5.096-2.997-5.096-6.226c.002.016.002-.817 0-2.499h-7.118c-.021 15.816-.021 24.502 0 26.058c.031 2.334-1.78 5.6-5.45 5.6c-3.672 0-5.483-3.263-5.483-5.367c0-1.288.443-3.155 2.272-4.538c1.085-.82 2.59-1.148 5.033-1.148z"/></svg>
      </a>
    </div>
  </div>
  <div>
    <footer class=" footer p-10 bg-base-200 text-base-content relative">
      <nav>
        <h6 class="footer-title">Services</h6>
        <a class="link link-hover">Branding</a>
        <a class="link link-hover">Design</a>
        <a class="link link-hover">Marketing</a>
        <a class="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 class="footer-title">Company</h6>
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 class="footer-title">Legal</h6>
        <a class="link link-hover">Terms of use</a>
        <a class="link link-hover">Privacy policy</a>
        <a class="link link-hover">Cookie policy</a>
      </nav>
    </footer>
    <footer class="footer px-10 py-4 border-t bg-base-300 text-base-content border-base-300">
      <aside class="items-center grid-flow-col">
        <!--      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>-->
        <svg class="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.61 356.9"><defs></defs><path class="cls-1" d="M206.17,96.53c10.41,12,16.87,26.85,22.39,41.74,5.4,14.56,10.84,30.44,23.69,39.15,16.17,11,41.3,4.59,50.29-12.74,3-5.84,4.34-12.38,5.61-18.83l6.38-32.36c4-20.26,10.26-43.49,29.17-51.81,16.67-7.35,37.21,1.23,48,15.89s13.64,33.8,13.27,52c-.42,21.15-5.27,43.4-19.83,58.74-5.08,5.36-11.16,9.68-16.41,14.88-17,16.82-23.93,43.09-17.48,66.1,4.58,16.38,15.11,30.33,25.46,43.82s20.95,27.37,25.73,43.69,2.46,35.88-10.15,47.28c-8.09,7.31-19.29,10.35-30.18,10.75a63.85,63.85,0,0,1-26.32-4.35c-27.95-11.36-41.84-43.21-46-73.09-1.45-10.34-2.11-20.92-5.69-30.72s-10.79-19-20.85-21.76-20.74,1.36-29,7.58a60.83,60.83,0,0,0-16.76,19.34c-9.09,16.62-10,36.65-18.37,53.63-3.8,7.71-9.4,14.9-17.17,18.56-9.06,4.26-19.76,3.16-29.4.41-13.67-3.89-26.87-11.3-34.76-23.13-12-18-9.32-42.37-.74-62.25S139.31,262,149.19,242.7c3.29-6.41,6.22-13.67,4.43-20.65-1.41-5.48-5.48-9.79-9.22-14C121.29,181.73,91.86,129,117.16,95.31,137.89,67.75,185.65,72.91,206.17,96.53Z" transform="translate(-106.94 -58.5)"/></svg>
        <p>XIN <br>Developed by XinSi in 2024.</p>
      </aside>
      <nav class="md:place-self-center md:justify-self-end">
        <div class="grid grid-flow-col gap-4">
          <a>
            <span>{{systemStore.settings.admin_info?.bio}}</span>
          </a>
        </div>
      </nav>
    </footer>
  </div>
</div>
</template>

<script setup lang="ts">
import {useElementSize} from "@vueuse/core";
import {useSystemStore} from "~/stores/systemStore";

const systemStore = useSystemStore();
const imgElement = ref()
const imgDivWH = useElementSize(imgElement)
const imgDivStyle = computed(() => {

  return "margin-bottom: -"+(imgDivWH.height.value/2)+"px;";
})

function goTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>
<style scoped>
.top_svg{
  animation: topSvg 2s linear infinite 0.5s;
}

@keyframes topSvg {
  from{
    transform: translateY(200%);
  }
  to{
    transform: translateY(-200%);
  }
}
</style>