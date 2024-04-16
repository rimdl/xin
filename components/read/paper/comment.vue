<template>
  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
           class="w-7 h-7">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
      </svg>

      <h1 class="text-2xl font-bold" id="xin_comment">评论（{{ comments.length }}）</h1>
    </div>
    <div class="space-x-2">
      <span>匿名评论</span>
      <span>隐私政策</span>
    </div>
  </div>
  <div class="rounded-md p-4 bg-base-200 mt-2">
    <div>
      <textarea @input="handleInput" class="textarea textarea-bordered h-32 w-full text-lg" v-model="commentInput"
                placeholder="输入评论内容✨..."></textarea>
      <div class="label">
        <div class="flex items-center space-x-2">
          <div class="dropdown dropdown-hover dropdown-right">
            <div tabindex="0" role="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6 hover:scale-105 transition duration-300">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"/>
              </svg>
            </div>
            <div tabindex="0" class="dropdown-content z-[1] card card-compact w-72 p-2 shadow bg-base-200">
              <div class="card-body">
                <div class="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"/>
                  </svg>
                  <h4 class="card-title">选择表情</h4>
                </div>
                <p class="w-full h-52">
                  <ReadPaperEmoji @pickEmoji="handlePickEmoji"/>
                </p>
              </div>
            </div>
          </div>
          <div class="tooltip-top tooltip" data-tip="选择图片" @click="handlePickFile">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6 hover:scale-105 transition duration-300">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
            </svg>
          </div>
          <div v-if="imgs.length">
            <button @click="handleReset" class="btn btn-xs">清空图片</button>
          </div>
        </div>
        <span class="label-text-alt">
        <span>{{ totalText }}</span>/1000
      </span>
      </div>
    </div>
    <div class="flex justify-between space-x-4 items-center">
      <div @mouseover="isHovering = true" @mouseleave="isHovering = false"
           class="space-x-4 rounded-2xl bg-base-300 group flex items-center px-4 py-2">

        <a :href="giteeLoginHref" class="btn btn-circle btn-ghost btn-sm  hover:scale-110 transition duration-300"
           :class="systemStore.loginUser && localLogin?.login_type=='gitee' ?  'opacity-100' : 'opacity-50'">
          <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0m6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/>
          </svg>
        </a>
        <a :href="githubLoginHref" class="btn btn-circle btn-ghost btn-sm  hover:scale-110 transition duration-300"
           :class="systemStore.loginUser && localLogin?.login_type=='github' ?  'opacity-100' : 'opacity-50'">
          <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
              <path
                  d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20s20-8.954 20-20S35.046 4 24 4M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24s-10.745 24-24 24S0 37.255 0 24"/>
              <path
                  d="M19.183 45.472c-.193-.25-.193-2.475 0-6.674c-2.072.072-3.38-.072-3.927-.431c-.819-.539-1.64-2.2-2.367-3.371c-.728-1.17-2.343-1.356-2.995-1.618c-.652-.261-.816-1.328 1.797-.522c2.613.807 2.74 3.005 3.565 3.518c.825.514 2.796.29 3.689-.122c.893-.412.827-1.944.987-2.551c.201-.567-.509-.693-.524-.697c-.873 0-5.454-.997-6.713-5.433c-1.258-4.437.363-7.337 1.228-8.583c.576-.832.525-2.603-.153-5.314c2.464-.315 4.365.46 5.703 2.326c.002.01 1.756-1.043 4.527-1.043c2.772 0 3.755.858 4.514 1.043c.76.185 1.366-3.266 6.053-2.326c-.979 1.923-1.798 4.326-1.173 5.314c.626.987 3.08 4.127 1.573 8.583c-1.006 2.97-2.982 4.781-5.929 5.433c-.337.108-.506.282-.506.522c0 .36.456.399 1.114 2.086c.44 1.124.471 4.336.096 9.635c-.951.242-1.691.405-2.22.488c-.937.147-1.955.23-2.955.261c-1 .032-1.347.029-2.73-.1a19.799 19.799 0 0 1-2.654-.424"/>
            </g>
          </svg>
        </a>

<!--        <button class=" btn btn-circle btn-ghost btn-sm hover:scale-110 transition duration-300"-->
<!--                :class="systemStore.loginUser && localLogin?.login_type=='QQ' ?  'opacity-100' : 'opacity-50'">-->
<!--          <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">-->
<!--            <path fill="currentColor"-->
<!--                  d="m17.536 12.514l-.696-1.796c0-.021.01-.375.01-.558C16.85 7.088 15.447 4 12 4c-3.446 0-4.848 3.088-4.848 6.16c0 .183.009.537.01.557l-.696 1.797c-.19.515-.38 1.05-.517 1.51c-.657 2.189-.444 3.095-.282 3.115c.348.043 1.354-1.648 1.354-1.648c0 .98.487 2.258 1.542 3.18c-.394.127-.878.32-1.188.557c-.28.214-.245.431-.194.52c.22.385 3.79.245 4.82.125c1.03.12 4.599.26 4.82-.126c.05-.088.085-.305-.194-.519c-.311-.237-.795-.43-1.19-.556c1.055-.923 1.542-2.202 1.542-3.181c0 0 1.007 1.691 1.355 1.648c.162-.02.378-.928-.283-3.116a26.91 26.91 0 0 0-.516-1.509m1.021 8.227c-.373.652-.833.892-1.438 1.057a4.91 4.91 0 0 1-.794.138c-.44.045-.986.065-1.613.064a33.217 33.217 0 0 1-2.71-.116c-.692.065-1.785.114-2.71.116a16.048 16.048 0 0 1-1.614-.064a4.917 4.917 0 0 1-.793-.138c-.605-.164-1.065-.405-1.44-1.059a2.274 2.274 0 0 1-.239-1.652c-.592-.132-1.001-.482-1.279-.911a2.43 2.43 0 0 1-.309-.71a4.027 4.027 0 0 1-.116-1.106c.013-.785.187-1.762.532-2.912c.14-.466.327-1.008.567-1.655l.554-1.43a15.362 15.362 0 0 1-.002-.203C5.153 5.605 7.589 2 12 2c4.413 0 6.848 3.605 6.848 8.16l-.001.203l.553 1.43l.01.026c.225.606.413 1.153.556 1.626c.348 1.15.522 2.128.535 2.916c.007.407-.03.776-.118 1.108c-.066.246-.161.48-.31.708c-.276.427-.684.776-1.277.91c.13.554.055 1.14-.24 1.654"/>-->
<!--          </svg>-->
<!--        </button>-->

