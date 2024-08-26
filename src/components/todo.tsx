'use client'
import { ITodo } from '@/types/todo.type'
import { format, fromUnixTime } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { FC } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Switch } from './ui/switch'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'

type Props = {
	data: ITodo
}

export const Todo: FC<Props> = ({ data }) => {
	const timestamp = parseInt(data._id.substring(0, 8), 16)
	const date = fromUnixTime(timestamp)

	const handleIsCompleted = () => {
		console.log('value')
	}

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
					<p className='grow'>{data?.description}</p>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant={'ghost'}>
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
