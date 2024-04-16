<template>
<div class="social-share" data-sites="weibo,wechat" v-viewer>
  <ul class="w-full flex justify-between p-5 menu menu-horizontal bg-base-200 rounded-box">
    <li>
      <a class="relative group flex justify-center"  @mouseover="getQrCode">
        <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m26 4l18 18l-18 17V28C12 28 6 43 6 43c0-17 5-28 20-28z"/></svg>
        <div class="absolute w-40 top-0 -translate-y-full z-20 scale-0 group-hover:scale-100 transition duration-500 origin-bottom">
          <img :src="img_src" alt="" class="rounded-lg"/>
        </div>
      </a>
    </li>
    <li>
      <a :href="share.weibo" target="_blank">
        <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4.278 8.592c2.773-2.77 6.004-4.033 7.219-2.816c.537.537.588 1.464.244 2.572c-.178.557.524.25.524.25c2.241-.938 4.197-.994 4.91.027c.38.542.343 1.306-.008 2.19c-.163.407.048.47.36.563c1.262.392 2.668 1.336 2.668 3.004c0 2.763-3.98 6.239-9.964 6.239c-4.565 0-9.23-2.213-9.23-5.852c0-1.902 1.204-4.102 3.277-6.177m12.133 5.742c-.237-2.391-3.382-4.039-7.023-3.677c-3.64.359-6.403 2.59-6.167 4.98c.237 2.394 3.382 4.039 7.023 3.68c3.641-.362 6.401-2.592 6.167-4.983m-10.249.104c.754-1.528 2.712-2.39 4.446-1.94c1.792.463 2.707 2.154 1.976 3.799c-.744 1.683-2.883 2.58-4.695 1.994c-1.752-.566-2.493-2.295-1.727-3.853m2.715.578c-.563-.237-1.291.008-1.64.553c-.354.547-.189 1.201.371 1.456c.568.257 1.325.013 1.676-.55c.346-.568.163-1.217-.408-1.459m1.387-.578c-.216-.084-.486.018-.613.232c-.123.214-.054.458.163.547c.219.092.501-.012.628-.231c.123-.22.044-.466-.178-.548m5.694-11.514A5.831 5.831 0 0 1 21.5 4.72a5.836 5.836 0 0 1 1.22 5.704a.838.838 0 0 1-1.06.54a.844.844 0 0 1-.542-1.062a4.142 4.142 0 0 0-4.808-5.327a.845.845 0 0 1-.353-1.65m.626 2.926a2.836 2.836 0 0 1 3.29 3.648a.725.725 0 1 1-1.378-.45a1.38 1.38 0 0 0-.287-1.357a1.395 1.395 0 0 0-1.322-.426a.723.723 0 1 1-.303-1.415"/></svg>
      </a>
    </li>
    <li>
      <a class="relative group flex justify-center" @mouseover="getQrCode">
        <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><g fill="none"><path d="M36.997 21.711C36.843 13.008 29.74 6 21 6C12.163 6 5 13.163 5 22c0 4.17 1.595 7.968 4.209 10.815l-1.199 7.21l7.115-3.055c3.135 1.042 6.093 1.303 8.875.782" clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M36.997 21.711C36.843 13.008 29.74 6 21 6C12.163 6 5 13.163 5 22c0 4.17 1.595 7.968 4.209 10.815l-1.199 7.21l7.115-3.055c3.135 1.042 6.093 1.303 8.875.782"/><path fill="currentColor" d="M15.125 20.467a2.258 2.258 0 0 0 2.25-2.267a2.258 2.258 0 0 0-2.25-2.267a2.258 2.258 0 0 0-2.25 2.267a2.258 2.258 0 0 0 2.25 2.267m9 0a2.258 2.258 0 0 0 2.25-2.267a2.258 2.258 0 0 0-2.25-2.267a2.258 2.258 0 0 0-2.25 2.267a2.258 2.258 0 0 0 2.25 2.267"/><path d="M38.762 39.93A10.453 10.453 0 0 1 32.5 42C26.701 42 22 37.299 22 31.5S26.701 21 32.5 21S43 25.701 43 31.5c0 1.6-.358 3.116-.998 4.473" clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M38.762 39.93A10.453 10.453 0 0 1 32.5 42C26.701 42 22 37.299 22 31.5S26.701 21 32.5 21S43 25.701 43 31.5c0 1.6-.358 3.116-.998 4.473"/><path d="M42.002 35.973L43 42l-4.238-2.07" clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M42.002 35.973L43 42l-4.238-2.07"/><path fill="currentColor" d="M35.688 30.8A1.694 1.694 0 0 1 34 29.1c0-.939.755-1.7 1.688-1.7c.931 0 1.687.761 1.687 1.7s-.755 1.7-1.687 1.7m-6.75 0a1.694 1.694 0 0 1-1.688-1.7c0-.939.756-1.7 1.688-1.7c.931 0 1.687.761 1.687 1.7s-.756 1.7-1.687 1.7"/></g></svg>
        <div class="absolute w-40 top-0 -translate-y-full z-20 scale-0 group-hover:scale-100 transition duration-500 origin-bottom">
          <img :src="img_src" alt="" class="rounded-lg"/>
        </div>
      </a>
    </li>
    <li>
      <a :href="share.qq" target="_blank">
        <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m17.536 12.514l-.696-1.796c0-.021.01-.375.01-.558C16.85 7.088 15.447 4 12 4c-3.446 0-4.848 3.088-4.848 6.16c0 .183.009.537.01.557l-.696 1.797c-.19.515-.38 1.05-.517 1.51c-.657 2.189-.444 3.095-.282 3.115c.348.043 1.354-1.648 1.354-1.648c0 .98.487 2.258 1.542 3.18c-.394.127-.878.32-1.188.557c-.28.214-.245.431-.194.52c.22.385 3.79.245 4.82.125c1.03.12 4.599.26 4.82-.126c.05-.088.085-.305-.194-.519c-.311-.237-.795-.43-1.19-.556c1.055-.923 1.542-2.202 1.542-3.181c0 0 1.007 1.691 1.355 1.648c.162-.02.378-.928-.283-3.116a26.91 26.91 0 0 0-.516-1.509m1.021 8.227c-.373.652-.833.892-1.438 1.057a4.91 4.91 0 0 1-.794.138c-.44.045-.986.065-1.613.064a33.217 33.217 0 0 1-2.71-.116c-.692.065-1.785.114-2.71.116a16.048 16.048 0 0 1-1.614-.064a4.917 4.917 0 0 1-.793-.138c-.605-.164-1.065-.405-1.44-1.059a2.274 2.274 0 0 1-.239-1.652c-.592-.132-1.001-.482-1.279-.911a2.43 2.43 0 0 1-.309-.71a4.027 4.027 0 0 1-.116-1.106c.013-.785.187-1.762.532-2.912c.14-.466.327-1.008.567-1.655l.554-1.43a15.362 15.362 0 0 1-.002-.203C5.153 5.605 7.589 2 12 2c4.413 0 6.848 3.605 6.848 8.16l-.001.203l.553 1.43l.01.026c.225.606.413 1.153.556 1.626c.348 1.15.522 2.128.535 2.916c.007.407-.03.776-.118 1.108c-.066.246-.161.48-.31.708c-.276.427-.684.776-1.277.91c.13.554.055 1.14-.24 1.654"/></svg>
      </a>
    </li>
    <li>
      <a :href="share.qzone" target="_blank">
        <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M23.987 9.201c-.032-.099-.127-.223-.334-.258c-.207-.036-7.352-1.406-7.352-1.406s-.105-.022-.198-.07c-.092-.047-.127-.167-.127-.167S12.447.954 12.349.768C12.25.58 12.104.53 12 .53c-.104 0-.25.05-.349.238C11.553.954 8.025 7.3 8.025 7.3s-.036.12-.129.167c-.092.047-.197.07-.197.07S.555 8.907.347 8.942c-.208.036-.302.16-.333.258a.477.477 0 0 0 .125.45L5.5 15.14s.072.08.12.172c.015.104.004.21.004.21s-1.189 7.243-1.22 7.451a.461.461 0 0 0 .16.43c.082.062.232.106.42.013c.19-.093 6.813-3.261 6.813-3.261s.098-.044.201-.061c.103-.017.201.06.201.06s6.624 3.17 6.813 3.262c.188.094.338.05.421-.013a.463.463 0 0 0 .16-.43l-.93-5.678c.875-.54 1.424-1.039 1.848-1.747c-2.594.97-6.007 1.717-9.416 1.866c-.915.041-2.41.097-3.473-.015c-.679-.07-1.17-.144-1.244-.438c-.053-.215.054-.46.545-.83a2640.863 2640.863 0 0 1 2.862-2.156c1.285-.968 3.56-2.47 3.56-2.732c0-.285-2.145-.78-4.038-.78c-1.945 0-2.276.131-2.812.167c-.488.034-.769.005-.804-.138c-.06-.248.183-.389.588-.568c.71-.314 1.86-.594 1.985-.626c.194-.052 3.082-.805 5.618-.535c1.319.14 3.245.668 3.245 1.276c0 .342-1.721 1.495-3.226 2.598c-1.149.843-2.217 1.56-2.217 1.688c0 .342 3.534 1.241 6.69 1.01l.003-.022c.048-.092.12-.172.12-.172l5.362-5.49a.477.477 0 0 0 .127-.45"/></svg>
      </a>
    </li>
  </ul>
</div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
// @ts-ignore
import QRCode from "qrcode";

const share = ref({})
const img_src = ref("");

let qrOptions = {
  errorCorrectionLevel: "H",
  width: 500,
  version: 7,
}

const getQrCode = ()=>{
  const URL = location.href || "";
  // @ts-ignore
  QRCode.toDataURL(URL,qrOptions).then(res=>{
    img_src.value = res
  })
}

onMounted(()=>{
  const URL = location.href || "";
  const TITLE = document.title || "";
  const DESCRIPTION = "from xin";
  const SUMMARY = "from xin";
  const SOURCE = document.title || "";
  const IMAGE = document.images[0].src||"";

  share.value = {
    q:`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=&showcount=1&desc=&summary=&title=`,
    qzone: `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${URL}&title=${TITLE}&desc=${DESCRIPTION}&summary=${SUMMARY}`,
    qq: `http://connect.qq.com/widget/shareqq/index.html?url=${URL}&title=${TITLE}&source=${SOURCE}&desc=${DESCRIPTION}&pics=${IMAGE}&summary="${SUMMARY}"`,
    weibo: `https://service.weibo.com/share/share.php?url=${URL}&title=${TITLE}&pic=${IMAGE}`,
  }
})

</script>

<style scoped>

</style>