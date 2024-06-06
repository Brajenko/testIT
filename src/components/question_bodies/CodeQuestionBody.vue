<template>
  <div>
    <VAceEditor
      @init="editorInit"
      v-model:value="body.code"
      :placeholder="'Введите код...'"
      lang="python"
      theme="chrome"
      style="height: 300px"
    >
    </VAceEditor>
  </div>
  <br />
  <div v-if="body.errors">
    <b>Ошибка при выполнении:</b>
    <i style="color: red">{{ body.errors }}</i>
  </div>
</template>

<script lang="ts">
import { VAceEditor } from 'vue3-ace-editor'
import type { Ace } from 'ace-builds'
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      body: this.modelValue
    }
  },
  methods: {
    editorInit(editor: Ace.Editor) {
      editor.setReadOnly(this.disabled)
    }
  }
}
</script>

<style scoped></style>
