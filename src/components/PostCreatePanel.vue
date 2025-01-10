<script setup lang="ts">
import type { MediaFile } from '@/lib/dto/file'
import type { Post, PostCreationRequest } from '@/lib/dto/post'
import ImageGrid from '@/components/ImageGrid.vue'
import { apiKy } from '@/lib/apiKy'
import router from '@/router'
import { useFileDialog } from '@vueuse/core'
import { Button, Field, FloatingPanel } from 'vant'
import { computed, ref } from 'vue'

const { parent } = defineProps<{
  parent?: number
}>()

const show = defineModel<boolean>('show')

const postContent = ref('')

const { files, open: openFileDialog } = useFileDialog({
  multiple: true,
  accept: 'image/*', // Set to accept only image files
})

const images = computed(() => {
  if (!files.value)
    return []
  else
    return Array.from(files.value).map(file => URL.createObjectURL(file))
})

async function submitPost() {
  if (!postContent.value)
    return

  const remoteImages = []
  for (const file of files.value ?? []) {
    const response = await apiKy.post(`files/`, {
      body: await file.arrayBuffer(),
      headers: {
        'Content-Type': file.type,
        'Content-Disposition': `attachment; filename="${file.name}"`,
      },
    }).json<MediaFile>()
    remoteImages.push(response.id)
  }

  const newPost: PostCreationRequest = {
    content: postContent.value,
    media_files: remoteImages,
    parent: parent ?? null,
  }

  const response = await apiKy.post('posts/', {
    json: newPost,
  }).json<Post>()

  show.value = false

  router.push({ name: 'post_detail', params: { id: parent ?? response.id } })
}
</script>

<template>
  <FloatingPanel v-if="show" :height="500" class="bg-gray-100">
    <div class="p-4">
      <Field
        v-model="postContent"
        type="textarea"
        rows="3"
        placeholder="在想啥呢？"
        class="mb-4 border-1 border-solid border-rounded border-gray"
      />

      <ImageGrid v-if="files" class="mb-4" :images />

      <Button plain type="primary" class="mb-4" @click="openFileDialog">
        {{ files ? '更改图片' : '选择图片' }}
      </Button>

      <Button type="primary" :disabled="!postContent" class="w-full" @click="submitPost">
        发布
      </Button>
      <Button type="default" class="w-full mt-2" @click="show = false">
        取消
      </Button>
    </div>
  </FloatingPanel>
</template>
