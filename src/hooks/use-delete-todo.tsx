import { useToast } from '@/components/ui/use-toast'
import { TodoService } from '@/services/todo.service'
import { ITodo } from '@/types/todo.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTodo = () => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	return useMutation({
		mutationFn: (todoId: string) => TodoService.delete(todoId),
		onSuccess: (_, deletedTodoId) => {
			queryClient.setQueryData<ITodo[]>(['todos'], oldData => {
				if (!oldData) return []
				const deletedTodo = oldData.find(todo => todo._id === deletedTodoId)
				const newData = oldData.filter(todo => todo._id !== deletedTodoId)

				if (deletedTodo) {
					toast({
						description: (
							<p>
								Task{' '}
								<span className='font-bold'>{deletedTodo.description}</span> has
								been deleted.
							</p>
						),
					})
				}

				return newData
			})
		},
	})
}
