<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="error">Произошла ошибка. Попробуйте перезагрузить страницу.</div>
  <div v-else>
    <h1>{{ user.first_name + ' ' + user.last_name }}</h1>
    <h2>{{ user.email }}</h2>
  </div>
</template>
<script lang="ts">
import client from '@/helpers/api'

export default {
  data() {
    return {
      user: null,
      loading: true,
      error: false
    }
  },
  created() {
    client
      .users_retrieve(this.$route.params.id)
      .then((response) => {
        this.user = response.data
        this.loading = false
      })
      .catch(() => {
        this.error = true
        this.loading = false
      })
  }
}
</script>
<style></style>
