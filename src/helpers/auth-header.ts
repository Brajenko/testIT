import { useAuthStore } from '@/stores/auth.store'

export default function authHeader() {
  try {
    const user = useAuthStore().user
    return user?.access ? { Authorization: 'Bearer ' + user.access } : {}
  } catch (error) {
    return {}
  }
}
