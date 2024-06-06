<template>
  <div class="questions">
    <div v-for="(question, index) in questions" :key="question.id" class="question">
      <div class="first-row__question">
        <div class="quill-input">
          <QuillComponent
            v-model="question.text"
            placeholder="Введите текст вопроса..."
            readonly
          ></QuillComponent>
        </div>
        <div class="points">{{ question.points }} б.</div>
      </div>
      <div class="question-body">
        <CodeQuestionBody
          v-if="question.type === 'code'"
          v-model="answers[index].body"
        ></CodeQuestionBody>
        <CheckQuestionBody
          v-else-if="question.type === 'check'"
          v-model="answers[index].body"
          :variants="question.body.variants"
        >
        </CheckQuestionBody>
        <TextQuestionBody
          v-else-if="question.type === 'text'"
          v-model="answers[index].body"
        ></TextQuestionBody>
        <RadioQuestionBody
          v-else-if="question.type === 'radio'"
          v-model="answers[index].body"
          :variants="question.body.variants"
        >
        </RadioQuestionBody>
      </div>
    </div>
  </div>
  <button type="submit" @click.prevent="sendAnswers">ОТПРАВИТЬ</button>
</template>

<script lang="ts">
import type { Components } from '@/types/openapi'
import CodeQuestionBody from './question_bodies/CodeQuestionBody.vue'
import RadioQuestionBody from './question_bodies/RadioQuestionBody.vue'
import TextQuestionBody from './question_bodies/TextQuestionBody.vue'
import QuillComponent from './QuillComponent.vue'
import CheckQuestionBody from './question_bodies/CheckQuestionBody.vue'

export default {
  components: {
    CodeQuestionBody,
    RadioQuestionBody,
    TextQuestionBody,
    CheckQuestionBody,
    QuillComponent
  },
  emits: ['test-passed'],
  props: {
    questions: {
      type: Array as () => Components.Schemas.Question[],
      required: true
    }
  },
  data() {
    return {
      answers: [] as Components.Schemas.AnswerCreation[]
    }
  },
  watch: {
    questions: function () {
      this.generateAnswers()
    }
  },
  methods: {
    generateAnswers() {
      this.questions.forEach((question) => {
        this.answers.push({
          question: question.id,
          // @ts-expect-error id is readonly
          body: {
            text: { picked_variant: { text: '' } },
            code: { code: '' },
            radio: { picked_variant: { text: '' } },
            check: { picked_variants: [] }
          }[question.type]
        })
      })
    },
    sendAnswers() {
      this.$emit('test-passed', this.answers)
    }
  }
}
</script>
<style scoped>
.questions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.question {
  padding: 10px;
  border: 2px solid lightgrey;
  border-radius: 5px;
  font-size: x-large;
}

.first-row__question {
  display: flex;
  justify-content: space-between;
}

.quill-input {
  width: 80%;
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
