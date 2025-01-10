<script setup lang="ts">
import type { LoginResponse } from '@/lib/dto/auth'
import { apiKy } from '@/lib/apiKy'
import router from '@/router'
import { useTitle } from '@vueuse/core'
import { Button, CellGroup, Field, NavBar, showNotify } from 'vant'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

useTitle('登录')

const username = ref('')
const password = ref('')

async function onLoginClick() {
  const response = await apiKy.post('auth/token/login/', {
    json: {
      username: username.value,
      password: password.value,
    },
    throwHttpErrors: false,
  })

  if (response.status === 200) {
    showNotify({
      type: 'success',
      message: '登录成功',
    })
    const resObj: LoginResponse = await response.json()
    localStorage.setItem('token', resObj.auth_token)
    setTimeout(() => {
      router.push({ name: 'post_list' })
    }, 1000)
  }
  else {
    showNotify({
      type: 'danger',
      message: '登录失败',
    })
  }
}
</script>

<template>
  <NavBar title="登录" left-text="返回" left-arrow fixed placeholder @click-left="router.back" />
  <CellGroup inset class="my-4">
    <Field v-model="username" label="用户名" placeholder="请输入用户名" />
    <Field v-model="password" type="password" label="密码" placeholder="请输入密码" />
  </CellGroup>
  <div class="m-4">
    <Button type="primary" block @click="onLoginClick">
      登录
    </Button>
    <RouterLink to="register">
      <Button type="default" block class="mt-2">
        注册
      </Button>
    </RouterLink>
  </div>
</template>