<!--        <button class="btn btn-circle btn-ghost btn-sm hover:scale-110 transition duration-300"-->
<!--                :class="systemStore.loginUser && localLogin?.login_type=='wechat' ?  'opacity-100' : 'opacity-50'">-->
<!--          <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">-->
<!--            <g fill="none">-->
<!--              <path-->
<!--                  d="M36.997 21.711C36.843 13.008 29.74 6 21 6C12.163 6 5 13.163 5 22c0 4.17 1.595 7.968 4.209 10.815l-1.199 7.21l7.115-3.055c3.135 1.042 6.093 1.303 8.875.782"-->
<!--                  clip-rule="evenodd"/>-->
<!--              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"-->
<!--                    d="M36.997 21.711C36.843 13.008 29.74 6 21 6C12.163 6 5 13.163 5 22c0 4.17 1.595 7.968 4.209 10.815l-1.199 7.21l7.115-3.055c3.135 1.042 6.093 1.303 8.875.782"/>-->
<!--              <path fill="currentColor"-->
<!--                    d="M15.125 20.467a2.258 2.258 0 0 0 2.25-2.267a2.258 2.258 0 0 0-2.25-2.267a2.258 2.258 0 0 0-2.25 2.267a2.258 2.258 0 0 0 2.25 2.267m9 0a2.258 2.258 0 0 0 2.25-2.267a2.258 2.258 0 0 0-2.25-2.267a2.258 2.258 0 0 0-2.25 2.267a2.258 2.258 0 0 0 2.25 2.267"/>-->
<!--              <path-->
<!--                  d="M38.762 39.93A10.453 10.453 0 0 1 32.5 42C26.701 42 22 37.299 22 31.5S26.701 21 32.5 21S43 25.701 43 31.5c0 1.6-.358 3.116-.998 4.473"-->
<!--                  clip-rule="evenodd"/>-->
<!--              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"-->
<!--                    d="M38.762 39.93A10.453 10.453 0 0 1 32.5 42C26.701 42 22 37.299 22 31.5S26.701 21 32.5 21S43 25.701 43 31.5c0 1.6-.358 3.116-.998 4.473"/>-->
<!--              <path d="M42.002 35.973L43 42l-4.238-2.07" clip-rule="evenodd"/>-->
<!--              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"-->
<!--                    d="M42.002 35.973L43 42l-4.238-2.07"/>-->
<!--              <path fill="currentColor"-->
<!--                    d="M35.688 30.8A1.694 1.694 0 0 1 34 29.1c0-.939.755-1.7 1.688-1.7c.931 0 1.687.761 1.687 1.7s-.755 1.7-1.687 1.7m-6.75 0a1.694 1.694 0 0 1-1.688-1.7c0-.939.756-1.7 1.688-1.7c.931 0 1.687.761 1.687 1.7s-.756 1.7-1.687 1.7"/>-->
<!--            </g>-->
<!--          </svg>-->
<!--        </button>-->
<!--        <button class="btn btn-circle btn-ghost btn-sm hover:scale-110 transition duration-300"-->
<!--                :class="systemStore.loginUser && localLogin?.login_type=='tiktok' ?  'opacity-100' : 'opacity-50'">-->
<!--          <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">-->
<!--            <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="3.833"-->
<!--                  d="M21.358 19.14c-5.889-.284-9.982 1.815-12.28 6.298c-3.446 6.725-.598 17.729 10.9 17.729c11.5 0 11.832-11.112 11.832-12.276V17.875c2.46 1.557 4.533 2.495 6.22 2.813c1.689.317 2.761.458 3.22.422v-6.476c-1.561-.188-2.911-.547-4.05-1.076c-1.709-.794-5.096-2.997-5.096-6.226c.002.016.002-.817 0-2.499h-7.118c-.021 15.816-.021 24.502 0 26.058c.031 2.334-1.78 5.6-5.45 5.6c-3.672 0-5.483-3.263-5.483-5.367c0-1.288.443-3.155 2.272-4.538c1.085-.82 2.59-1.148 5.033-1.148z"/>-->
<!--          </svg>-->
<!--        </button>-->
        <transition name="tips-in" mode="out-in">
          <span v-if="isHovering" class="font-bold">选择登录方式</span>
        </transition>
      </div>
      <div class="space-x-4 rounded-2xl bg-base-300 p-2 flex items-center tooltip"
           :class="systemStore.loginUser && systemStore.loginUser.hasOwnProperty('avatar_url') ? '' : 'cursor-not-allowed'"
           :data-tip="systemStore.loginUser && systemStore.loginUser.hasOwnProperty('avatar_url') ? '已使用'+localLogin?.login_type+'登录':'未登录'">
        <div v-if="systemStore.loginUser && systemStore.loginUser.hasOwnProperty('avatar_url')" class="avatar">
          <div class="w-10 rounded-full">
            <img
                :src="systemStore.loginUser && systemStore.loginUser.hasOwnProperty('avatar_url')?systemStore.loginUser['avatar_url']:''"/>
          </div>
        </div>
        <button class="btn btn-primary btn-sm"
                :class="systemStore.loginUser && systemStore.loginUser.hasOwnProperty('avatar_url') ? '':'btn-disabled'"
                @click="publish">
          {{ pulishBtnText }}
        </button>
      </div>
    </div>
    <div v-if="imgs.length" class="mt-1 relative flex bg-base-100 rounded p-1 flex-wrap max-h-80 overflow-y-scroll"
         v-viewer>
      <div v-for="item in imgs" class="relative group p-1 cursor-pointer">
        <img class="w-36 h-36 object-cover rounded" :src="item" alt="">
        <div class="absolute top-1 right-1">
          <button class="group-hover:bg-base-100 btn btn-ghost btn-sm transition duration-300 btn-circle"
                  @click="handleDelete(item)">
            <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-300"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="p-1">
        <div @click="handlePickFile"
             class="group relative flex justify-center items-center w-36 h-36 bg-base-300 rounded cursor-pointer opacity-50 hover:opacity-100 transition duration-300 z-20">
          <svg class="w-24 h-24 text-base-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
          </svg>
          <div
              class="absolute top-1 scale-0 origin-top group-hover:scale-100 transition duration-300 w-full h-fit text-center">
            <span class="bg-base-content text-base-300 p-1 rounded">继续上传</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="divider">评论区</div>
  <div class="w-full max-h-screen overflow-y-scroll border rounded p-1 bg-base-100">
    <div v-if="showSkeleton" class="flex flex-col gap-4 w-full">
      <div class="skeleton h-32 w-full"></div>
      <div class="skeleton h-4 w-28"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
    </div>
    <div v-if="!showSkeleton" v-for="item in comments">
      <div v-if="!item.commentid" class="py-3">
        <div class="flex justify-between w-full">
          <div class="flex space-x-2 items-center">
            <div class="avatar">
              <div class="w-14 rounded-full">
              <span v-for="user in userInfos">
                <img v-if="item.userid == user.userid" :src="user['avatar']"/>
              </span>
              </div>
            </div>
            <div>
              <p class="font-bold text-lg flex items-center space-x-2">
              <span v-for="user in userInfos">
                <span v-if="item['userid'] == user['userid']">{{ user.username }}</span>
              </span>
                <span class="tooltip" :data-tip="'登录平台：'+ item['login']">
                <svg v-if="item['login'] === 'gitee'" class="w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"><path fill="currentColor"
                                               d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0m6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>
                <svg v-if="item['login'] === 'QQ'" class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
                    fill="currentColor"
                    d="m17.536 12.514l-.696-1.796c0-.021.01-.375.01-.558C16.85 7.088 15.447 4 12 4c-3.446 0-4.848 3.088-4.848 6.16c0 .183.009.537.01.557l-.696 1.797c-.19.515-.38 1.05-.517 1.51c-.657 2.189-.444 3.095-.282 3.115c.348.043 1.354-1.648 1.354-1.648c0 .98.487 2.258 1.542 3.18c-.394.127-.878.32-1.188.557c-.28.214-.245.431-.194.52c.22.385 3.79.245 4.82.125c1.03.12 4.599.26 4.82-.126c.05-.088.085-.305-.194-.519c-.311-.237-.795-.43-1.19-.556c1.055-.923 1.542-2.202 1.542-3.181c0 0 1.007 1.691 1.355 1.648c.162-.02.378-.928-.283-3.116a26.91 26.91 0 0 0-.516-1.509m1.021 8.227c-.373.652-.833.892-1.438 1.057a4.91 4.91 0 0 1-.794.138c-.44.045-.986.065-1.613.064a33.217 33.217 0 0 1-2.71-.116c-.692.065-1.785.114-2.71.116a16.048 16.048 0 0 1-1.614-.064a4.917 4.917 0 0 1-.793-.138c-.605-.164-1.065-.405-1.44-1.059a2.274 2.274 0 0 1-.239-1.652c-.592-.132-1.001-.482-1.279-.911a2.43 2.43 0 0 1-.309-.71a4.027 4.027 0 0 1-.116-1.106c.013-.785.187-1.762.532-2.912c.14-.466.327-1.008.567-1.655l.554-1.43a15.362 15.362 0 0 1-.002-.203C5.153 5.605 7.589 2 12 2c4.413 0 6.848 3.605 6.848 8.16l-.001.203l.553 1.43l.01.026c.225.606.413 1.153.556 1.626c.348 1.15.522 2.128.535 2.916c.007.407-.03.776-.118 1.108c-.066.246-.161.48-.31.708c-.276.427-.684.776-1.277.91c.13.554.055 1.14-.24 1.654"/></svg>
                <svg v-else-if="item['login'] === 'github'" class="w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 48 48"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path
                    d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20s20-8.954 20-20S35.046 4 24 4M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24s-10.745 24-24 24S0 37.255 0 24"/><path
                    d="M19.183 45.472c-.193-.25-.193-2.475 0-6.674c-2.072.072-3.38-.072-3.927-.431c-.819-.539-1.64-2.2-2.367-3.371c-.728-1.17-2.343-1.356-2.995-1.618c-.652-.261-.816-1.328 1.797-.522c2.613.807 2.74 3.005 3.565 3.518c.825.514 2.796.29 3.689-.122c.893-.412.827-1.944.987-2.551c.201-.567-.509-.693-.524-.697c-.873 0-5.454-.997-6.713-5.433c-1.258-4.437.363-7.337 1.228-8.583c.576-.832.525-2.603-.153-5.314c2.464-.315 4.365.46 5.703 2.326c.002.01 1.756-1.043 4.527-1.043c2.772 0 3.755.858 4.514 1.043c.76.185 1.366-3.266 6.053-2.326c-.979 1.923-1.798 4.326-1.173 5.314c.626.987 3.08 4.127 1.573 8.583c-1.006 2.97-2.982 4.781-5.929 5.433c-.337.108-.506.282-.506.522c0 .36.456.399 1.114 2.086c.44 1.124.471 4.336.096 9.635c-.951.242-1.691.405-2.22.488c-.937.147-1.955.23-2.955.261c-1 .032-1.347.029-2.73-.1a19.799 19.799 0 0 1-2.654-.424"/></g></svg>
                <svg v-else-if="item['login'] === 'WeChat'" class="w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 48 48"><g fill="none"><path
                    d="M36.997 21.711C36.843 13.008 29.74 6 21 6C12.163 6 5 13.163 5 22c0 4.17 1.595 7.968 4.209 10.815l-1.199 7.21l7.115-3.055c3.135 1.042 6.093 1.303 8.875.782"
                    clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                               stroke-width="4"
                                               d="M36.997 21.711C36.843 13.008 29.74 6 21 6C12.163 6 5 13.163 5 22c0 4.17 1.595 7.968 4.209 10.815l-1.199 7.21l7.115-3.055c3.135 1.042 6.093 1.303 8.875.782"/><path
                    fill="currentColor"
                    d="M15.125 20.467a2.258 2.258 0 0 0 2.25-2.267a2.258 2.258 0 0 0-2.25-2.267a2.258 2.258 0 0 0-2.25 2.267a2.258 2.258 0 0 0 2.25 2.267m9 0a2.258 2.258 0 0 0 2.25-2.267a2.258 2.258 0 0 0-2.25-2.267a2.258 2.258 0 0 0-2.25 2.267a2.258 2.258 0 0 0 2.25 2.267"/><path
                    d="M38.762 39.93A10.453 10.453 0 0 1 32.5 42C26.701 42 22 37.299 22 31.5S26.701 21 32.5 21S43 25.701 43 31.5c0 1.6-.358 3.116-.998 4.473"
                    clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                               stroke-width="4"
                                               d="M38.762 39.93A10.453 10.453 0 0 1 32.5 42C26.701 42 22 37.299 22 31.5S26.701 21 32.5 21S43 25.701 43 31.5c0 1.6-.358 3.116-.998 4.473"/><path
                    d="M42.002 35.973L43 42l-4.238-2.07" clip-rule="evenodd"/><path stroke="currentColor"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    stroke-width="4"
                                                                                    d="M42.002 35.973L43 42l-4.238-2.07"/><path
                    fill="currentColor"
                    d="M35.688 30.8A1.694 1.694 0 0 1 34 29.1c0-.939.755-1.7 1.688-1.7c.931 0 1.687.761 1.687 1.7s-.755 1.7-1.687 1.7m-6.75 0a1.694 1.694 0 0 1-1.688-1.7c0-.939.756-1.7 1.688-1.7c.931 0 1.687.761 1.687 1.7s-.756 1.7-1.687 1.7"/></g></svg>
                <svg v-else-if="item['login'] === 'TikTok'" class="w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linejoin="round"
                                               stroke-width="3.833"
                                               d="M21.358 19.14c-5.889-.284-9.982 1.815-12.28 6.298c-3.446 6.725-.598 17.729 10.9 17.729c11.5 0 11.832-11.112 11.832-12.276V17.875c2.46 1.557 4.533 2.495 6.22 2.813c1.689.317 2.761.458 3.22.422v-6.476c-1.561-.188-2.911-.547-4.05-1.076c-1.709-.794-5.096-2.997-5.096-6.226c.002.016.002-.817 0-2.499h-7.118c-.021 15.816-.021 24.502 0 26.058c.031 2.334-1.78 5.6-5.45 5.6c-3.672 0-5.483-3.263-5.483-5.367c0-1.288.443-3.155 2.272-4.538c1.085-.82 2.59-1.148 5.033-1.148z"/></svg>
              </span>
              </p>
              <div class="group relative flex items-center w-full">
                <span>&nbsp;</span>
                <span class="group-hover:scale-0 scale-100 origin-left absolute transition duration-300 whitespace-nowrap">{{ moment(item['date']).fromNow() }}</span>
                <span class="group-hover:scale-100 scale-0 origin-right absolute transition duration-300 whitespace-nowrap">{{ item['date'] }}</span>
              </div>
            </div>
          </div>
          <div>
            <div class="dropdown dropdown-left">
              <div tabindex="0" role="button" class="btn m-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                </svg>
              </div>
              <div tabindex="0" class="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-96 max-md:w-72">
                <div>
                  <textarea @input="handleInput" v-model="subCommentInput" class="w-full h-1/2 textarea border-base-300"
                            placeholder="输入回复内容..."></textarea>
                </div>
                <div class="flex justify-between mt-1 relative">
                  <button class="btn btn-ghost btn-circle btn-xs" @mouseover="showSubEmoji = true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6 hover:scale-105 transition duration-300">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"/>
                    </svg>
                  </button>
                  <transition name="my_bounce" mode="out-in">
                    <div class="absolute p-5 h-fit top-0 bg-base-200 w-full rounded group" v-if="showSubEmoji"
                         @mouseleave="showSubEmoji = false">
                      <div class="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"/>
                        </svg>
                        <h4 class="card-title">选择表情</h4>
                      </div>
                      <p class="w-full h-64">
                        <ReadPaperEmoji @pickEmoji="handleSubPickEmoji"/>
                      </p>

                    </div>
                  </transition>
                  <div>
                    <button class="btn btn-primary btn-xs"
                            :class="systemStore.loginUser && systemStore.loginUser.hasOwnProperty('avatar_url') ? '':'btn-disabled'"
                            @click="publish_sub(item._id['$oid'])">
                      {{ subPulishBtnText }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-5">
          <p v-if="!item.hidden">{{ item['content'] }}</p>
          <p v-else class="opacity-80 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12A9.821 9.821 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.821 9.821 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"/></svg>
            <span>该评论已被隐藏</span>
          </p>
        </div>
        <div v-viewer class="w-fit max-w-full flex flex-wrap bg-base-200 mt-1 rounded">
          <div v-for="item in item['imgs']" :key="item" class="relative group p-1 cursor-pointer">
            <img class="w-24 h-24 object-cover rounded" :src="item" alt="">
          </div>
        </div>
        <div class="px-5 flex justify-between mt-2">
          <div class="flex flex-wrap space-y-1">
            <div class="flex items-center space-x-1 mr-1">
              <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
                  <path stroke-linecap="round"
                        d="M9.858 32.757C6.238 33.843 4 35.343 4 37c0 3.314 8.954 6 20 6s20-2.686 20-6c0-1.657-2.239-3.157-5.858-4.243"/>
                  <path d="M24 35s13-8.496 13-18.318C37 9.678 31.18 4 24 4S11 9.678 11 16.682C11 26.504 24 35 24 35Z"/>
                  <path d="M24 22a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z"/>
                </g>
              </svg>
              <div class="badge badge-outline badge-primary">{{ item['location'] }}</div>
            </div>
            <div class="flex items-center space-x-1">
              <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
                  <rect width="36" height="28" x="6" y="6" rx="3"/>
                  <path stroke-linecap="round" d="M14 42h20m-10-8v8"/>
                </g>
              </svg>
              <div v-if="item['platform'] =='Windows'" class="badge badge-outline badge-primary">{{
                  item['platform']
                }}
              </div>
              <div v-if="item['platform'] =='Mac OS'" class="badge badge-outline badge-secondary">{{
                  item['platform']
                }}
              </div>
              <div v-if="item['platform'] =='Linux'" class="badge badge-outline badge-error">{{
                  item['platform']
                }}
              </div>
              <div v-if="item['platform'] =='iOS'" class="badge badge-outline badge-accent">{{ item['platform'] }}</div>
              <div v-if="item['platform'] =='Android'" class="badge badge-outline badge-info">{{
                  item['platform']
                }}
              </div>
              <div v-if="item['platform'] =='Unknown OS'" class="badge badge-outline badge-success">{{
                  item['platform']
                }}
              </div>
            </div>
          </div>
          <div class="flex justify-end space-x-4 items-center">
            <div class="indicator" @click="likeComment(item['_id'])">
              <span class="indicator-item badge badge-xs ">{{ item['like'] }}</span>
              <svg
                  class="active:-translate-y-1 transition duration-300 w-6 h-6 hover:bg-base-300 rounded-full cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"/>
              </svg>
            </div>
            <div class="indicator">
              <span class="indicator-item badge badge-xs">{{ item['dislike'] }}</span>
              <svg
                  class="active:translate-y-1 transition duration-300 w-6 h-6 hover:bg-base-300 rounded-full cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-base-200 mt-2 rounded p-4 ml-10">
          <div>
            回复评论
          </div>
          <div v-for="subitem in comments">
            <div class="flex w-full flex-wrap mt-2 bg-base-100 p-2 rounded" v-if="subitem.commentid == item._id['$oid']">
              <div class="max-md:w-full flex flex-nowrap flex-shrink-0 space-x-2 items-center px-1 border-base-300 border-r">
                <div class="avatar">
                  <div class="w-10 rounded-full">
              <span v-for="user in userInfos">
                <img v-if="subitem['userid'] == user['userid']" :src="user['avatar']"/>
              </span>
                  </div>
                </div>
                <div>
                  <p class="font-bold text-md flex items-center space-x-1">
              <span v-for="user in userInfos">
                <span v-if="subitem['userid'] == user['userid']">{{ user.username }}</span>
                <span class="ml-1 text-xs font-normal bg-base-200 p-1 rounded-full" v-if="(subitem['userid'] == user['userid'])&&(subitem['userid'] == item['userid'])">楼主</span>
              </span>
                    <span class="tooltip" :data-tip="'登录平台：'+ subitem['login']">
                <svg v-if="subitem['login'] === 'gitee'" class="w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"><path fill="currentColor"
                                               d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0m6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>
                <svg v-if="subitem['login'] === 'QQ'" class="w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"><path
                    fill="currentColor"
                    d="m17.536 12.514l-.696-1.796c0-.021.01-.375.01-.558C16.85 7.088 15.447 4 12 4c-3.446 0-4.848 3.088-4.848 6.16c0 .183.009.537.01.557l-.696 1.797c-.19.515-.38 1.05-.517 1.51c-.657 2.189-.444 3.095-.282 3.115c.348.043 1.354-1.648 1.354-1.648c0 .98.487 2.258 1.542 3.18c-.394.127-.878.32-1.188.557c-.28.214-.245.431-.194.52c.22.385 3.79.245 4.82.125c1.03.12 4.599.26 4.82-.126c.05-.088.085-.305-.194-.519c-.311-.237-.795-.43-1.19-.556c1.055-.923 1.542-2.202 1.542-3.181c0 0 1.007 1.691 1.355 1.648c.162-.02.378-.928-.283-3.116a26.91 26.91 0 0 0-.516-1.509m1.021 8.227c-.373.652-.833.892-1.438 1.057a4.91 4.91 0 0 1-.794.138c-.44.045-.986.065-1.613.064a33.217 33.217 0 0 1-2.71-.116c-.692.065-1.785.114-2.71.116a16.048 16.048 0 0 1-1.614-.064a4.917 4.917 0 0 1-.793-.138c-.605-.164-1.065-.405-1.44-1.059a2.274 2.274 0 0 1-.239-1.652c-.592-.132-1.001-.482-1.279-.911a2.43 2.43 0 0 1-.309-.71a4.027 4.027 0 0 1-.116-1.106c.013-.785.187-1.762.532-2.912c.14-.466.327-1.008.567-1.655l.554-1.43a15.362 15.362 0 0 1-.002-.203C5.153 5.605 7.589 2 12 2c4.413 0 6.848 3.605 6.848 8.16l-.001.203l.553 1.43l.01.026c.225.606.413 1.153.556 1.626c.348 1.15.522 2.128.535 2.916c.007.407-.03.776-.118 1.108c-.066.246-.161.48-.31.708c-.276.427-.684.776-1.277.91c.13.554.055 1.14-.24 1.654"/></svg>
                <svg v-else-if="subitem['login'] === 'github'" class="w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 48 48"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path
                    d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20s20-8.954 20-20S35.046 4 24 4M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24s-10.745 24-24 24S0 37.255 0 24"/><path
                    d="M19.183 45.472c-.193-.25-.193-2.475 0-6.674c-2.072.072-3.38-.072-3.927-.431c-.819-.539-1.64-2.2-2.367-3.371c-.728-1.17-2.343-1.356-2.995-1.618c-.652-.261-.816-1.328 1.797-.522c2.613.807 2.74 3.005 3.565 3.518c.825.514 2.796.29 3.689-.122c.893-.412.827-1.944.987-2.551c.201-.567-.509-.693-.524-.697c-.873 0-5.454-.997-6.713-5.433c-1.258-4.437.363-7.337 1.228-8.583c.576-.832.525-2.603-.153-5.314c2.464-.315 4.365.46 5.703 2.326c.002.01 1.756-1.043 4.527-1.043c2.772 0 3.755.858 4.514 1.043c.76.185 1.366-3.266 6.053-2.326c-.979 1.923-1.798 4.326-1.173 5.314c.626.987 3.08 4.127 1.573 8.583c-1.006 2.97-2.982 4.781-5.929 5.433c-.337.108-.506.282-.506.522c0 .36.456.399 1.114 2.086c.44 1.124.471 4.336.096 9.635c-.951.242-1.691.405-2.22.488c-.937.147-1.955.23-2.955.261c-1 .032-1.347.029-2.73-.1a19.799 19.799 0 0 1-2.654-.424"/></g></svg>
                <svg v-else-if="subitem['login'] === 'WeChat'" class="w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 48 48"><g fill="none"><path
                    d="M36.997 21.711C36.843 13.008 29.74 6 21 6C12.163 6 5 13.163 5 22c0 4.17 1.595 7.968 4.209 10.815l-1.199 7.21l7.115-3.055c3.135 1.042 6.093 1.303 8.875.782"
                    clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                               stroke-width="4"
                                               d="M36.997 21.711C36.843 13.008 29.74 6 21 6C12.163 6 5 13.163 5 22c0 4.17 1.595 7.968 4.209 10.815l-1.199 7.21l7.115-3.055c3.135 1.042 6.093 1.303 8.875.782"/><path
                    fill="currentColor"
                    d="M15.125 20.467a2.258 2.258 0 0 0 2.25-2.267a2.258 2.258 0 0 0-2.25-2.267a2.258 2.258 0 0 0-2.25 2.267a2.258 2.258 0 0 0 2.25 2.267m9 0a2.258 2.258 0 0 0 2.25-2.267a2.258 2.258 0 0 0-2.25-2.267a2.258 2.258 0 0 0-2.25 2.267a2.258 2.258 0 0 0 2.25 2.267"/><path
                    d="M38.762 39.93A10.453 10.453 0 0 1 32.5 42C26.701 42 22 37.299 22 31.5S26.701 21 32.5 21S43 25.701 43 31.5c0 1.6-.358 3.116-.998 4.473"
                    clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                               stroke-width="4"
                                               d="M38.762 39.93A10.453 10.453 0 0 1 32.5 42C26.701 42 22 37.299 22 31.5S26.701 21 32.5 21S43 25.701 43 31.5c0 1.6-.358 3.116-.998 4.473"/><path
                    d="M42.002 35.973L43 42l-4.238-2.07" clip-rule="evenodd"/><path stroke="currentColor"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    stroke-width="4"
                                                                                    d="M42.002 35.973L43 42l-4.238-2.07"/><path
                    fill="currentColor"
                    d="M35.688 30.8A1.694 1.694 0 0 1 34 29.1c0-.939.755-1.7 1.688-1.7c.931 0 1.687.761 1.687 1.7s-.755 1.7-1.687 1.7m-6.75 0a1.694 1.694 0 0 1-1.688-1.7c0-.939.756-1.7 1.688-1.7c.931 0 1.687.761 1.687 1.7s-.756 1.7-1.687 1.7"/></g></svg>
                <svg v-else-if="subitem['login'] === 'TikTok'" class="w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linejoin="round"
                                               stroke-width="3.833"
                                               d="M21.358 19.14c-5.889-.284-9.982 1.815-12.28 6.298c-3.446 6.725-.598 17.729 10.9 17.729c11.5 0 11.832-11.112 11.832-12.276V17.875c2.46 1.557 4.533 2.495 6.22 2.813c1.689.317 2.761.458 3.22.422v-6.476c-1.561-.188-2.911-.547-4.05-1.076c-1.709-.794-5.096-2.997-5.096-6.226c.002.016.002-.817 0-2.499h-7.118c-.021 15.816-.021 24.502 0 26.058c.031 2.334-1.78 5.6-5.45 5.6c-3.672 0-5.483-3.263-5.483-5.367c0-1.288.443-3.155 2.272-4.538c1.085-.82 2.59-1.148 5.033-1.148z"/></svg>
              </span>
                  </p>
                  <div class="group relative flex items-center">
                    <span>&nbsp;</span>
                    <span class="group-hover:scale-0 scale-100 origin-left text-xs absolute transition duration-300">{{ moment(subitem['date']).fromNow() }}</span>
                    <span class="group-hover:scale-100 scale-0 origin-left text-xs absolute transition duration-300">{{ subitem['date'] }}</span>
                  </div>
                  <div class="space-x-2">
                    <span class="text-xs">{{ subitem.location }}</span>
                    <span class="text-xs">{{ subitem.platform }}</span>
                  </div>
                </div>
              </div>
              <div class="ml-2 whitespace-break-spaces">
                <p v-if="!subitem.hidden">{{ subitem['content'] }}</p>
                <p v-else class="opacity-80 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12A9.821 9.821 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.821 9.821 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"/></svg>
                  <span>该评论已被隐藏</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <div class="divider divider-start"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref, toRaw} from 'vue';
