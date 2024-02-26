<template>
    <div>
        <question-list :questions='questions' @test-submit="onSubmit"/>    
    </div>
</template>

<script>
import QuestionList from '@/components/QuestionList.vue';

export default {
    components: {
    QuestionList,
},
    data() {
        return {
            questions: [
                {
                    id: 0,
                    qtype: 'text',
                    title: 'Title 1',
                    description: 'Description 1'
                },
                {
                    id: 1,
                    qtype: 'code',
                    title: 'Title 2',
                    description: 'Description 2'
                },
                {
                    id: 2,
                    qtype: 'check',
                    title: 'Title 3',
                    variants: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6']
                },
                {
                    id: 3,
                    qtype: 'radio',
                    title: 'Title 4',
                    description: 'Description 4',
                    variants: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
                },
            ]
        }
    },
    methods: {
        onSubmit(data) {
            // send data to server
            console.log(data, 'sended to server')
        }
    },
}
</script>

<style scoped></style>