<script setup lang="ts">
import { ConfigProvider } from 'vant'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppTab from './components/AppTab.vue'
import router from './router'

onMounted(() => {
  if (localStorage.getItem('token') === null) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <ConfigProvider>
    <div class="bg-gray-100 min-h-screen w-screen">
      <RouterView />
      <AppTab />
    </div>
  </ConfigProvider>
</template>