import {type localLoginInter, type userInfosInter, type commentInter} from "~/types";
import {getComments} from "~/utils/getComments";
import {getUserByUserId} from "~/utils/getUserByUserId";
import {getUserInfoFromGithub} from "~/utils/getUserInfoFromGithub";
import {getUserInfoFromGitee} from "~/utils/getUserInfoFromGitee";
import {publishComment} from "~/utils/publishComment";
import {getOSInfo} from "~/utils/getOSInfo";
import config from "public/config.json";
import moment from 'moment';
import 'moment/locale/zh-cn';
import {useFileDialog} from '@vueuse/core';
import {useSystemStore} from "~/stores/systemStore";
import {usePaperStore} from "~/stores/paperStore";
import {upload} from '~/utils/uploadFiles'

const systemStore = useSystemStore();
const paperStore = usePaperStore();


const {files, open, reset} = useFileDialog({
  accept: 'image/*',
  multiple: true
})

moment.locale('zh-cn')

const isHovering = ref(false);
const props = defineProps({
  id: String,
  title:String
})
const comments = ref<commentInter[]>([])
const userInfos = ref<userInfosInter[]>([])
const showSkeleton = ref(true)
const githubLoginHref = ref('')
const giteeLoginHref = ref('')
const localLogin = ref<localLoginInter>()
const commentInput = ref('')
const subCommentInput = ref('')
const pulishBtnText = ref('发布')
const subPulishBtnText = ref('回复')
const ip = ref('未获取到位置信息')
const imgs = ref<string[]>([])
const showSubEmoji = ref(false)


