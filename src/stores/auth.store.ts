import { defineStore } from 'pinia'

import client from '@/helpers/api'

export const useAuthStore = defineStore({
  id: 'auth',

  state: (): {
    user: { email: string; access: string; refresh: string } | null
    refreshTokenTimeout: number
  } => {
    const saved = localStorage.getItem('auth')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      user: null as { email: string; access: string; refresh: string } | null,
      refreshTokenTimeout: 0
    }
  },
  getters: {
    isAuthenticated: (state) => {
      return state.user && state.user.access
    }
  },
  actions: {
    async login(email: string, password: string) {
      const response = await client.users_token_obtain_create(
        null,
        // @ts-expect-error wrong api type
        {
          email: email,
          password: password
        }
      )
      this.user = {
        // @ts-expect-error wrong api type
        email: email,
        ...response.data
      }
      const me_response = await client.users_me_retrieve()
      this.user = {
        ...this.user,
        ...me_response.data
      }
      this.startRefreshTokenTimer()
    },
    logout() {
      this.stopRefreshTokenTimer()
      this.user = null
      this.refreshTokenTimeout = 0
      localStorage.removeItem('auth')
    },
    async refreshToken(attempt: number = 0) {
      if (!this.user || !this.user?.refresh) {
        this.logout()
        return
      }
      // @ts-expect-error wrong api type
      client.users_token_refresh_create(null, { refresh: this.user.refresh }).then(
        (response) => {
          this.user = {
            email: this.user?.email ?? '',
            access: response.data.access,
            refresh: this.user?.refresh ?? ''
          }
        },
        (error) => {
          console.log(error)
          if (attempt > 3) {
            this.logout()
          } else {
            this.refreshToken(attempt + 1)
          }
        }
      )
      this.startRefreshTokenTimer()
    },
    startRefreshTokenTimer() {
      if (!this.user) {
        this.logout()
        return
      }
      // parse json object from base64 encoded jwt token
      const base64 = this.user.access.split('.')[1]
      const token = JSON.parse(atob(base64))

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(token.exp * 1000)
      const timeout = expires.getTime() - Date.now() - 60 * 1000
      this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout)
    },
    stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout)
    }
  }
})
