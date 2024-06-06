<template>
  <div>
    <div class="first-row__question">
      <div class="quill-input">
        <QuillComponent
        
          :modelValue="question.text"
          placeholder="Введите текст вопроса..."
          readonly
        ></QuillComponent>
      </div>
      <div class="points">{{ question.points }} б.</div>
    </div>
    <div class="question-body">
      
      <CodeQuestionBody v-if="question.type === 'code'" v-model="answerBody"></CodeQuestionBody>
      <CheckQuestionBody
          v-else-if="question.type === 'check'"
          v-model="answerBody"
          :variants="question.body.variants"
        >
        </CheckQuestionBody>
      <TextQuestionBody
        v-else-if="question.type === 'text'"
        v-model="answerBody"
        :variants="question.body.variants"
      ></TextQuestionBody>
      <RadioQuestionBody
        v-else-if="question.type === 'radio'"
        v-model="answerBody"
        :variants="question.body.variants"
      ></RadioQuestionBody>
    </div>
  </div>
</template>

<script lang="ts">
import type { Components } from '@/types/openapi'
import type { PropType } from 'vue'

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
  props: {
    question: {
      type: Object as PropType<Components.Schemas.Question>,
      required: true
    }
  },
  data() {
    const answerBody = {
      text: { picked_variant: { text: '', is_correct: true } },
      code: { code: this.question.body.testing_code },
      radio: { picked_variant: { text: '' } },
      check: { picked_variants: [] }
    }[this.question.type]
    return {
      answerBody
    }
  },
  methods: {}
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
