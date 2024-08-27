import { api } from '@/lib/api'
import { ITodo, ITodoCrete } from '@/types/todo.type'

export const TodoService = {
	getAll: async (): Promise<ITodo[]> => {
		const { data } = await api.get('/todos')
		return data
	},
	create: async (values: ITodoCrete): Promise<ITodoCrete> => {
		const { data } = await api.post('/todos', values)
		return data
	},
	delete: async (id: string): Promise<ITodoCrete> => {
		const { data } = await api.delete(`/todos/${id}`)
		return data
	},
	toggleStatus: async (values: {
		id: string
		isCompleted: boolean
	}): Promise<ITodo> => {
		const { data } = await api.patch(`/todos/status/${values.id}`, {
			isCompleted: values.isCompleted,
		})
		return data
	},
	editDescription: async (values: {
		id: string
		description: string
	}): Promise<ITodo> => {
		const { data } = await api.patch(`/todos/description/${values.id}`, {
			description: values.description,
		})
		return data
	},
}