onMounted(() => {
  getCommentsFun()
  githubLoginHref.value = `https://github.com/login/oauth/authorize?client_id=${config.github_client_id}&redirect_uri=${config.github_redirect_uri}&state=read${props.id}`
  giteeLoginHref.value = `https://gitee.com/oauth/authorize?client_id=${config.gitee_client_id}&redirect_uri=${config.gitee_redirect_uri}&response_type=code&scope=user_info&state=read${props.id}`
  if (localStorage.getItem('login')) {
    localLogin.value = JSON.parse(localStorage.getItem('login') as string);
    if (!systemStore.loginUser?.id) {
      if (localLogin.value?.login_type) {
        if (localLogin.value?.login_type === 'github') {
          getUserInfoFromGithub(JSON.parse(localStorage.getItem('login') as string)['access_token']).then(res => {
            systemStore.setLoginUser(res)
          })
        } else if (localLogin.value?.login_type === 'gitee') {
          getUserInfoFromGitee(JSON.parse(localStorage.getItem('login') as string)['access_token']).then(res => {
            systemStore.setLoginUser(res)
          })
        }
      }
    }
  }
  fetch("https://api.ipify.org/").then(res => {
    res.text().then(nowIp => {
      ip.value = nowIp
    })
  }).catch(err => {
    console.log(err)
  })
});

