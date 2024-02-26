<template>
    <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
    </ul>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    components: {
        RouterLink,
    },
}
</script>

<style scoped>
ul {
    display: flex;
    justify-content: space-evenly;
    gap: 40px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 5px solid lightgray;
    border-bottom: 5px solid lightgray;
}

a {
    text-decoration: none;
    color: black;
    font-size: x-large;

}
</style>