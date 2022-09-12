import { KeyboardEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { todoAdded, todoToggled, todoDelete} from '@/store/reducers/todo'
import './index.css'


export default function Home() {

  const todos = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const keyupHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    
    if (e.key.toLowerCase() === 'enter') {
      const len = todos.length.toString().padStart(3, '0')
      dispatch(todoAdded({
        id: len,
        text: e.target.value,
        completed: false
      }))
      e.target.value = ''
    }
  }
  const clickHandler = (e: ChangeEvent, id: string) => {
    dispatch(todoToggled(id))
  }
  return (
    <div className='wrap'>
      <h1>todos</h1>
      <div className='add'>
        <input 
          className='add-input'
          type="text"
          placeholder='press enter to add a todo'
          onKeyUp={keyupHandler}
        />
      </div>
      <ul className='todos'>
        {
          todos.map(v => (
            <li key={v.id} className='todo'>
              <div style={{textDecoration: v.completed ? 'line-through' : 'none'}}>
                <input
                  type="checkbox"
                  defaultChecked={v.completed}
                  className='todo-is-completed'
                  onChange={(e) => clickHandler(e, v.id)}
                />
                {v.text}
              </div>
              <button onClick={() => {navigate('/edit', { state: v.id })}}>edit</button>
            </li>))
        }
      </ul>
    </div>
  )
}