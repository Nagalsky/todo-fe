'use client'
import { useDeleteTodo } from '@/hooks/use-delete-todo'
import { useToggleStatusTodo } from '@/hooks/use-toggle-status-todo'
import { cn } from '@/lib/utils'
import { ITodo } from '@/types/todo.type'
import { format, fromUnixTime } from 'date-fns'
import { CircleX, Edit, Trash2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { TodoEdit } from './todo-edit'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Switch } from './ui/switch'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'
import { useToast } from './ui/use-toast'

type Props = {
	data: ITodo
}

export const Todo: FC<Props> = ({ data }) => {
	const deleteTodoMutation = useDeleteTodo()
	const toggleStatusTodoMutation = useToggleStatusTodo()

	const [edit, setEdit] = useState<boolean>(false)

	const { toast } = useToast()

	const timestamp = parseInt(data._id.substring(0, 8), 16)
	const date = fromUnixTime(timestamp)

	const handleIsCompleted = () => {
		const payload = {
			id: data?._id,
			isCompleted: !data?.isCompleted,
		}
		toggleStatusTodoMutation.mutate(payload)
	}

	const handleDelete = () => {
		deleteTodoMutation.mutate(data?._id)
	}

	useEffect(() => {
		if (toggleStatusTodoMutation.isSuccess && data) {
			const status = data.isCompleted ? 'completed' : 'marked as incomplete'
			toast({
				description: (
					<p>
						Task <span className='font-bold'>{data.description}</span> has been{' '}
						{status}.
					</p>
				),
			})
		}
	}, [data, toast, toggleStatusTodoMutation.isSuccess])

	return (
		<Card>
			<CardContent className='p-4 space-y-3'>
				<p className='text-right text-sm font-bold'>
					{format(date, 'yyyy-MM-dd HH:mm')}
				</p>
				<div className='flex items-start gap-3'>
					<Switch
						className='shrink-0'
						checked={data.isCompleted}
						onCheckedChange={handleIsCompleted}
					/>

					<div className='flex grow gap-3 items-start'>
						<div className='grow'>
							{edit ? (
								<TodoEdit data={data} setEdit={setEdit} />
							) : (
								<p className={cn(data.isCompleted && 'line-through')}>
									{data?.description}
								</p>
							)}
						</div>

						<div className='flex gap-2 shrink-0'>
							<TooltipProvider>
								{edit ? (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant={'ghost'} onClick={() => setEdit(false)}>
												<CircleX className='size-5' />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Cancel</TooltipContent>
									</Tooltip>
								) : (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant={'ghost'} onClick={() => setEdit(true)}>
												<Edit className='size-5' />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Edit</TooltipContent>
									</Tooltip>
								)}
							</TooltipProvider>
						</div>
					</div>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant={'ghost'} onClick={handleDelete}>
									<Trash2 className='size-5' />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Delete task</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</CardContent>
		</Card>
	)
}
