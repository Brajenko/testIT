<template>
  <div>
    <VAceEditor
      v-model:value="body.testing_code"
      :placeholder="'Введите тесты для кода...'"
      lang="python"
      theme="chrome"
      style="height: 300px"
    >
    </VAceEditor>
  </div>
</template>

<script lang="ts">
import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-chrome'

export default {
  emits: ['update:modelValue'],

  components: {
    VAceEditor
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      body: this.modelValue
    }
  }
}
</script>

<style scoped></style>
