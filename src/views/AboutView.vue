<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{data}}</div>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{error}}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 定义响应式数据
const data = ref(null);
const loading = ref(false);
type ErrorMessage = {
  value: string;
};
const error: ErrorMessage = {value:""};
// 动态设置 API 地址
const apiUrl = import.meta.env.VITE_API_URL;
// const apiHost = process.env.NODE_ENV === 'development' ? 'http://localhost:8088' : '';

// 生命周期钩子：组件挂载时调用
onMounted(async () => {
  try {
    loading.value = true;
    // 发送 GET 请求（替换为你的接口地址）
    const response = await axios.get(apiUrl+'/kvdb');
    alert(response.data);
    data.value = response.data.visitCount;
  } catch (err) {
    if (err instanceof Error) {
      error.value = '请求失败: ' + err.message;
    } else {
      error.value = '请求失败: 未知错误';
    }
  } finally {
    loading.value = false;
  }
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
