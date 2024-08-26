'use client'
import { useTodos } from '@/hooks/use-todos'
import { FC } from 'react'
import { Todo } from './todo'
import { Skeleton } from './ui/skeleton'

export const Todos: FC = () => {
	const { data: todos, isLoading } = useTodos()

	if (isLoading)
		return (
			<div className='space-y-3'>
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton key={index} className='h-[58px] rounded' />
				))}
			</div>
		)

	return (
		<div className='space-y-3'>
			{todos?.map(todo => (
				<Todo key={todo._id} data={todo} />
			))}
		</div>
	)
}
