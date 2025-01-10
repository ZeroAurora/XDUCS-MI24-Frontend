<script setup lang="ts">
import type { Paginated } from '@/lib/dto'
import type { Notification } from '@/lib/dto/notification'
import PostCreatePanel from '@/components/PostCreatePanel.vue'
import { apiKy } from '@/lib/apiKy'
import { useTitle } from '@vueuse/core'
import { Cell, List, NavBar, PullRefresh } from 'vant'
import { ref } from 'vue'

useTitle('帖子列表')

const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)
const showCreate = ref(false)

const page = ref(1)

const notifications = ref<Notification[]>([])

async function onLoad() {
  const request = await apiKy.get(
    `notifications/?page=${page.value}`,
    { throwHttpErrors: false },
  )

  if (request.status === 404) {
    finished.value = true
  }
  else {
    const data: Paginated<Notification> = await request.json()
    notifications.value.push(...data.results)
    page.value += 1
  }

  loading.value = false
}

async function onRefresh() {
  finished.value = false
  page.value = 1
  notifications.value = []
  await onLoad()
  refreshing.value = false
}

function formatNotification(item: Notification) {
  if (item.notification_type === 'like') {
    return `有人点赞了你的帖子`
  }
  else if (item.notification_type === 'comment') {
    return `有人评论了你的帖子`
  }
}

async function markAsRead() {
  await apiKy.post('notifications/mark_all_as_read/')
}
</script>

<template>
  <NavBar fixed placeholder title="通知" right-text="已读" @click-right="markAsRead" />
  <div class="">
    <PullRefresh v-model="refreshing" @refresh="onRefresh">
      <List v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <Cell v-for="item in notifications" :key="item.id" :title="formatNotification(item)" class="my-2" />
      </List>
    </PullRefresh>
  </div>

  <PostCreatePanel v-model:show="showCreate" />
</template>
