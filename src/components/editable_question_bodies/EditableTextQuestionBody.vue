<template>
  <div v-for="(variant, index) in body.variants" :key="index" class="variants">
    <input
      type="text"
      :placeholder="'Введите правильный ответ...'"
      v-model="body.variants[index].text"
      @input="$emit('update:modelValue', body)"
      :class="inputClass"
    />
  </div>
  <button @click.prevent="addVariant">+</button>
</template>

<script lang="ts">
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data() {
    const body = this.modelValue
    return {
      inputClass: ['incorrect', 'correct'][Number(body.picked_variant?.is_correct)] ?? '',
      text: '',
      body: body
    }
  },
  methods: {
    addVariant() {
      this.body.variants.push({ text: '', is_correct: true })
    }
  }
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

.variants {
  display: flex;
  flex-direction: column;
  margin: 0 0 5px 0;
}
</style>
