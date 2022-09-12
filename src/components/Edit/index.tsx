import { KeyboardEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { todoEdit } from '@/store/reducers/todo'
import './index.css'

export default function Edit() {
  const todos = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const id = useLocation().state as string
  const todo = todos.find(v => v.id === id)!

  const handleChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === 'enter') {
      dispatch(todoEdit({
        id,
        text: e.target.value
      }))
      navigate('/')
    }
  }
  return (
    <div className='wrap'>
      <input
        type="text"
        defaultValue={todo.text}
        onKeyUp={handleChange}
        className='input'
      />
    </div>
  )
}