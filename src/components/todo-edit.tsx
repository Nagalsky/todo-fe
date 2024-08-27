'use client'
import { useUpdatedTodo } from '@/hooks/use-update-todo'
import { ITodo } from '@/types/todo.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'

type Props = {
	data: ITodo
	setEdit: Dispatch<SetStateAction<boolean>>
}

const formSchema = z.object({
	description: z.string().min(2, {
		message: 'Description must be at least 2 characters.',
	}),
})

export const TodoEdit: FC<Props> = ({ data, setEdit }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: data?.description,
		},
	})

	const updateTodoMutation = useUpdatedTodo()
	const { toast } = useToast()

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const payload = {
			id: data?._id,
			description: values?.description,
		}
		updateTodoMutation.mutate(payload)
	}

	useEffect(() => {
		if (updateTodoMutation.isSuccess && data) {
			toast({
				description: <p>Task has been updated.</p>,
			})
			setEdit(false)
		}
	}, [data, setEdit, toast, updateTodoMutation.isSuccess])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-3'>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem className='grow'>
							<FormControl>
								<Input placeholder='Type description...' autoFocus {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Updated</Button>
			</form>
		</Form>
	)
}
