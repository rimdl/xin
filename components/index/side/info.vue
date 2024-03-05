<script setup lang="ts">
import {ref} from 'vue';

</script>

<template>
  <div class="card w-full bg-base-100 shadow-xl image-full group">
    <figure><img src="https://cdn.pixabay.com/photo/2016/04/18/22/05/seashells-1337565_960_720.jpg" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">XinSi</h2>
      <div class="info relative w-full flex flex-col justify-center overflow-y-scroll">
        <div class="w-full flex justify-center absolute origin-center scale-0 group-hover:scale-100 group-hover:translate-y-0 translate-y-10 transition duration-500">
          林尽水源，便得一山，山有小口，仿佛若有光。便舍船，从口入。初极狭，才通人。复行数十步，豁然开朗。土地平旷，屋舍俨然，有良田、美池、桑竹之属。阡陌交通，鸡犬相闻。其中往来种作，男女衣着，悉如外人。
        </div>
        <div class="w-full flex justify-center absolute origin-center group-hover:scale-0 group-hover:translate-y-10 transition duration-500">
          <div class="avatar">
            <div class="w-28 mask mask-squircle">
              <img src="https://raw.gitmirror.com/xinsi-tecool/mypic/main/21aee897-ee97-47cb-92cb-1f6ac6f3d05c.jpeg" />
            </div>
          </div>
        </div>
      </div>
      <div class="card-actions justify-between items-center">
        <button class="btn btn-circle btn-ghost hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </button>
        <button class="btn btn-circle btn-ghost hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </button>
        <button class="btn btn-circle btn-ghost hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info{
  height: 200px;
}
</style>