import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 15000,
})

export const predictDisease = (formData) =>
  api.post('/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const addPlant = (plant) => api.post('/add-plant', plant)

export const getPlants = () => api.get('/plants')

export const getAlerts = () => api.get('/plant-alerts')

export const chatWithOllama = (message) =>
  api.post('/chat', { message })

export const deletePlant = (id) =>
  api.delete(`/plants/${id}`)

export default api
