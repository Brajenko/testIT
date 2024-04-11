<template>
    <input type="text" placeholder="Введите ответ..." v-model="answer" @change="onChange">
</template>

<script>
export default {
    data() {
        return {
            answer: ""
        }
    },
    props: {
    },
    methods: {
        onChange() {
            this.$emit('body-answer-change', this.answer)
        }
    },
}
</script>

<style scoped>
input[type="text"] {
    width: 80%;
    padding: 0.2em 0.5rem;
    border: 2px solid grey;
    border-radius: 3px;
    font-size: large;
}
</style>