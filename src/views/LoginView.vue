<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <div class="fields-container">
        <div class="form-field">
          <label for="email">Электронная почта</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="user.email"
            required
            autocomplete="on"
          />
        </div>
        <div class="form-field">
          <label for="password">Пароль</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="user.password"
            required
            autocomplete="on"
          />
        </div>
        <button type="submit" class="default-button">Войти</button>
      </div>
    </form>
    <div>
      <p>
        Еще нет аккаунта? <router-link :to="{ name: 'register', query: $route.query }">Зарегистрируйтесь</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import router from '@/helpers/router'

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      // wait for store to save our user
      await useAuthStore().login(this.user.email, this.user.password)
      router.push(this.$route.query.redirect || '/')
    }
  }
}
</script>

<style scoped>
input:not([type='submit']) {
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
