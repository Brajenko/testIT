<template>
    <div class="question">
        <b class="title">{{ title }}</b>
        <p class="description">{{ description }}</p>
        <div class="question-body">
            <text-question-body v-if="qtype == 'text'" @body-answer-change="onAnswerChange" />
            <code-question-body v-else-if="qtype == 'code'" @body-answer-change="onAnswerChange" />
            <radio-question-body :variants="variants" v-if="qtype == 'radio'" @body-answer-change="onAnswerChange" />
            <check-question-body :variants="variants" v-if="qtype == 'check'" @body-answer-change="onAnswerChange" />
        </div>
    </div>
</template>

<script>
import TextQuestionBody from '@/components/TextQuestionBody.vue';
import CodeQuestionBody from '@/components/CodeQuestionBody.vue';
import RadioQuestionBody from '@/components/RadioQuestionBody.vue';
import CheckQuestionBody from '@/components/CheckQuestionBody.vue';

export default {
    components: {
        TextQuestionBody,
        CodeQuestionBody,
        RadioQuestionBody,
        CheckQuestionBody
    },
    props: {
        qid: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: "Title",
            required: true
        },
        description: {
            type: String,
            required: false
        },
        qtype: {
            type: String,
            required: true
        },
        variants: {
            type: Array,
            required: false
        }
    },
    methods: {
        onAnswerChange(answer) {
            this.$emit('answer-change', answer, this.qid)
        }
    },
}
</script>

<style scoped>
.question {
    padding: 10px;
    border: 2px solid lightgrey;
    border-radius: 5px;
    font-size: x-large;
}

.question-body {
    margin-top: 20px;
}
</style>