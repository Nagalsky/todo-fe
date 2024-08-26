'use client'
import { ITodo } from '@/types/todo.type'
import { FC } from 'react'
import { Card, CardContent } from './ui/card'

type Props = {
	data: ITodo
}

export const Todo: FC<Props> = ({ data }) => {
	return (
		<Card>
			<CardContent className='p-4'>
				<p>{data?.description}</p>
			</CardContent>
		</Card>
	)
}
