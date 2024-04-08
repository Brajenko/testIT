<template>
    <div class="form-container">
        <form @submit.prevent="onSubmit">
            <div class="fields-container">
                <div class="form-field">
                    <label for="first_name">Имя</label>
                    <input type="text" name="first_name" id="first_name" v-model="user.first_name">
                </div>
                <div class="form-field">
                    <label for="last_name">Фамилия</label>
                    <input type="text" name="last_name" id="last_name" v-model="user.last_name">
                </div>
                <div class="form-field">
                    <label for="email">Электронная почта</label>
                    <input type="email" name="email" id="email" v-model="user.email" required autocomplete="email">
                </div>
                <div class="form-field">
                    <label for="password">Пароль</label>
                    <input type="password" name="password" id="password" v-model="user.password" @input="checkPasswords" required autocomplete="new-password">
                </div>
                <div class="form-field">
                    <label for="password">Повторите пароль</label>
                    <input type="password" name="repeat-password" id="repeat-password" v-model="repeated_password" @input="checkPasswords" required autocomplete="new-password">
                </div>
                <input type="submit" value="Зарегистрироваться" class="default-button">
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
            repeated_password: '',
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('auth/register', this.user).then(
                () => {
                    this.$router.push('/login');
                },
                error => {
                    console.log(error)
                }
            )
        },
        checkPasswords() {
            const repeatPasswordInput = document.querySelector('#repeat-password')
            if (this.repeated_password != this.user.password) {
                repeatPasswordInput.setCustomValidity('Пароли не совпадают')
            }
            else {
                console.log(2)
                repeatPasswordInput.setCustomValidity('')
            }
        }
    },
}
</script>

<style scoped>
input:not([type="submit"])  {
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