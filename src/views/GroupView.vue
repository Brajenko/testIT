<template>
  <div>
    <h1>Группа {{ group.name }}</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">Произошла ошибка. Попробуйте перезагрузить страницу.</div>
    <div v-else>
      <h2>Участники:</h2>
      <div v-for="member in group.members" :key="member.id">
        <li>
          <router-link :to="{ name: 'user', params: {id: member.id} }">{{
            member.first_name + ' ' + member.last_name
          }}</router-link>
          &nbsp;&nbsp;
          <button @click="removeUserFromGroup(member.id)">Удалить из группы</button>
        </li>
        &nbsp;
      </div>
      <div class="add-member">
        <b>Добавить: </b>
        <input type="text" list="users" v-model="userToAdd" />
        <datalist id="users">
          <option v-for="user in users.filter(user => !group.members.some(u => u.id == user.id))" :key="user.id" :value="user.email">
            {{ user.first_name + ' ' + user.last_name }}
          </option>
        </datalist>
        &nbsp;
        <button @click="addUserToGroup" class="small-button">Добавить участника</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { Components } from '@/types/openapi'
import client from '@/helpers/api'

export default {
  data() {
    return {
      loading: true,
      error: false,
      group: {} as Components.Schemas.Group,
      users: [] as Components.Schemas.User[],
      userToAdd: '' as Components.Schemas.User['email']
    }
  },
  created() {
    client.groups_retrieve(Number(this.$route.params.id), null).then(
      (response) => {
        this.group = response.data
        this.loading = false
      },
      (error) => {
        console.log(error)
        this.error = true
      }
    )
    client.users_list().then(
      (response) => {
        this.users = response.data
      },
      () => {}
    )
  },
  methods: {
    removeUserFromGroup(id: number) {
      client.groups_remove_user_create(Number(this.$route.params.id), { user: id }).then(
        (response) => {
          this.group = response.data
        },
        () => {}
      )
    },
    addUserToGroup() {
      const user = this.users.find((user) => user.email === this.userToAdd)
      const userId = user ? user.id : null
      if (!userId) {
        alert('Пользователь не может быть добавлен')
        return
      }
      client.groups_add_user_create(Number(this.$route.params.id), { user: userId }).then(
        (response) => {
          this.group = response.data
        },
        () => {}
      )
      this.userToAdd = ''
    }
  }
}
</script>
<style scoped>
.add-member {
  margin-top: 20px;
}
</style>
