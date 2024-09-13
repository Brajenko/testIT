<template>
  <div>
    <div v-if="!user">
      <p>Current user: Guest</p>
      <button @click="$router.push({ name: 'login' })" class="default-button">Войти</button>
    </div>
    <div v-else>
      <h1>{{ user.organization.name }}</h1>
      <h2>{{ user.first_name + ' ' + user.last_name }}</h2>
      <h2>{{ user.email }}</h2>
      <div v-if="user.is_teacher">
        <p>Ваша роль: <b>преподаватель</b></p>
        <p>
          <router-link :to="{ name: 'create test' }">Создать тест</router-link>
        </p>
        <p>
          <router-link :to="{ name: 'tests' }">Посмотреть созданные тесты</router-link>
        </p>
        <p>
          <router-link :to="{ name: 'groups' }">Посмотреть группы</router-link>
        </p>
      </div>
      <div v-else>
        <p>Ваша роль: <b>студент</b></p>
        <p>Если вы хотите пройти тест перейдите по ссылке, которую вам дал преподаватель</p>
      </div>
      <button @click="$router.push({ name: 'logout' })" class="default-button">
        Выйти из аккаунта
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import type { Components } from '@/types/openapi'
import client from '@/helpers/api'

export default {
  data() {
    return {
      user: null as unknown as Components.Schemas.User
    }
  },
  created() {
    client.users_me_retrieve().then(
      (response) => {
        this.user = response.data
      },
      (error) => {
        console.log(error)
      }
    )
  },
  methods: {}
}
</script>
<style scoped></style>
