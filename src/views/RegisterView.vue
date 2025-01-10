<script setup lang="ts">
import type { LoginResponse } from '@/lib/dto/auth'
import { apiKy } from '@/lib/apiKy'
import router from '@/router'
import { useTitle } from '@vueuse/core'
import { Button, CellGroup, Field, NavBar, showNotify } from 'vant'
import { ref } from 'vue'

useTitle('注册')

const username = ref('')
const password = ref('')

async function onRegisterClick() {
  const response = await apiKy.post('auth/users/', {
    json: {
      username: username.value,
      password: password.value,
    },
    throwHttpErrors: false,
  })

  if (response.status === 201) {
    showNotify({
      type: 'success',
      message: '注册成功，请登录',
    })
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 1000)
  }
  else {
    showNotify({
      type: 'danger',
      message: '注册失败',
    })
  }
}
</script>

<template>
  <NavBar title="注册" left-text="返回" left-arrow fixed placeholder @click-left="router.back" />
  <CellGroup inset class="my-4">
    <Field v-model="username" label="用户名" placeholder="请输入用户名" />
    <Field v-model="password" type="password" label="密码" placeholder="请输入密码" />
  </CellGroup>
  <div class="m-4">
    <Button type="primary" block @click="onRegisterClick">
      注册
    </Button>
  </div>
</template>
