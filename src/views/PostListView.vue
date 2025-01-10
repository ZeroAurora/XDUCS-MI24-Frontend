<script setup lang="ts">
import type { Paginated } from '@/lib/dto'
import type { Post } from '@/lib/dto/post'
import CardPost from '@/components/CardPost.vue'
import PostCreatePanel from '@/components/PostCreatePanel.vue'
import { apiKy } from '@/lib/apiKy'
import { useTitle } from '@vueuse/core'
import { List, NavBar, PullRefresh } from 'vant'
import { ref } from 'vue'

useTitle('帖子列表')

const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)
const showCreate = ref(false)

const page = ref(1)

const posts = ref<Post[]>([])

async function onLoad() {
  const request = await apiKy.get(
    `posts/?page=${page.value}`,
    { throwHttpErrors: false },
  )

  if (request.status === 404) {
    finished.value = true
  }
  else {
    const data: Paginated<Post> = await request.json()
    posts.value.push(...data.results)
    page.value += 1
  }

  loading.value = false
}

async function onRefresh() {
  finished.value = false
  page.value = 1
  posts.value = []
  await onLoad()
  refreshing.value = false
}
</script>

<template>
  <NavBar fixed placeholder title="帖子列表" right-text="发布" @click-right="showCreate = true" />
  <div class="overflow-hidden">
    <PullRefresh v-model="refreshing" @refresh="onRefresh">
      <List v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <CardPost v-for="post in posts" :key="post.id" :post class="my-2" />
      </List>
    </PullRefresh>
  </div>

  <PostCreatePanel v-model:show="showCreate" />
</template>
