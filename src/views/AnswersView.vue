<template>
  <div>
    <h1>
      Тест <RouterLink :to="{ name: 'test', params: { id: test.id } }">{{ test.name }}</RouterLink>
    </h1>
    <h1>
      Прохождение пользователя
      <router-link :to="{ name: 'user', params: { id: completion.user.id } }">
        {{ completion.user.first_name + ' ' + completion.user.last_name }}
      </router-link>
    </h1>
    <h1>Набрано баллов: {{ completion.score }}</h1>
    <AnswersList :test="test" :completion="completion"></AnswersList>
  </div>
</template>

<script lang="ts">
import type { Components } from '@/types/openapi'
import AnswersList from '@/components/AnswersList.vue'
import client from '@/helpers/api'

export default {
  components: {
    AnswersList
  },
  data() {
    return {
      completion: { score: 0, user: { id: 0 } } as unknown as Components.Schemas.Completion,
      test: {} as unknown as Components.Schemas.Test
    }
  },
  created() {
    // TODO: get completions depends on user type
    client.completions_with_correctness_retrieve(Number(this.$route.params.id)).then(
      (response) => {
        this.completion = response.data
        client.tests_retrieve(this.completion.test).then(
          (response) => {
            this.test = response.data
          },
          (error) => {
            console.log(error)
          }
        )
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
</script>
