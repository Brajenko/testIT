import type { Client } from '@/types/openapi'
import OpenAPIClientAxios from 'openapi-client-axios'
import authHeader from './auth-header'

const api = new OpenAPIClientAxios({
  definition: 'http://127.0.0.1:8000/api/schema/json/'
})
const client = await api.init<Client>()
client.interceptors.request.use(function (config) {
  config.headers = { ...config.headers.common, ...authHeader() }
  return config
})
export default client
