<template>
  <div class="flex flex-wrap">
    <div class="max-sm:w-full sm:w-1/6 bg-amber-400 xin-h-full max-sm:h-fit" style="">
      <AdminMenu/>
    </div>
    <div class="max-sm:w-full sm:w-5/6 sm:px-4">
      <Transition name="page" mode="out-in">
        <div class="w-full" v-if="adminStore.nowPage == 'write'">
          <AdminWrite/>
        </div>
        <div class="w-full" v-else-if="adminStore.nowPage == 'drafts'">
          <AdminDrafts />
        </div>
        <div class="w-full" v-else-if="adminStore.nowPage == 'papers'">
          <AdminPapers />
        </div>
        <div class="w-full" v-else-if="adminStore.nowPage == 'comments'">
          <AdminComments />
        </div>
        <div class="w-full" v-else>
          <AdminHome />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'bytemd/dist/index.css'
import {onMounted, ref} from "vue";
import {useSystemStore} from "~/stores/systemStore";
import {useAdminStore} from "~/stores/adminStore";

definePageMeta({
  middleware: 'auth'
})

const adminStore = useAdminStore();
const systemStore = useSystemStore();

onMounted(()=>{
  adminStore.setNowPage("home")
})

</script>

<style scoped>
.xin-h-full{
  @media (min-width: 640px) {
    height: calc(100vh - 4rem);
  }
}

</style>