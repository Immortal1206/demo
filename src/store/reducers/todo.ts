import { createSlice, PayloadAction  } from '@reduxjs/toolkit'

type todo = {
  id: string,
  text: string,
  completed: boolean
}
const initialState: todo[] = JSON.parse(localStorage.getItem('todos')!) ||[
  { id: '000', text: '吃饭', completed: false},
  { id: '001', text: '睡觉', completed: true},
  { id: '002', text: '写代码', completed: false},
  { id: '003', text: '编程', completed: false},
  { id: '004', text: 'coding', completed: true},
]
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<todo>) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      })
    },
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    todoDelete(state, action: PayloadAction<string>) {
      const todoIndex = state.findIndex(todo => todo.id === action.payload)
      if (todoIndex) {
        state.splice(todoIndex, 1)
      }
    },
    todoEdit(state, action: PayloadAction<Omit<todo, 'completed'>>) {
      const todo = state.find(todo => todo.id === action.payload.id)
      if (todo) {
        todo.text = action.payload.text
      }
    }
  }
})
export const { todoAdded, todoToggled, todoDelete, todoEdit } = todosSlice.actions
export default todosSlice.reducer
