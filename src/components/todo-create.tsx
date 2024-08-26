'use client'

import { useCreateTodo } from '@/hooks/use-create-todo'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'

const formSchema = z.object({
	description: z.string().min(2, {
		message: 'Description must be at least 2 characters.',
	}),
})

export const TodoCreate: FC = () => {
	const createTodoMutation = useCreateTodo()
	const { toast } = useToast()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: '',
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		createTodoMutation.mutate(values)
	}

	useEffect(() => {
		if (createTodoMutation.isSuccess) {
			const newTodo = form.getValues('description')
			toast({
				description: (
					<p>
						Task <span className='font-bold'>{newTodo}</span> has been created.
					</p>
				),
			})
			form.reset()
		}
	}, [createTodoMutation.isSuccess, form, toast])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-3'>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem className='grow'>
							<FormControl>
								<Input placeholder='Type description...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={createTodoMutation.isPending}>
					Submit
				</Button>
			</form>
		</Form>
	)
}
