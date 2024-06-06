<template>
  <div class="questions">
    <div v-for="(question, index) in test.questions" :key="question.id" class="question">
      <div class="first-row__question">
        <div class="quill-input">
          <QuillComponent
            v-model="question.text"
            placeholder="Введите текст вопроса..."
            readonly
          ></QuillComponent>
        </div>
        <div class="points">{{ completion.answers[index].points }}/{{ question.points }} б.</div>
      </div>
      <div class="question-body">
        <CodeQuestionBody
          disabled
          v-if="question.type === 'code'"
          :modelValue="completion.answers[index].body"
        >
        </CodeQuestionBody>
        <CheckQuestionBody
          disabled
          v-else-if="question.type == 'check'"
          :modelValue="completion.answers[index].body"
          :variants="question.body.variants"
        ></CheckQuestionBody>
        <TextQuestionBody
          disabled
          v-else-if="question.type === 'text'"
          :variants="question.body.variants"
          :modelValue="completion.answers[index].body"
        ></TextQuestionBody>
        <RadioQuestionBody
          disabled
          v-else-if="question.type === 'radio'"
          :variants="question.body.variants"
          :modelValue="completion.answers[index].body"
        >
        </RadioQuestionBody>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { Components } from '@/types/openapi'
import type { PropType } from 'vue'

import CodeQuestionBody from './question_bodies/CodeQuestionBody.vue'
import TextQuestionBody from './question_bodies/TextQuestionBody.vue'
import RadioQuestionBody from './question_bodies/RadioQuestionBody.vue'
import QuillComponent from './QuillComponent.vue'
import CheckQuestionBody from './question_bodies/CheckQuestionBody.vue'

export default {
  components: {
    CodeQuestionBody,
    TextQuestionBody,
    RadioQuestionBody,
    CheckQuestionBody,
    QuillComponent
  },
  props: {
    test: {
      type: Object as PropType<Components.Schemas.Test>,
      required: true
    },
    completion: {
      type: Object as PropType<Components.Schemas.Completion>,
      required: true
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
</style>
