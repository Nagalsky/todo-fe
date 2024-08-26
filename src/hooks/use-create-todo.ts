import { TodoService } from '@/services/todo.service'
import { ITodo } from '@/types/todo.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateTodo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: TodoService.create,
		onSuccess: data => {
			queryClient.setQueryData(['todos'], (oldData: ITodo[]) => {
				return oldData.reverse() ? [...oldData, data] : [data]
			})
		},
	})
}
