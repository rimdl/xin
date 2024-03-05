

<template>
  <div class=" stats bg-primary bg-opacity-60 stats-vertical text-primary-content">

    <div class="stat place-items-center">
      <div class="w-full chat chat-start">
        <div class="chat-bubble">文章总数</div>
      </div>
      <div class="stat-value">{{ dataStore.totalPapers }}</div>
    </div>
    <div class="stat place-items-center">
      <div class="w-full chat chat-start">
        <div class="chat-bubble">总字数</div>
      </div>
      <div class="stat-value">{{ dataStore.totalText }}</div>
    </div>
    <div class="stat place-items-center">
      <div class="w-full chat chat-start">
        <div class="chat-bubble">建站天数</div>
      </div>
      <div class="stat-value">{{ dataStore.buildDays }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useDataStore} from "~/stores/dataStore";

const dataStore = useDataStore();
</script>

<style scoped>

</style>