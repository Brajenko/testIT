<template>
  <main>
    <QuestionsList
      @test-passed="sendAnswers"
      :questions="test.questions"
      v-if="!passed"
    ></QuestionsList>
    <div v-else>
      <h1>Отправленные ответы:</h1>
      <!-- @vue-expect-error wont be null -->
      <AnswersList :test="test" :completion="completion"></AnswersList>
    </div>
  </main>
</template>

<script lang="ts">
import AnswersList from '@/components/AnswersList.vue'
import QuestionsList from '@/components/QuestionsList.vue'
import client from '@/helpers/api'
import type { Components } from '@/types/openapi'

export default {
  components: {
    QuestionsList,
    AnswersList
  },
  data() {
    return {
      passed: false,
      completion: null as Components.Schemas.CompletionCreation | null,
      test: { questions: [] } as Components.Schemas.Test | { questions: Array<any> }
    }
  },
  mounted() {
    client.tests_p_retrieve(this.$route.params.uuid as string).then(
      (response) => {
        this.test = response.data
      },
      (error) => {
        console.log(error)
      }
    )
  },
  methods: {
    sendAnswers(answers: Components.Schemas.AnswerCreation[]) {
      // @ts-expect-error id is readonly
      client.completions_create(null, { test: this.$route.params.uuid, answers: answers }).then(
        (response) => {
          this.passed = true
          this.completion = response.data
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
}
</script>
