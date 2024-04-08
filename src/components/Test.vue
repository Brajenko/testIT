<template>
    <div>
        <p>User: {{ user.email }}</p>
        <question-list :typed_questions='questions' @test-submit="onSubmit"/>    
    </div>
</template>

<script>
import QuestionList from '@/components/QuestionList.vue';
import testsService from '@/services/tests.service';
import { auth } from '@/store/auth.module';

export default {
    components: {
    QuestionList,
},
    data() {
        testsService.getTest(this.$route.params.test_uuid)
        .then((response) => {
            const questions = response;
        })
        .catch(alert)
        console.log(questions | 1);
        return {
            questions: questions,
            user: auth.state.user
        }
    },
    methods: {
        onSubmit(data) {
            console.log(data, 'sended to server')
        }
    },
}
</script>

<style scoped></style>