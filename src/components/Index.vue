<template>
    <div>
        <p>User: {{ user ? user.email : 'not authenficated'}}</p>  
    </div>
</template>

<script>

export default {
    components: {
},
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user"))
        }
    },
    methods: {
    },
}
</script>

<style scoped></style>