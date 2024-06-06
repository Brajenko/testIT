<template>
  <div>
    <input
      :disabled="disabled"
      type="text"
      :placeholder="'Введите ответ...'"
      v-model="body.picked_variant.text"
      @input="$emit('update:modelValue', body)"
      :class="['incorrect', 'correct'][Number(body.picked_variant?.is_correct)]"
    />
    <div v-if="body.picked_variant?.is_correct === false">
      <div v-for="variant in variants" :key="variant.id" class="correct">{{ variant.text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    variants: {
      type: Object,
      default: null
    }
  },
  emits: ['update:modelValue'],
  data() {
    const body = this.modelValue
    return {
      text: '',
      body: body
    }
  },
  methods: {}
}
</script>

<style scoped>
input[type='text'] {
  width: 80%;
  padding: 0.2em 0.5rem;
  border: 2px solid grey;
  border-radius: 3px;
  font-size: large;
}

.correct {
  border-color: green;
  color: green;
}

.incorrect {
  border: 2px solid red;
  color: red;
}
</style>
