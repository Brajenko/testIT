<template>
    <div class="form-container">
        <form @submit.prevent="onSubmit">
            <div class="fields-container">
                <div class="form-field">
                    <label for="email">Электронная почта</label>
                    <input type="email" name="email" id="email" v-model="user.email" required>
                </div>
                <div class="form-field">
                    <label for="password">Пароль</label>
                    <input type="password" name="password" id="password" v-model="user.password" required>
                </div>
                <input type="submit" value="Войти" class="default-button">
            </div>
        </form>
    </div>
</template>

<script>
import User from '@/models/user';
export default {
    data() {
        return {
            user: new User('', ''),
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('auth/login', this.user).then(
                () => {
                    this.$router.push('/');
                },
                error => {
                    console.log(error)
                }
            )
        }
    },
}
</script>

<style scoped>
input:not([type="submit"]) {
    width: 80%;
    padding: 0.2em 0.5rem;
    border: 2px solid grey;
    border-radius: 3px;
    font-size: large;
}

.form-container {
    padding: 100px;
}

.fields-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-field {
    display: flex;
    flex-direction: column;
}

.form-field label {
    color: grey;
    font-size: large;
}
</style>