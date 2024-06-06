<template>
  <div v-if="error">Произошла ошибка. Попробуйте перезагрузить страницу.</div>
  <div v-else-if="loading">Загрузка...</div>
  <div v-else>
    <h2>Созданные Вами тесты:</h2>
    <div v-for="test in tests" :key="test.id">
      <li>
        <router-link :to="{ name: 'test', params: { id: test.id } }">{{ test.name }}</router-link>
        &nbsp;&nbsp;
      </li>
    </div>
    <button class="default-button" @click="$router.push({ name: 'create test' })">
      Создать новый тест
    </button>
  </div>
</template>
<script lang="ts">
import type { Components } from '@/types/openapi'
import client from '@/helpers/api'

export default {
  data() {
    return {
      error: false,
      loading: true,
      tests: [] as Components.Schemas.Test[]
    }
  },
  created() {
    client.tests_list(null, null).then(
      (response) => {
        this.tests = response.data
        this.loading = false
      },
      (error) => {
        console.log(error)
        this.error = true
      }
    )
  }
}
</script>
<style scoped>
button {
  margin-top: 40px;
}
</style>
