<template>
  <div>
    <h1>Группы</h1>
    <div class="groups-list">
      <div class="groups-list__item" v-for="group in groups" :key="group.id">
        <router-link class="item__name" :to="{ name: 'group', params: { id: group.id } }">{{
          group.name
        }}</router-link
        >:
        <span v-for="member in group.members" :key="member.id">
          <router-link :to="{ name: 'user', params: { id: member.id } }">
            {{ member.first_name + ' ' + member.last_name }} </router-link
          >, &nbsp;
        </span>
      </div>
    </div>
    <div>
      <b>Создать новую группу: </b>
      <input type="text" v-model="newGroup.name" placeholder="Название группы" />
      <input type="text" v-model="newGroup.description" placeholder="Описание группы" />
      &nbsp;
      <button @click="addGroup">Создать</button>
    </div>
  </div>
</template>
<script lang="ts">
import type { Components } from '@/types/openapi'
import client from '@/helpers/api'

export default {
  data() {
    return {
      groups: [] as Components.Schemas.Group[],
      newGroup: {
        name: '',
        description: ''
      }
    }
  },
  created() {
    client.groups_list().then(
      (response) => {
        this.groups = response.data
      },
      () => {}
    )
  },
  methods: {
    addGroup() {
      // @ts-expect-error id readonly
      client.groups_create(null, this.newGroup).then(
        (response) => {
          this.groups.push(response.data)
          this.newGroup = {
            name: '',
            description: ''
          }
        },
        () => {}
      )
    }
  }
}
</script>
<style scoped>
.groups-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.item__name {
  font-size: 30px;
  font-weight: bold;
}
</style>
