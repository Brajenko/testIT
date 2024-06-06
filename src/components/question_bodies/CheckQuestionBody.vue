<template>
  <div class="variants">
    <label
      class="variant"
      v-for="variant in body.variants"
      :key="variant.id"
      :class="['incorrect', 'correct'][Number(variant.is_correct)]"
    >
      {{ variant.text }}
      <input
        :disabled="disabled"
        type="checkbox"
        :value="variant"
        v-model="body.picked_variants"
        @change="$emit('update:modelValue', body)"
      />
    </label>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['update:modelValue'],

  props: {
    modelValue: {
      type: Object,
      required: true
    },
    variants: {
      type: Object,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const body = this.modelValue
    if (this.variants !== null) {
      body.variants = this.variants
    }
    return {
      body: body
    }
  },
  methods: {}
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

.incorrect {
  color: red;
}

.correct {
  color: green;
}
</style>