const getCommentsFun = () => {
  userInfos.value = []
  getComments(config.baseUrl + '/api/comments/getcommentsbypaperid?_id=' + props.id, {}).then(res => {
    comments.value = res;
    paperStore.setCommentCount(comments.value.length)
    let useridList: Array<string> = [];
    if (res) {
      let tempList = [];
      for (let i = 0; i < res.length; i++) {
        tempList.push(res[i]['userid'])
      }
      useridList = [...new Set(tempList)];
    }
    for (let i = 0; i < useridList.length; i++) {
      getUserByUserId(config.baseUrl + '/api/users/getuserbyuserid?userid=' + useridList[i], {}).then(res => {
        userInfos.value.push(res[0])
      })
    }
    showSkeleton.value = false;
  })
}

const totalText = computed(() => {
  return commentInput.value.split('').length;
})

const handleInput = () => {
  pulishBtnText.value = "发布"
  if (totalText.value > 1000) {
    commentInput.value = commentInput.value.substring(0, 1000);
  }
}
const publish = async () => {
  if (commentInput.value === "") {
    pulishBtnText.value = "没有输入内容"
    return;
  }
  if (!systemStore.loginUser.hasOwnProperty('id')) {
    pulishBtnText.value = "没有登录"
    return;
  }
  pulishBtnText.value = "发布中..."
  let platform = getOSInfo();

  let data = {
    comment: {
      paperid: props.id,
      title:props.title,
      content: commentInput.value,
      userid: localLogin.value?.login_type + ':' + systemStore.loginUser.id,
      ip: ip.value,
      platform: platform,
      login: localLogin.value?.login_type,
      imgs: []
    },
    logininfo: {
      access_token: localLogin.value?.access_token
    }
  }
  let up_res = ""
  if (files.value) {
    pulishBtnText.value = '正在上传图片...';
    up_res = await upload(files.value, config.baseUrl + '/api/file/upload');
    pulishBtnText.value = '图片上传成功';
    handleReset()
  }
  if (up_res !== "") {
    data.comment.imgs = JSON.parse(up_res)
  }
  publishComment(config.baseUrl + '/api/comments/publishcomment', data).then(res => {
    if (res) {
      if (res.success) {
        pulishBtnText.value = "发布成功";
        getCommentsFun();
        commentInput.value = "";
      } else {
        pulishBtnText.value = "发布失败"
      }
    }
  })
}

