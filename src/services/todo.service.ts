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
}
