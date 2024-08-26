import { TodoService } from '@/services/todo.service'
import { ITodo, ITodoCrete } from '@/types/todo.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateTodo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: TodoService.create,
		onSuccess: data => {
			queryClient.setQueryData(['todos'], (oldData: ITodo[]) => {
				const newData = oldData ? [...oldData, data] : [data]

				return newData.sort((a, b) => {
					const getTimestamp = (obj: ITodoCrete) =>
						obj._id ? parseInt(obj._id.substring(0, 8), 16) : 0

					const timestampA = getTimestamp(a)
					const timestampB = getTimestamp(b)

					return timestampB - timestampA
				})
			})
		},
	})
}
