<template>
<div>
  <div class="flex justify-between p-16 space-x-2">
    <div class="flex flex-col items-center space-y-2">
      <input type="text" v-model="paper.title" placeholder="title" class="input">
      <input type="text" v-model="paper.author" placeholder="author" class="input">
      <input type="text" v-model="paper.desc" placeholder="desc" class="input">
      <input type="text" v-model="paper.date" placeholder="date" class="input">
      <input type="text" v-model="paper.cover" placeholder="cover" class="input">
      <input type="text" v-model="tags" placeholder="tags" class="input">
      <input type="text" v-model="paper.category" placeholder="categories" class="input">
      <input type="text" v-model="paper.words" placeholder="words" class="input">
    </div>

    <div class="w-full">
      <textarea class="textarea w-full h-full textarea-info" placeholder="输入" v-model="paper.content"></textarea>
    </div>
  </div>
  <div class="flex justify-center mb-4">
    <button class="btn btn-primary" @click="publish">{{ btnText }}</button>
  </div>
</div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import config from '../public/config.json';
import {publishPaper} from '../utils/publishPaper'

const baseUrl = config.baseUrl;

const tags = ref('')

const paper = ref({
  title: '',
  author: '',
  desc: '',
  date: '',
  content: '',
  cover: '',
  tags: [],
  category: '',
  words: 0
});
const btnText = ref('发布')

onMounted(() => {
  let date =new Date();
  paper.value.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
})
const publish = () => {
  let tagsList = tags.value.split(',');
  // @ts-ignore
  paper.value.tags = tags.value.split(',');
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paper.value)
  }
  publishPaper(baseUrl+'/api/papers/addpaper',options).then(res => {
    console.log(res)
      btnText.value = "发布成功"

  })
};

watch(()=> paper.value.content,()=>{
  let strs = paper.value.content.split("")
  paper.value.words = strs.length
})

</script>

<style scoped>

</style>