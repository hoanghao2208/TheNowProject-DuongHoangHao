import { type SVGProps } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { api } from '@/utils/client/api'

type TodoStatus = 'pending' | 'completed' | 'all'

interface TodoListProps {
  status: TodoStatus
}

export const TodoList = ({ status }: TodoListProps) => {
  const apiContext = api.useContext()
  const [parent, enableAnimations] = useAutoAnimate()

  const { data: todos = [] } = api.todo.getAll.useQuery({
    statuses: status === 'all' ? ['completed', 'pending'] : [status],
  })

  const { mutate: updateTodoStatus } = api.todoStatus.update.useMutation({
    onSuccess: () => {
      apiContext.todo.getAll.refetch()
    },
  })

  const { mutate: deleteTodo } = api.todo.delete.useMutation({
    onSuccess: () => {
      apiContext.todo.getAll.refetch()
    },
  })

  const handleCheckboxChange = (todoId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending'
    updateTodoStatus({ todoId, status: newStatus })
    enableAnimations(false)
  }

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo({ id: todoId })
    enableAnimations(false)
  }

  return (
      <ul className="grid grid-cols-1 gap-y-3 pt-10" ref={parent}>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div
              className={`flex items-center rounded-12 border border-gray-200 px-4 py-3 shadow-sm ${
                todo.status === 'completed' ? 'bg-[#F8FAFC]' : 'bg-white'
              }`}
            >
              <Checkbox.Root
                id={String(todo.id)}
                className="flex h-6 w-6 items-center justify-center rounded-6 border border-gray-300 focus:border-gray-700 focus:outline-none data-[state=checked]:border-gray-700 data-[state=checked]:bg-gray-700"
                checked={todo.status === 'completed'}
                onCheckedChange={() =>
                  handleCheckboxChange(todo.id, todo.status)
                }
              >
                <Checkbox.Indicator>
                  <CheckIcon className="h-4 w-4 text-white" />
                </Checkbox.Indicator>
              </Checkbox.Root>

              <label
                className={`block pl-3 font-medium ${
                  todo.status === 'completed'
                    ? 'text-gray-500 line-through'
                    : 'text-black'
                }`}
                htmlFor={String(todo.id)}
              >
                {todo.body}
              </label>
              <button
                className="ml-auto cursor-pointer"
                onClick={() => handleDeleteTodo(todo.id)}
                aria-label="Delete todo"
              >
                <XMarkIcon className="text-black h-6 w-6" />
              </button>
            </div>
          </li>
        ))}
      </ul>
  )
}

const XMarkIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}
