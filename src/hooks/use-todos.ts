import { TodoService } from '@/services/todo.service'
import { useQuery } from '@tanstack/react-query'

export const useTodos = () => {
	return useQuery({
		queryKey: ['todos'],
		queryFn: TodoService.getAll,
		select: data => {
			return data.sort((a, b) => {
				const timestampA = parseInt(a._id.substring(0, 8), 16)
				const timestampB = parseInt(b._id.substring(0, 8), 16)
				return timestampB - timestampA
			})
		},
	})
}
