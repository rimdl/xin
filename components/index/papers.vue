<template>
  <div class="w-full flex flex-row flex-wrap">

    <div class="flex justify-between w-full gap-1">
      <div class="overflow-hidden flex-grow flex items-center flex-nowrap bg-base-200 rounded-lg p-1 relative">
        <div>
          <button :class="systemStore.now_category == ''?'btn-primary':'btn-ghost bg-base-100'"
                  class="btn flex flex-nowrap flex-shrink-0" @click="get_all_papers">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span class="whitespace-nowrap">全部</span>
          </button>
        </div>
        <div class="overflow-x-hidden flex flex-nowrap space-x-1 ml-1 w-full">
          <div v-for="item in dataStore.categoryLists.slice(0, 30)" class="flex items-center">
            <button class="btn" :class="item === systemStore.now_category? 'btn-primary':'bg-base-100'"
                    @click="filter_by_category(item)">
              <span>{{ item }}</span>
            </button>
          </div>

        </div>
        <div class="absolute right-0">
          <NuxtLink to="/categories">
            <button class="flex btn flex-shrink-0">
              更多
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="flex justify-between hover:bg-base-300 bg-base-200 transition duration-300 group p-2 rounded-xl">
        <svg @click="view_mode = 'list'" xmlns="http://www.w3.org/2000/svg" class="w-6 cursor-pointer group-hover:scale-105 transition duration-300" viewBox="0 0 256 256"><path fill="currentColor" d="M56 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16M40 48a16 16 0 1 0 16 16a16 16 0 0 0-16-16m0 128a16 16 0 1 0 16 16a16 16 0 0 0-16-16m176-64H88a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8m0-64H88a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8m0 128H88a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8"/></svg>
        <svg @click="view_mode = 'window'" xmlns="http://www.w3.org/2000/svg" class="w-6 cursor-pointer group-hover:scale-105 transition duration-300" viewBox="0 0 24 24"><path fill="currentColor" d="M13 13h8v6q0 .825-.587 1.413T19 21h-6zm0-2V3h6q.825 0 1.413.588T21 5v6zm-2 0H3V5q0-.825.588-1.412T5 3h6zm0 2v8H5q-.825 0-1.412-.587T3 19v-6z"/></svg>
      </div>
    </div>
    <Transition name="page" mode="out-in">
    <div v-if="view_mode == 'list'" class="w-full">
      <div class="w-full mt-2 mb-2 grid items-start h-fit shadow rounded-xl group hover:translate-y-1 transition duration-300" v-if="paperStore.papers" v-for="item in paperStore.papers" :key="item['_id']['$oid']">
        <div class="flex items-center w-full gap-4 p-1 justify-start lg:flex-row">
          <div class="w-52 overflow-hidden rounded-lg relative">
            <NuxtLink :to="`/read${item['_id']['$oid']}`">
            <img :src="item.cover" class="group-hover:scale-105 transition duration-300 object-cover h-56 w-52 rounded-lg shadow-2xl cursor-pointer" alt=""/>
            </NuxtLink>
            <div v-if="item.category" class="absolute top-1 left-1 bg-base-100 rounded-xl p-2 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
              <span>{{item.category}}</span>
            </div>
          </div>
          <div class="w-full flex-grow">
            <h1 class="text-3xl font-bold w-full">{{item.title}}</h1>
            <p class="py-6">{{item.desc}}</p>
            <p class="py-1 text-sm">{{item.date}}</p>
            <div class="flex justify-between items-center">
              <div class="flex flex-wrap">
                <span v-for="tag in item.tags">
                <NuxtLink :to="'/tags?tag='+tag">
                <a class="link ml-1" >#&nbsp;{{tag}}</a>
                </NuxtLink>
                </span>
              </div>
              <NuxtLink :to="`/read${item['_id']['$oid']}`">
              <button class="btn btn-primary">阅读</button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div v-else class="w-full flex flex-wrap">
        <div v-if="paperStore.papers" v-for="item in paperStore.papers" :key="item['_id']['$oid']"
             class="p-5 max-sm:p-1 mt-2 md:w-1/2 sm:w-full max-sm:w-full lg:w-1/2 xl:w-1/2">
          <div class="card glass group hover:bg-base-200 hover:shadow transition duration-500 ">
            <NuxtLink :to="`/read${item['_id']['$oid']}`">
              <figure class="h-96 rounded-t-2xl relative">
                <img class="object-cover w-full h-full transition duration-500 group-hover:scale-105" :src="item['cover']"
                     alt="car!"/>
                <div
                    class="flex justify-between items-center w-full bg-base-200 opacity-0 transition duration-500 min-h-32  absolute bottom-0 right-0 translate-y-full group-hover:-translate-y-0 group-hover:opacity-80">
                  <div class="ml-10">
                    <span class="text-2xl font-bold">{{ item["title"] }}</span>
                  </div>
                  <div class="mr-10 flex space-x-1 bg-base-300 p-5 rounded-2xl items-center flex-nowrap">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
                    </svg>
                    <p class="whitespace-nowrap">点击浏览</p>
                  </div>
                </div>
                <div v-if="item.category" class="absolute top-2 left-2 p-3 backdrop-blur rounded-lg bg-base-100 bg-opacity-50">
                  <span class="font-bold">{{ item["category"] }}</span>
                </div>
              </figure>
            </NuxtLink>
            <div class="card-body">
              <div class="flex justify-end bg-amber-400">

                <div class="relative">
                  <span
                      class="absolute top-0 right-0 whitespace-nowrap group-hover:scale-0 scale-100 transition duration-300 origin-left font-extralight text-xs">
                      {{ moment(item['date']).fromNow() }}
              </span>
                  <span
                      class="absolute top-0 right-0 whitespace-nowrap group-hover:scale-100 scale-0 origin-right transition duration-300 font-extralight text-xs">
                    {{ item['date'] }}
              </span>
                </div>
              </div>
              <h1 class="card-title group-hover:text-primary overflow-ellipsis w-full whitespace-nowrap overflow-hidden">
                {{ item['title'] }}</h1>
              <p class="overflow-ellipsis w-full whitespace-nowrap overflow-hidden group-hover:text-primary"
                 v-text="item['desc'] ? item['desc'] : item['content']"></p>
              <div class="card-actions items-center justify-between">
                <div class="space-x-1 w-3/5 overflow-hidden overflow-ellipsis whitespace-nowrap">
              <span class="link" v-for="i in item['tags']">
                <NuxtLink :to="'/tags?tag='+i">
              <span class="font-semibold text-sm">#</span>
                {{ i }}
                </NuxtLink>
              </span>
                </div>
                <div class="w-1/5">
                  <NuxtLink :to="`/read${item['_id']['$oid']}`">
                    <button class="btn btn-ghost btn-block">阅读</button>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>


    <div v-if="total_papers<=0" class="flex w-full justify-center flex-col items-center p-5">
      <svg class="w-1/2" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity=".302"
              d="M124.645 102.87c19.586-33.838 44.775-29.344 60.392 15.667 15.617 45.01 52.771 62.396 90.399 31.714 14.027-13.618 35.238-14.088 44.079 21.393 2.103 11.917 3.029 18.858 2.777 20.821H34.701c0-11.435 4.968-23.114 14.905-35.035 22.97-24.944 55.453-20.722 75.039-54.56Z"
              fill="url(#a)"/>
        <path opacity=".302"
              d="M189.371 202.561s-66.757 0-99.856-35.488C68.719 145.127 46.857 156.842 39 206.941c-.011.605 50.112.605 150.371 0v-4.38Z"
              fill="url(#b)"/>
        <path
            d="M245.065 90.676h-71.406a4.01 4.01 0 0 0-4.01 4.01v109.192a4.01 4.01 0 0 0 4.01 4.01h71.406a4.01 4.01 0 0 0 4.01-4.01V94.686a4.01 4.01 0 0 0-4.01-4.01Z"
            fill="url(#c)"/>
        <path
            d="M251.234 90.676h-71.406a4.01 4.01 0 0 0-4.01 4.01v109.192a4.01 4.01 0 0 0 4.01 4.01h71.406a4.01 4.01 0 0 0 4.01-4.01V94.686a4.01 4.01 0 0 0-4.01-4.01Z"
            fill="url(#d)"/>
        <path
            d="M244.22 106.87h-57.377a1 1 0 0 0-1 1v2.856a1 1 0 0 0 1 1h57.377a1 1 0 0 0 1-1v-2.856a1 1 0 0 0-1-1ZM244.22 118.437h-57.377a1 1 0 0 0-1 1v2.856a1 1 0 0 0 1 1h57.377a1 1 0 0 0 1-1v-2.856a1 1 0 0 0-1-1ZM214.917 130.004h-28.074a1 1 0 0 0-1 1v2.856a1 1 0 0 0 1 1h28.074a1 1 0 0 0 1-1v-2.856a1 1 0 0 0-1-1Z"
            fill="#EBEBF2"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M256.73 202.64c2.094 1.502 3.558 2.253 4.39 2.253 1.248 0 1.922 1.295.762 1.995-1.161.699-4.878-.309-5.83-.309s-3.403.4-2.464-2.766c.626-2.111 1.201-3.009 1.725-2.695l1.417.445v1.077ZM239.322 202.64c-2.094 1.502-3.558 2.253-4.39 2.253-1.248 0-1.923 1.295-.762 1.995 1.161.699 4.878-.309 5.83-.309s3.403.4 2.464-2.766c-.626-2.111-1.201-3.009-1.725-2.695l-1.417.445v1.077Z"
              fill="#3E3E6E"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M256.786 165.405c1.22 8.869 1.577 17.923 1.07 27.161-.71 9.967.034 9.746-1.07 9.746-.417 0-2.114.224-2.489-.432-.895-1.571-2.34-14.741-1.783-17.389.055-.398-5.566-12.757-5.566-17.564.209-.938 3.488-1.445 9.838-1.522Z"
              fill="url(#e)"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M239.438 165.405c-1.22 8.869-1.576 17.923-1.07 27.161.71 9.967-.034 9.746 1.07 9.746.417 0 2.114.224 2.489-.432.895-1.571 2.341-14.741 1.784-17.389-.056-.398 5.565-12.757 5.565-17.564-.209-.938-3.488-1.445-9.838-1.522Z"
              fill="url(#f)"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M236.322 147.073c-2.059 4.61-3.316 7.523-3.77 8.737-.211.503-2.934 1.757-8.169 3.761-1.755.154-2.758.675-3.01 1.564-.143.571-.079 1.549.814 1.63.596.054 1.445-.395 2.547-1.346 5.848.21 9.326-.765 10.434-2.926 1.108-2.16 2.795-5.505 5.062-10.032l-3.637-1.776-.271.388Z"
              fill="url(#g)"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M255.534 140.219c0-.833 3.366-3.689 4.432-4.84.295-.049-5.363-1.05-9.219-3.385-2.571-1.556-2.77-2.066-.597-1.531 5.485 1.021 9.572 1.925 12.261 2.711 2.655 1.199-.052 5.12-2.69 9.879-2.639 4.759-4.187-2-4.187-2.834Z"
              fill="url(#h)"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M245.115 131.007c-.638 3.18-.338 5.05.898 5.609 1.619.674.476 2.065.149 2.236-.219.114-.165.501.16 1.159 1.023.541 1.776.756 2.256.646.481-.11 1.068-.651 1.76-1.623-1.289-.926-1.738-1.669-1.347-2.229.392-.56.987-1.143 1.786-1.751.775-.593.745-1.045-.09-1.354.202-.561.277-1.201.224-1.919l-2.717-.774-2.765-.603-.314.603Z"
              fill="url(#i)"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M246.402 138.592c-5.133.106-8.706 2.95-10.719 8.531.269.1 4.02 1.899 4.02 3.066 0 1.166-2.079 12.823-1.824 15.255.255 2.432 10.209 4.724 19.948 1.518.664-.638.039-14.731-1.672-18.467-.089-.156 4.194-4.077 3.894-5.489-.3-1.411-2.958-3.906-4.41-3.906s-4.972.227-5.793-.508c-.346-.311-.001 1.005-1.792 1.005-.717 0-1.268-.335-1.652-1.005Z"
              fill="#5B5BEA"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M246.932 131.729c2.648-.753 3.352.405 3.352.895 0 .326-.084.867-.251 1.624.326-.145.555-.255.688-.33a3.473 3.473 0 0 0 1.541-1.908c.358-1.185-.694-3.698-3.421-3.324-.95-.18-1.101-1.579-2.753-.718-1.652.861-2.209.199-2.209 1.081 0 .883.068 3.602 3.053 2.68Z"
              fill="#353564"/>
        <path
            d="M119.525 207.117c7.666 0 13.881-6.215 13.881-13.88 0-7.666-6.215-13.881-13.881-13.881s-13.88 6.215-13.88 13.881c0 7.665 6.214 13.88 13.88 13.88Z"
            fill="url(#j)"/>
        <path d="M120.296 185.525a.77.77 0 1 0-1.542 0v3.085a.77.77 0 1 0 1.542 0v-3.085Z" fill="#5B5BEA"/>
        <path opacity=".9"
              d="M125.073 187.825a.772.772 0 0 0-1.182-.991l-1.982 2.363a.77.77 0 1 0 1.181.991l1.983-2.363Z"
              fill="#5B5BEA"/>
        <path opacity=".7"
              d="M127.254 192.657a.771.771 0 0 0-.268-1.519l-3.038.536a.771.771 0 0 0 .268 1.519l3.038-.536Z"
              fill="#5B5BEA"/>
        <path opacity=".6"
              d="M125.818 197.76a.77.77 0 1 0 .771-1.336l-2.671-1.542a.772.772 0 0 0-.771 1.336l2.671 1.542Z"
              fill="#5B5BEA"/>
        <path opacity=".5" d="M121.438 200.747a.77.77 0 1 0 1.449-.528l-1.055-2.898a.77.77 0 1 0-1.449.527l1.055 2.899Z"
              fill="#5B5BEA"/>
        <path opacity=".4"
              d="M116.163 200.219a.771.771 0 0 0 1.45.528l1.055-2.899a.771.771 0 0 0-1.45-.527l-1.055 2.898Z"
              fill="#5B5BEA"/>
        <path opacity=".3"
              d="M112.462 196.424a.772.772 0 1 0 .771 1.336l2.671-1.542a.772.772 0 0 0-.771-1.336l-2.671 1.542Z"
              fill="#5B5BEA"/>
        <path opacity=".2" d="M112.065 191.138a.77.77 0 0 0-.268 1.519l3.038.536a.77.77 0 0 0 .268-1.519l-3.038-.536Z"
              fill="#5B5BEA"/>
        <path opacity=".1" d="M115.159 186.834a.77.77 0 1 0-1.181.991l1.983 2.363a.77.77 0 1 0 1.181-.991l-1.983-2.363Z"
              fill="#5B5BEA"/>
        <path opacity=".398"
              d="M58.606 199.034c14.326 6.056 25.976 1.959 34.952-12.293 13.462-21.377 31.62-22.663 45.691-8.927 14.072 13.736 22.498 27.157 50.847 24.819 15.36-1.653 25.738-14.549 31.134-38.688"
              stroke="url(#k)" stroke-width=".881" stroke-linecap="round" stroke-dasharray="2.64 2.64"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M216.128 150.301c.248.318 4.804 6.277 13.666 17.876l-6.059.72c-5.319-12.715-7.855-18.914-7.607-18.596Z"
              fill="#FCC55E"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M216.128 150.301c.154.512.908 7.816 2.262 21.914l5.345-3.318c-5.225-12.909-7.76-19.108-7.607-18.596Z"
              fill="#DB9710"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="m216.128 150.301-4.077 20.333 7.645-1.791-3.568-18.542Z"
              fill="#FCC55E"/>
        <defs>
          <linearGradient id="a" x1="178.517" y1="80.651" x2="178.517" y2="192.465" gradientUnits="userSpaceOnUse">
            <stop stop-color="#DCDCE4"/>
            <stop offset="1" stop-color="#DEDEE6" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="b" x1="114.185" y1="156.5" x2="114.185" y2="207.395" gradientUnits="userSpaceOnUse">
            <stop stop-color="#DCDCE4"/>
            <stop offset="1" stop-color="#DEDEE6" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="c" x1="209.362" y1="90.676" x2="209.362" y2="207.888" gradientUnits="userSpaceOnUse">
            <stop stop-color="#ECECF0"/>
            <stop offset="1" stop-color="#D8D8E4"/>
          </linearGradient>
          <linearGradient id="d" x1="215.531" y1="90.676" x2="215.531" y2="198.457" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F8F8FB"/>
            <stop offset="1" stop-color="#FAFAFE"/>
          </linearGradient>
          <linearGradient id="e" x1="252.786" y1="200.587" x2="249.807" y2="167.076" gradientUnits="userSpaceOnUse">
            <stop stop-color="#7878C3"/>
            <stop offset="1" stop-color="#5C5CBB"/>
          </linearGradient>
          <linearGradient id="f" x1="243.438" y1="200.587" x2="246.417" y2="167.076" gradientUnits="userSpaceOnUse">
            <stop stop-color="#7878C3"/>
            <stop offset="1" stop-color="#5C5CBB"/>
          </linearGradient>
          <linearGradient id="g" x1="223.714" y1="159.807" x2="236.303" y2="148.233" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFD2C4"/>
            <stop offset="1" stop-color="#FFB8A3"/>
          </linearGradient>
          <linearGradient id="h" x1="256.079" y1="131.823" x2="258.907" y2="141.093" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFD2C4"/>
            <stop offset="1" stop-color="#FFB8A3"/>
          </linearGradient>
          <linearGradient id="i" x1="246.119" y1="132.063" x2="251.203" y2="137.72" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFD2C4"/>
            <stop offset="1" stop-color="#FFB8A3"/>
          </linearGradient>
          <linearGradient id="j" x1="117.3" y1="181.72" x2="125.255" y2="205.315" gradientUnits="userSpaceOnUse">
            <stop stop-color="#fff"/>
            <stop offset="1" stop-color="#E8E8EF"/>
          </linearGradient>
          <linearGradient id="k" x1="74.439" y1="184.426" x2="137.17" y2="166.175" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFD685" stop-opacity=".252"/>
            <stop offset="1" stop-color="#FFB829"/>
          </linearGradient>
        </defs>
      </svg>
      <span>这里似乎什么也没有...</span>
    </div>
    <div class="w-full">
      <div class="join flex justify-center">
        <input v-if="total_pages<=10 && total_pages >1" class="join-item btn btn-square" type="radio" name="options"
               :aria-label="item.toString()" v-for="item in total_pages" @click="change_page(item)"/>
        <input v-if="total_pages>10" class="join-item btn btn-square" type="radio" name="options" :aria-label="item.toString()"
               v-for="item in 5" @click="change_page(item)"/>

        <div v-if="total_pages>10" class="dropdown">
          <div tabindex="0">
            <button class="join-item btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
              </svg>
            </button>
          </div>
          <div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit">
            <label class="input input-bordered flex items-center gap-2">
              <input type="number" min="1" :max="total_pages" class="grow w-12" placeholder="Search"
                     v-model="input_page"/>
              <svg @click="change_page(input_page)"
                   class="w-5 h-5 cursor-pointer hover:scale-105 transition duration-300"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
              </svg>

            </label>
          </div>
        </div>
        <button v-if="total_pages>10" class="join-item btn btn-square">
          {{ total_pages }}
        </button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {usePaperStore} from "~/stores/paperStore";
