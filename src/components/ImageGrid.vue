<script setup lang="ts">
import { Grid, GridItem, Image, showImagePreview } from 'vant'

const { images } = defineProps<{
  images: string[]
}>()
</script>

<template>
  <Grid v-if="images.length" :border="false" :column-num="3">
    <GridItem v-for="image, index in images" :key="index">
      <Image fit="cover" :width="100" :height="100" :src="image" @click="showImagePreview(images, index)" />
    </GridItem>
  </Grid>
</template>
