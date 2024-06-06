<template>
  <div class="variants">
    <div v-for="(variant, index) in body.variants" :key="index" class="variant">
      <label
        contenteditable
        @input="
          variant.text = ($event.target as HTMLElement).innerText;
          $emit('update:modelValue', body)
        "
      >
        {{ variant.text }}
      </label>
      <input
        :checked="variant.is_correct"
        type="radio"
        :value="variant.text"
        name="variants"
        @change="changeCorrectVariant($event, index)"
      />
    </div>
  </div>
  <button @click.prevent="addVariant">+</button>
</template>

<script lang="ts">
import type { Components } from '@/types/openapi'
import type { PropType } from 'vue'

export default {
  emits: ['update:modelValue'],

  props: {
    modelValue: {
      type: Object as PropType<Components.Schemas.BodyCreation>,
      required: true
    }
  },
  data() {
    return {
      body: this.modelValue
    }
  },
  methods: {
    addVariant() {
      // @ts-expect-error cant be undefined
      this.body.variants.push({
        // @ts-expect-error cant be undefined
        text: 'Вариант ' + (this.body.variants.length + 1 ?? 1),
        is_correct: false
      })
      this.$emit('update:modelValue', this.body)
    },
    changeCorrectVariant(event: Event, index: number) {
      // @ts-expect-error cant be undefined
      this.body.variants.forEach(
        (variant: Components.Schemas.VariantIsCorrect, i: number) =>
          (variant.is_correct = i === index)
      )
      this.$emit('update:modelValue', this.body)
    }
  }
}
</script>

<style scoped>
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
