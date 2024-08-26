import { TodoCreate } from '@/components/todo-create'
import { Todos } from '@/components/todos'

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between py-16'>
			<div className='container space-y-5'>
				<h1 className='font-bold text-4xl'>Todo{"'"}s app</h1>
				<TodoCreate />
				<Todos />
			</div>
		</main>
	)
}
