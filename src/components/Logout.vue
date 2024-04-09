<template>
    Logout
</template>
<script>
import AuthService from "@/services/auth.service";
export default {
    data() {
        return {

        }
    },
    created: function () {
        AuthService.logout();
        this.$router.push('/');
    }
}
</script>