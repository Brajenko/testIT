<template>
    <div>
        <p>User: {{ user.email }}   Test: {{ this.$route.params.test_uuid }}</p>
        <question-list :typed_questions='questions' @test-submit="onSubmit" />
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
            questions: {
                'text_questions': [],
                'radio_questions': [],
                'code_questions': [],
                'check_questions': [],
            }
        }
    },
    mounted: function() {
        testsService.getTest(this.$route.params.test_uuid)
            .then((questions) => {
                this.questions = questions;
                console.log(this.questions)
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