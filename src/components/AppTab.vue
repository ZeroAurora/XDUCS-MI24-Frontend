<script setup lang="ts">
import router from '@/router'
import { Tabbar, TabbarItem } from 'vant'
import { ref, watch } from 'vue'

const pages = [
  'post_list',
  'notification',
  'profile',
]

const isDisplay = ref(false)
const active = ref<typeof pages[number]>('post_list')

watch(router.currentRoute, (newRoute) => {
  if (pages.includes(newRoute.name as string)) {
    isDisplay.value = true
    active.value = newRoute.name as string
  }
  else {
    isDisplay.value = false
  }
}, { immediate: true })

watch(active, (newActive) => {
  router.push({ name: newActive })
})
</script>

<template>
  <Tabbar v-show="isDisplay" v-model="active">
    <TabbarItem name="post_list" icon="list-switching">
      帖子
    </TabbarItem>
    <TabbarItem name="notification" icon="envelop-o">
      通知
    </TabbarItem>
    <TabbarItem name="profile" icon="user-o">
      个人中心
    </TabbarItem>
  </Tabbar>
</template>
