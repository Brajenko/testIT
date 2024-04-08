<template>
    <div class="questions">
        <question :id="question.id" :title="question.title" :description="question.description" :qtype="question.qtype"
            :variants="question.variants" @answer-change="onAnswerChange" v-for="question in questions" />
    </div>
    <button class="default-button" @click="sendAnswers">Отправить ответы</button>
</template>

<script>
import Question from '@/components/Question.vue';

export default {
    components: {
        Question,
    },
    props: {
        typed_questions: {
            type: Map,
            default: {},
            required: true
        },
    },
    data() {
        let questions = [];
        for (const qtype of ['text', 'code', 'check', 'radio']) {
            console.log(this.typed_questions[qtype + '_questions']);
            this.typed_questions[qtype + '_questions'].forEach(question => {
                question.qtype = qtype;
                questions.push(question);
            });
        }
        questions.sort((q1, q2) => (q1.number_in_test - q2.number_in_test));
        let answers = {};
        return {
            answers: answers,
            questions: questions
        }
    },
    methods: {
        onAnswerChange(answer, id) {
            this.answers[id] = answer;
        },
        sendAnswers() {
            let data = [];
            for (const ans of Object.entries(this.answers)) {
                data.push({ id: ans[0], answer: ans[1] });
            }
            this.$emit('test-submit', data)
        }
    },
}
</script>

<style scoped>
.questions {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 25px;
}
</style>