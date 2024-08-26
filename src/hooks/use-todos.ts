import { TodoService } from '@/services/todo.service'
import { useQuery } from '@tanstack/react-query'

export const useTodos = () => {
	return useQuery({
		queryKey: ['todos'],
		queryFn: TodoService.getAll,
		select: data => {
			return data.reverse()
		},
	})
}
