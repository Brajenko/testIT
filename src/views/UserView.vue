<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="user">
    <h1>{{ user.first_name + ' ' + user.last_name }}</h1>
    <h2>{{ user.email }}</h2>
  </div>
  <div v-else>Произошла ошибка. Попробуйте перезагрузить страницу.</div>
</template>
<script lang="ts">
import client from '@/helpers/api'
import type { Components } from '@/types/openapi'

export default {
  data() {
    return {
      user: null as null | Components.Schemas.User,
      loading: true,
      error: false
    }
  },
  created() {
    client
      .users_retrieve(this.$route.params.id as string)
      .then((response) => {
        // @ts-ignore no errors -> response not null
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
