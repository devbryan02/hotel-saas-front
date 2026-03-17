import axios from 'axios'
import { toast } from 'sonner'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    const data = error.response?.data

    if (status === 401) {
      window.location.href = '/login'
      return Promise.reject(data ?? error)
    }

    const message = data?.message || data?.error || 'Ocurrió un error inesperado'

    toast.error(getErrorTitle(status), {
      description: message,
    })

    return Promise.reject(data ?? error)
  }
)

function getErrorTitle(status?: number): string {
  switch (status) {
    case 400: return 'Datos inválidos'
    case 403: return 'Sin permisos'
    case 404: return 'No encontrado'
    case 409: return 'Conflicto'
    case 500: return 'Error del servidor'
    default: return 'Error'
  }
}

export default apiClient