import {useDataStore} from "~/stores/dataStore";
import moment from 'moment';
import 'moment/locale/zh-cn';
import {get_json} from "~/utils/fetch_tools";
import config from "~/public/config.json";
import {useSystemStore} from "#imports";
import {useWindowSize} from "@vueuse/core";
import {useStorage} from "@vueuse/core";

const windowHeight = useWindowSize().height;
moment.locale('zh-cn')
const paperStore = usePaperStore();
const dataStore = useDataStore();
const systemStore = useSystemStore();

const total_papers = ref(0)
const total_pages = ref(1)
const input_page = ref(0)
const view_mode = useStorage('view_mode',"window")

const baseUrl = config.baseUrl;
const page_size = config.page_size;
onMounted(() => {
  get_json(baseUrl + "/api/papers", {}).then(res => {
    total_papers.value = res
    total_pages.value = Math.ceil(total_papers.value / page_size)
  })
})

function goToTop() {
  window.scrollTo({
    top: windowHeight.value - 70,
    behavior: 'smooth',
  });
}

const change_page = (item: number) => {
  if (item > total_pages.value || item < 1) {
    systemStore.setNotification({"msg": "您输入的页码超过了范围", "type": "alert-error"})
    return;
  }
  systemStore.setLoading(true)
  const skip = (item - 1) * page_size;
  get_json(baseUrl + `/api/papers/getpaperslimit?limit=${config.page_size}&skip=${skip}&sort=desc`, {}).then(res => {
    paperStore.setPapers(res)
    systemStore.setLoading(false)
  }).catch(err => {
    systemStore.setLoading(false)
  });
  goToTop();
}

const filter_by_category = (category: string) => {
  systemStore.setNowCategory(category)
  systemStore.setLoading(true)
  get_json(baseUrl + `/api/papers?count_filter={"category":"${category}"}`, {}).then((res: number) => {
    total_papers.value = res
    systemStore.setNotification({"msg": "该分类下共有" + res + "篇文章", "type": "alert-success"})
    get_json(baseUrl + `/api/papers/getpapersbycategory?category=${category}&limit=${config.page_size}`, {}).then(res => {
      paperStore.setPapers(res)
      systemStore.setLoading(false)
    })
  }).catch(err => {
    systemStore.setLoading(false)
  })
}

const get_all_papers = () => {
  systemStore.setLoading(true)
  systemStore.setNowCategory("")
  get_json(baseUrl + "/api/papers/getpaperslimit?limit=" + config.page_size + "&sort=desc", {}).then(res => {
    paperStore.setPapers(res)
    systemStore.setLoading(false)
  }).catch(err => {
    systemStore.setLoading(false)
  })
}
</script>

<style scoped>

</style>