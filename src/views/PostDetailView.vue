<script setup lang="ts">
import type { Paginated } from '@/lib/dto'
import type { Post } from '@/lib/dto/post'
import CardComment from '@/components/CardComment.vue'
import CardPost from '@/components/CardPost.vue'
import { apiKy } from '@/lib/apiKy'
import router from '@/router'
import { useTitle } from '@vueuse/core'
import { Divider, Empty, List, NavBar, Skeleton } from 'vant'
import { ref, watch } from 'vue'

useTitle('帖子详情')

const post = ref<Post | null>(null)
const commentsPage = ref(1)
const commentsLoading = ref(false)
const commentsFinished = ref(false)
const comments = ref<Post[]>([])

watch(router.currentRoute, async (newRoute) => {
  try {
    const data = await apiKy.get<Post>(`posts/${newRoute.params.id}`).json()
    post.value = data
  }
  catch (error) {
    console.error(error)
  }
}, { immediate: true })

async function onCommentLoad() {
  const request = await apiKy.get(
    `posts/${post.value!.id}/comments/?page=${commentsPage.value}`,
    { throwHttpErrors: false },
  )

  if (request.status === 404) {
    commentsFinished.value = true
  }
  else {
    const data: Paginated<Post> = await request.json()
    comments.value.push(...data.results)
    commentsPage.value += 1
  }

  commentsLoading.value = false
}
</script>

<template>
  <NavBar title="帖子详情" left-text="返回" left-arrow fixed placeholder @click-left="router.back" />

  <Skeleton title :row="3" :loading="post === null">
    <CardPost :post="post!" />
    <Divider content-position="left">
      评论
    </Divider>
    <Empty v-if="post!.comment_count === 0" description="没有评论，来抢沙发！" />
    <List v-else v-model:loading="commentsLoading" :finished="commentsFinished" finished-text="没有更多了" @load="onCommentLoad">
      <CardComment v-for="comment in comments" :key="comment.id" :comment :parent-id="post!.id" />
    </List>
  </Skeleton>

</template>
