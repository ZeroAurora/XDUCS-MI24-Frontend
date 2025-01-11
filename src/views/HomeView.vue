<script setup lang="ts">
import router from '@/router'
import { useTitle } from '@vueuse/core'
import { Button } from 'vant'
import { onBeforeMount } from 'vue'

useTitle('首页')

onBeforeMount(() => {
  if (localStorage.getItem('token') !== null) {
    router.push({ name: 'post_list' })
  }
})
</script>

<template>
  <div class="flex flex-col h-screen bg-[url('/bg.jpg')] bg-cover">
    <div class="flex-1 flex flex-col justify-center p-4">
      <h1 class="text-2xl text-white font-bold text-center">
        奶茶街
      </h1>
      <h2 class="text-lg text-white font-bold text-center">
        西电人的交流社区（迫真
      </h2>
    </div>

    <div class="flex gap-2 p-4">
      <Button class="flex-1" type="primary" @click="router.push({ name: 'login' })">
        登录
      </Button>
      <Button class="flex-1" type="default" @click="router.push({ name: 'register' })">
        注册
      </Button>
    </div>
  </div>
</template>
