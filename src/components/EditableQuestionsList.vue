<template>
  <form action="">
    <input type="text" v-model="testName" placeholder="Название теста..." />
    <div class="questions">
      <div v-for="question in questions" :key="question.number_in_test" class="question">
        <div class="question__first-row">
          <div class="quill-input">
            <QuillComponent
              v-model="question.text"
              placeholder="Введите текст вопроса..."
            ></QuillComponent>
          </div>
          <div class="col__first-row">
            <div class="points-input__col">
              <input type="number" v-model="question.points" min="0" /> б.
            </div>
            <font-awesome-icon
              class="first-row__xmark"
              icon="xmark"
              @click="deleteQuestion(question.number_in_test ?? -1)"
            />
          </div>
        </div>
        <div class="editable-question-type-select">
          <select @change="changeQuestionType($event, question)">
            <option disabled selected value="0">Выберите тип вопроса:</option>
            <option value="text">Текстовый вопрос</option>
            <option value="radio">Один вариант ответа</option>
            <option value="check">Несколько вариантов ответа</option>
            <option value="code">Код</option>
          </select>
        </div>
        <div class="question-body">
          <CodeQuestionBody
            v-if="question.type === 'code'"
            v-model="question.body"
          ></CodeQuestionBody>
          <CheckQuestionBody
            v-else-if="question.type === 'check'"
            v-model="question.body"
          ></CheckQuestionBody>
          <TextQuestionBody v-else-if="question.type === 'text'" v-model="question.body">
          </TextQuestionBody>
          <RadioQuestionBody v-else-if="question.type === 'radio'" v-model="question.body">
          </RadioQuestionBody>
        </div>
      </div>
    </div>
    <button @click.prevent="addQuestion">Добавить вопрос</button>
    <button type="submit" @click.prevent="sendAnswers">ОТПРАВИТЬ</button>
  </form>
</template>
<script lang="ts">
import type { Components } from '@/types/openapi'
import client from '@/helpers/api'
import CodeQuestionBody from './editable_question_bodies/EditableCodeQuestionBody.vue'
import RadioQuestionBody from './editable_question_bodies/EditableRadioQuestionBody.vue'
import TextQuestionBody from './editable_question_bodies/EditableTextQuestionBody.vue'
import CheckQuestionBody from './editable_question_bodies/EditableCheckQuestionBody.vue'
import QuillComponent from './QuillComponent.vue'

export default {
  components: {
    CodeQuestionBody,
    RadioQuestionBody,
    TextQuestionBody,
    CheckQuestionBody,
    QuillComponent
  },
  data() {
    return {
      questions: [] as Components.Schemas.QuestionCreation[],
      testName: ''
    }
  },
  methods: {
    addQuestion() {
      // @ts-expect-error id is readonly
      this.questions.push({
        number_in_test: this.questions.length,
        text: '<p><span class="ql-size-huge">Вопрос ' + (this.questions.length + 1) + '</span></p>',
        points: 1
      })
    },
    deleteQuestion(questionNumber: number) {
      this.questions = this.questions.filter(
        (question) => question.number_in_test !== questionNumber
      )
      this.questions.forEach((q, index) => {
        q.number_in_test = index + 1
      })
    },
    changeQuestionType(event: Event, question: Components.Schemas.QuestionCreation) {
      const type: 'text' | 'radio' | 'code' | 'check' =
        // @ts-ignore there always will be checked item
        Array.from(event.target.childNodes).find((r) => r.selected).value ?? 'text'
      question.type = type
      // @ts-expect-error id is readonly
      question.body = {
        text: { variants: [] },
        radio: {
          variants: [
            { text: 'Вариант 1', is_correct: true },
            { text: 'Вариант 2', is_correct: false }
          ]
        },
        check: {
          variants: [
            { text: 'Вариант 1', is_correct: true },
            { text: 'Вариант 2', is_correct: false }
          ],
          strict_score: false
        },
        code: { testing_code: '# Код для тестирования' }
      }[type]
    },
    sendAnswers() {
      console.log({ questions: this.questions, name: this.testName })
      client
        // @ts-expect-error readonly
        .tests_create(null, { questions: this.questions, name: this.testName })
        .then((response) => {
          console.log(response)
          this.$router.push({ name: 'tests' })
        })
    }
  }
}
</script>
<style scoped>
.question__first-row {
  display: flex;
  justify-content: space-between;
}

.first-row__xmark {
  cursor: pointer;
}

.col__first-row {
  display: flex;
}

.points-input__col input {
  width: 30px;
}

.quill-input {
  width: 80%;
}

.questions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 25px 0px;
}

.question {
  padding: 10px;
  border: 2px solid lightgrey;
  border-radius: 5px;
  font-size: x-large;
}

.question-body {
  margin-top: 20px;
}

.variants {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.variant {
  display: flex;
  gap: 8px;
}

input[type='text'] {
  width: 80%;
  padding: 0.2em 0.5rem;
  border: 2px solid grey;
  border-radius: 3px;
  font-size: large;
}
</style>
