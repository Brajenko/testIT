<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="error">Произошла ошибка. Попробуйте перезагрузить страницу.</div>
  <div v-else-if="test !== null">
    <h1>{{ test.name }}</h1>
    <h3>Вопросы теста:</h3>
    <div class="questions-list">
      <div v-for="question in test.questions" :key="question.id">
        <div class="question__questions-list">
          <p>
            {{
              htmlToText(question.text).slice(0, 60) +
              (htmlToText(question.text).length > 60 ? '...' : '')
            }}
          </p>
          <button
            class="btn__question small-button"
            @click.prevent="question.shown = !question.shown"
          >
            {{ question.shown ? 'Скрыть' : 'Показать' }}
          </button>
        </div>
        <QuestionItem v-if="question.shown" :question="question"></QuestionItem>
      </div>
    </div>
    <div>
      <b>Ссылка для прохождения теста: </b>
      <router-link
        :to="{ name: 'test pass', params: { uuid: test.public_uuid } }"
        v-slot="{ href, route }"
      >
        <a :href="href">{{ host + route.fullPath }}</a>
      </router-link>
    </div>
    <h3>Прохождение разрешено для:</h3>
    <div class="groups-list">
      <div class="groups-list__item" v-for="group in test.available_for" :key="group.id">
        <router-link :to="{ name: 'group', params: { id: group.id } }">{{
          group.name
        }}</router-link>
        &nbsp;<button @click="removeGroup(group.id)">Удалить разрешение</button>
      </div>
    </div>
    <div class="add-group">
      Добавить:
      <input type="text" list="groups" v-model="groupToAdd" />
      <datalist id="groups">
        <option
          v-for="group in groups.filter(
            (group) => !test?.available_for.some((g) => g.id == group.id)
          )"
          :key="group.id"
          :value="group.name"
        >
          {{ group.name }}
        </option>
      </datalist>
      &nbsp;
      <button @click="addGroup" class="small-button">Добавить группу</button>
    </div>
    <h3>Прохождения теста:</h3>
    <a :href="`/api/tests/${$route.params.id}/completions/export/`" :download="`${test.name}.xlsx`"
      >Экспорт в xlsx</a
    >
    <div v-for="completion in completions" :key="completion.id">
      <li>
        Пользователь:
        <b>
          <router-link :to="{ name: 'user', params: { id: completion.user.id } }">
            {{ completion.user.first_name + ' ' + completion.user.last_name }}
          </router-link>
        </b>
        . Набрано баллов: <b>{{ completion.score }}</b>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <router-link :to="{ name: 'completion', params: { id: completion.id } }">
          Посмотреть ответы
        </router-link>
      </li>
    </div>
    <br />
    <br />
  </div>
</template>
<script lang="ts">
import type { Components } from '@/types/openapi'
import QuestionItem from '@/components/QuestionItem.vue'
import client from '@/helpers/api'

interface QuestionWithShown extends Components.Schemas.Question {
  shown: boolean
}

interface TestWithShownQuestions extends Components.Schemas.TestCreation {
  questions: QuestionWithShown[]
}

export default {
  components: {
    QuestionItem
  },
  data() {
    return {
      test: null as TestWithShownQuestions | null,
      completions: [] as Components.Schemas.Completion[],
      loading: true,
      error: false,
      host: location.host,
      groupToAdd: '',
      groups: [] as Components.Schemas.GroupWithoutMembers[]
    }
  },
  created() {
    client
      .tests_retrieve(Number(this.$route.params.id))
      .then((response) => {
        // @ts-expect-error
        this.test = response.data
        this.loading = false
        // @ts-expect-error
        this.test.questions.forEach((q) => {
          q.shown = false
        })
      })
      .catch(() => {
        this.error = true
        this.loading = false
      })
    client
      .tests_completions_list(Number(this.$route.params.id))
      .then((response) => {
        this.completions = response.data
      })
      .catch(() => {
        this.error = true
        this.loading = false
      })
    client.groups_list().then(
      (response) => {
        this.groups = response.data
      },
      () => {}
    )
  },
  methods: {
    addGroup() {
      const group = this.groups.find((g) => g.name === this.groupToAdd)
      if (group) {
        client
          .tests_allow_for_group_create(Number(this.$route.params.id), { group: group.id })
          .then((response) => {
            // @ts-expect-error test cannot be null
            this.test.available_for = response.data.available_for
            this.groupToAdd = ''
          })
          .catch(() => {
            alert('Ошибка при добавлении группы')
          })
      } else {
        alert('Группа не найдена')
      }
    },
    removeGroup(groupId: number) {
      client
        .tests_disallow_for_group_create(Number(this.$route.params.id), { group: groupId })
        .then((response) => {
          // @ts-expect-error test cannot be null
          this.test.available_for = response.data.available_for
        })
        .catch(() => {
          alert('Ошибка при удалении группы')
        })
    },
    htmlToText(html: string) {
      html = html.replace(/<style([\s\S]*?)<\/style>/gi, '')
      html = html.replace(/<script([\s\S]*?)<\/script>/gi, '')
      html = html.replace(/<\/div>/gi, '\n')
      html = html.replace(/<\/li>/gi, '\n')
      html = html.replace(/<li>/gi, '  *  ')
      html = html.replace(/<\/ul>/gi, '\n')
      html = html.replace(/<\/p>/gi, '\n')
      html = html.replace(/<br\s*[/]?>/gi, '\n')
      html = html.replace(/<[^>]+>/gi, '')
      return html
    }
  }
}
</script>
<style scoped>
.questions-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.question__questions-list {
  display: flex;

  gap: 10px;
}

.groups-list {
  margin-bottom: 20px;
}

.btn__question {
  width: 100px;
  align-self: center;
  justify-self: center;
}
</style>
