<template>
    <codemirror v-model="answer" placeholder="Введите код..." :autofocus="false" :tab-size="4" :extensions="extensions" @blur="onChange" />
</template>

<script>
import { Codemirror } from 'vue-codemirror'
import { EditorView } from '@codemirror/view'
import { pythonLanguage } from '@codemirror/lang-python'

export default {
    components: {
        Codemirror,
    },
    data() {
        const stylesExt = EditorView.theme({
            "&.cm-editor": { outline: '2px solid grey', height: '400px' },
            "&.cm-focused": { outline: "2px solid black" }
        })
        return {
            answer: '',
            extensions: [pythonLanguage, stylesExt],
        }
    },
    methods: {
        onChange() {
            this.$emit('body-answer-change', this.answer)
        }
    },
}

</script>

<style scoped></style>