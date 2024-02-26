<template>
    <div class="form-container">
        <form @submit.prevent="onSubmit">
            <div class="fields-container">
                <div class="form-field">
                    <label for="first_name">Имя</label>
                    <input type="text" name="first_name" id="first_name">
                </div>
                <div class="form-field">
                    <label for="last_name">Фамилия</label>
                    <input type="text" name="last_name" id="last_name">
                </div>
                <div class="form-field">
                    <label for="email">Электронная почта</label>
                    <input type="email" name="email" id="email" v-model="email" required>
                </div>
                <div class="form-field">
                    <label for="password">Пароль</label>
                    <input type="password" name="password" id="password" v-model="password" required>
                </div>
                <div class="form-field">
                    <label for="password">Повторите пароль</label>
                    <input type="password" name="repeat-password" id="repeat-password" v-model="password" required>
                </div>
                <input type="submit" value="Зарегистрироваться" class="default-button">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        onSubmit() {
            console.log(this.email, this.password)
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