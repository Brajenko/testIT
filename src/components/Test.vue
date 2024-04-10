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
        }
    },
    mounted: function () {
        testsService.getTest(this.$route.params.test_uuid)
            .then((questions) => {
                for (const qtype of ['text', 'code', 'check', 'radio']) {
                    questions[qtype + '_questions'].forEach(question => {
                        question.qtype = qtype;
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
        onSubmit(data) {
            console.log(data, 'sended to server')
        }
    },
}
</script>

<style scoped></style>