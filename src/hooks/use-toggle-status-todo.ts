import { TodoService } from '@/services/todo.service'
import { ITodo } from '@/types/todo.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useToggleStatusTodo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: TodoService.toggleStatus,
		onSuccess: data => {
			queryClient.setQueryData(['todos'], (oldData: ITodo[]) => {
				if (!oldData) return [data]
				return oldData.map(todo => (todo._id === data._id ? data : todo))
			})
		},
	})
}
