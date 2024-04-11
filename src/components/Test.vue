<template>
    <div>
        <p>User: {{ user.email }}</p>
        <p>Test: {{ this.$route.params.test_uuid }}</p>
        <question-list :questions='questions' @test-submit="onSubmit" />
    </div>
</template>

<script>
import QuestionList from '@/components/QuestionList.vue';
import testsService from '@/services/tests.service';

export default {
    components: {
        QuestionList,
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            questions: [],
            answers: {
                text_answers: [],
                radio_answers: [],
                check_answers: [],
                code_answers: []
            },
        }
    },
    mounted: function () {
        testsService.getTest(this.$route.params.test_uuid)
            .then((questions) => {
                for (const qtype of ['text', 'code', 'check', 'radio']) {
                    questions[qtype + '_questions'].forEach(question => {
                        question.qtype = qtype;
                        question.qid = qtype + question.id;
                        this.questions.push(question);
                    });
                }
                this.questions.sort((q1, q2) => (q1.number_in_test - q2.number_in_test));
            })
            .catch((alert) => {
                console.log(alert);
            })
    },
    methods: {
        resetAnswers() {
            this.answers = {
                text_answers: [],
                radio_answers: [],
                check_answers: [],
                code_answers: []
            }
        },
        onSubmit(answers) {
            this.resetAnswers();
            for (const ans of answers) {
                var qtype, id;
                [qtype, id] = [ans.qid.slice(0, -1), ans.qid.slice(-1)];
                switch (qtype) {
                    case 'text':
                        this.answers.text_answers.push({
                            "answer": ans.answer,
                            "question": Number(id)
                        });
                        break;
                    case 'code':
                        this.answers.code_answers.push({
                            "code": ans.answer,
                            "question": Number(id)
                        });
                        break;
                    case 'radio':
                        this.answers.radio_answers.push({
                            "answer": ans.answer,
                            "question": Number(id)
                        });
                        break;
                    case 'check':
                        this.answers.check_answers.push({
                            "answers": ans.answer,
                            "question": Number(id)
                        });
                        break;
                }
            }
            console.log(this.answers);
            testsService.sendAnswers(this.$route.params.test_uuid, this.answers);
        }
    },
}
</script>

<style scoped></style>