const publish_sub = async (commentid: string) => {
  if (subCommentInput.value === "") {
    subPulishBtnText.value = "没有输入内容"
    return;
  }
  if (!systemStore.loginUser.hasOwnProperty('id')) {
    subPulishBtnText.value = "没有登录"
    return;
  }
  subPulishBtnText.value = "发布中..."
  let platform = getOSInfo();

  let data = {
    comment: {
      paperid: props.id,
      content: subCommentInput.value,
      userid: localLogin.value?.login_type + ':' + systemStore.loginUser.id,
      ip: ip.value,
      platform: platform,
      login: localLogin.value?.login_type,
      commentid: commentid,
      title:props.title
    },
    logininfo: {
      access_token: localLogin.value?.access_token
    }
  }
  publishComment(config.baseUrl + '/api/comments/publishcomment', data).then(res => {
    if (res) {
      if (res.success) {
        subPulishBtnText.value = "发布成功";
        getCommentsFun();
        subCommentInput.value = "";
      } else {
        subPulishBtnText.value = "发布失败"
      }
    }
  })
}

const handlePickEmoji = (emoji: any) => {
  commentInput.value += emoji;
}
const handleSubPickEmoji = (emoji: any) => {
  subCommentInput.value += emoji;
}

const handlePickFile = () => {
  reset()
  open()
}
watch(files, () => {
  if (files.value?.length) {
    for (let i = 0; i < files.value?.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imgs.value.push(e.target?.result as string)
      }
      reader.readAsDataURL(files.value[i]);
    }
  }
})

const handleReset = () => {
  imgs.value = []
  reset()
}

const handleDelete = (item: any) => {
  // if (imgs.value?.length){
  //   for (let i = 0; i < imgs.value.length; i++) {
  //       if (imgs.value[i] === item){
  //         imgs.value.splice(imgs.value.indexOf(item),1);
  //         break;
  //       }
  //   }
  // }
}

const likeComment = (id: string) => {

}


</script>

<style scoped>

</style>