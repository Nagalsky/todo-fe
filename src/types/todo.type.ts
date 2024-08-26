export type ITodo = {
	_id: string
	description: string
	isCompleted: boolean
}

export type ITodoCrete = Pick<ITodo, 'description'>
