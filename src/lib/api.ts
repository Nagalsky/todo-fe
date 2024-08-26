import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://todo-be-coral-eta.vercel.app/',
})
