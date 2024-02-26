<template>
    <div class="variants">
        <label class="variant" v-for="variant in variants">
            {{ variant }}
            <input type="radio" :value="variant" v-model="answer" @change="onClick">
        </label>
    </div>
</template>

<script>
export default {
    props: {
        variants: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            answer: ''
        }
    },
    methods: {
        onClick() {
            this.$emit('body-answer-change', this.answer)
        }
    },
}
</script>

<style scoped>
.variants {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.variant {
    display: flex;
    gap: 8px
}
</style>