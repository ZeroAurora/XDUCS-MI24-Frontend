<script setup lang="ts">
import type { Post } from '@/lib/dto/post'
import { apiKy } from '@/lib/apiKy'
import router from '@/router'
import { Button, Image, showNotify } from 'vant'
import { ref } from 'vue'
import ImageGrid from './ImageGrid.vue'
import PostCreatePanel from './PostCreatePanel.vue'

const { post } = defineProps<{
  post: Post
}>()

const showComment = ref(false)

// a wtf workaround here
const pfp = import.meta.env.VITE_API_BASE_URL + post.profile.profile_picture!.file
const username = post.profile.user.username
const content = post.content
const images = post.media_files.map(file => file.file)
const date = new Date(post.created_at).toLocaleString()
const isLiked = ref(post.is_liked)
const likeCount = ref(post.like_count)
const commentCount = ref(post.comment_count)

function toggleLike() {
  try {
    if (!isLiked.value) {
      apiKy.post(`posts/${post.id}/like/`)
      isLiked.value = true
      likeCount.value += 1
    }
    else {
      apiKy.post(`posts/${post.id}/unlike/`)
      isLiked.value = false
      likeCount.value -= 1
    }
  }
  catch (error) {
    console.error(error)
    showNotify({
      type: 'danger',
      message: '操作失败',
    })
  }
}

function onContentClick() {
  if (router.currentRoute.value.name !== 'post_detail') {
    navigateToPostDetail()
  }
}

function navigateToPostDetail() {
  router.push({ name: 'post_detail', params: { id: post.id } })
}

function navigateToProfile() {
  console.log('navigate to profile')
}
</script>

<template>
  <div class="bg-white overflow-hidden">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-center" @click="navigateToProfile">
        <Image round fit="cover" :height="40" :width="40" :src="pfp" alt="User Avatar" />
        <div class="ml-3">
          <div class="text-sm font-medium text-gray-900">
            {{ username }}
          </div>
          <div class="text-sm text-gray-500">
            {{ date }}
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="mt-4 text-gray-700" @click="onContentClick">
        {{ content }}
      </div>

      <!-- Media Files -->
      <ImageGrid v-if="images.length" class="mt-4" :images="images" />

      <!-- Actions -->
      <div class="mt-4 flex justify-between">
        <Button plain icon="comment-o" type="default" @click="showComment = true">
          {{ commentCount }}
        </Button>
        <Button
          plain
          :icon="isLiked ? 'like' : 'like-o'"
          :type="isLiked ? 'primary' : 'default'"
          @click="toggleLike"
        >
          {{ likeCount }}
        </Button>
      </div>
    </div>
    <PostCreatePanel v-model:show="showComment" :parent="post.id" />
  </div>
</template>
