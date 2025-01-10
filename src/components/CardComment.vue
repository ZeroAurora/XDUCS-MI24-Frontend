<script setup lang="ts">
import type { Post } from '@/lib/dto/post'
import { apiKy } from '@/lib/apiKy'
import { Button, Image, showNotify } from 'vant'
import { ref } from 'vue'
import ImageGrid from './ImageGrid.vue'

const { comment, parentId } = defineProps<{
  comment: Post
  parentId: number
}>()

// a wtf workaround here
const pfp = import.meta.env.VITE_API_BASE_URL + comment.profile.profile_picture!.file
const username = comment.profile.user.username
const content = comment.content
const images = comment.media_files.map(file => file.file)
const date = new Date(comment.created_at).toLocaleString()
const isLiked = ref(comment.is_liked)
const likeCount = ref(comment.like_count)

function toggleLike() {
  try {
    if (!isLiked.value) {
      apiKy.post(`posts/${parentId}/comments/${comment.id}/like/`)
      isLiked.value = true
      likeCount.value += 1
    }
    else {
      apiKy.post(`posts/${parentId}/comments/${comment.id}/unlike/`)
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

function navigateToProfile() {
  console.log('navigate to profile')
}
</script>

<template>
  <div class="bg-white">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-center" @click="navigateToProfile">
        <Image round fit="cover" :height="40" :width="40" :src="pfp" alt="User Avatar" />
        <div class="flex-1 ml-3">
          <div class="text-sm font-medium text-gray-900">
            {{ username }}
          </div>
          <div class="text-sm text-gray-500">
            {{ date }}
          </div>
        </div>
        <Button
          plain
          :icon="isLiked ? 'like' : 'like-o'"
          :type="isLiked ? 'primary' : 'default'"
          @click="toggleLike"
        >
          {{ likeCount }}
        </Button>
      </div>

      <!-- Content -->
      <div class="mt-4 text-gray-700">
        {{ content }}
      </div>

      <!-- Media Files -->
      <ImageGrid v-if="images.length" class="mt-4" :images="images" />

      <!-- Actions -->
      <div class="mt-4 flex justify-right" />
    </div>
  </div>
</template>
