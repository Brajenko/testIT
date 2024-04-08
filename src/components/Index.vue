<template>
    <div>
        <p>User: {{ user ? user.email : 'not authenficated'}}</p>  
    </div>
</template>

<script>
import { auth } from '@/store/auth.module';

export default {
    components: {
},
    data() {
        return {
            user: auth.state.user
        }
    },
    methods: {
    },
}
</script>

<style scoped></style>