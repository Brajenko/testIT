<template>
  <div>
    <QuillEditor
      :content="modelValue"
      content-type="html"
      ref="quill"
      :options="options"
      @editor-change="onChange"
    />
  </div>
</template>

<script lang="ts">
import '@/helpers/jquery'
import katex from 'katex'
window.katex = katex

import { QuillEditor, Quill } from '@vueup/vue-quill'

import '@edtr-io/mathquill/build/mathquill.js'
import '@edtr-io/mathquill/build/mathquill.css'

// @ts-ignore i cannot find types for this
import mathquill4quill from 'mathquill4quill'
import 'mathquill4quill/mathquill4quill.css'

import BlotFormatter from 'quill-blot-formatter'
// @ts-ignore i cannot find types for this
import { ImageDrop } from 'quill-image-drop-module'

Quill.register(
  {
    'modules/ImageDrop': ImageDrop,
    'modules/blotFormatter': BlotFormatter
  },
  true
)

const operators = [
  ['\\pm', '\\pm'],
  ['\\sqrt{x}', '\\sqrt'],
  ['\\sqrt[3]{x}', '\\sqrt[3]{}'],
  ['\\sqrt[n]{x}', '\\nthroot'],
  ['\\frac{x}{y}', '\\frac'],
  ['\\sum^{s}_{x}{d}', '\\sum'],
  ['\\prod^{s}_{x}{d}', '\\prod'],
  ['\\coprod^{s}_{x}{d}', '\\coprod'],
  ['\\int^{s}_{x}{d}', '\\int'],
  ['\\binom{n}{k}', '\\binom']
]

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video'],

  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ script: 'sub' }, { script: 'super' }, 'formula'],

  [{ size: ['small', false, 'large', 'huge'] }],

  [{ color: [] }, { background: [] }],
  [{ align: [] }],

  ['clean']
]

export default {
  components: {
    QuillEditor
  },
  emits: ['update:modelValue'],
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Введите текст вопроса...'
    }
  },
  data() {
    return {
      content: '',
      quill: null as unknown as typeof QuillEditor,
      options: {
        modules: this.readonly
          ? { toolbar: false, formula: true }
          : {
              formula: true,
              toolbar: toolbarOptions,
              blotFormatter: {},
              ImageDrop: true
            },
        placeholder: this.readonly ? '' : this.placeholder,
        readOnly: this.readonly,
        theme: 'snow'
      }
    }
  },
  mounted() {
    if (this.readonly) {
      return
    }
    this.quill = this.$refs.quill as typeof QuillEditor
    // https://github.com/c-w/mathquill4quill/issues/97#issuecomment-1740482856
    this.quill.container = this.quill.getEditor() as Element

    const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill, katex })

    enableMathQuillFormulaAuthoring(this.quill, {
      operators
    })
  },
  methods: {
    onChange() {
      if (!this.readonly) {
        this.$emit('update:modelValue', this.quill.getHTML())
      }
    }
  }
}
</script>

<style scoped></style>
