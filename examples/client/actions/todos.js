import { createAction } from 'redux-actions'
import addTodo from './er'

export const deleteTodo = createAction('delete todo')
export const editTodo = createAction('edit todo')
export const completeTodo = createAction('complete todo')
export const completeAll = createAction('complete all')
export const clearCompleted = createAction('clear complete')

export {
  addTodo
}