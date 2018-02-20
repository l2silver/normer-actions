
import { handleActions } from 'redux-actions'

const initialState = {
  entities: {
    todos: {
      [0]: {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    }
  },
  relationships: {
    pages: {
      todos: {
        home: [0],
      }
    }
  }
}

export default handleActions({
  'add todo entity' (state, action) {
    return {
      ...state,
      entities: {
        todos: {
          ...state.entities.todos,
          [action.payload.id]: action.payload
        }
      }
    }
  },

  'add home page relationship' (state, action) {
    return {
      ...state,
      relationships: {
        pages: {
          todos: {
            home: state.relationships.pages.todos.home.concat(action.payload)
          }
        }
      }
    }
  },

  'delete todo' (state, action) {
    return {
      ...state,
      relationships: {
        pages: {
          todos: {
            home: state.relationships.pages.todos.home.filter((id)=>id !== action.payload)
          }
        }
      }
    }
  },

  'edit todo' (state, action) {
    return {
      ...state,
      entities: {
        todos: {
          ...state.entities.todos,
          [action.payload.id]: {
            ...state.entities.todos[action.payload.id],
            text: action.payload.text
          }
        }
      }
    }
  },

  'complete todo' (state, action) {
    return {
      ...state,
      entities: {
        todos: {
          ...state.entities.todos,
          [action.payload]: {
            ...state.entities.todos[action.payload],
            completed: !state.entities.todos[action.payload].completed
          }
        }
      }
    }
  },

  'complete all' (state, action) {
    const validTodoIds = state.relationships.pages.todos.home
    const areAllMarked = validTodoIds.map((id)=>state.entities.todos[id]).every(todo => todo.completed)
    return {
      ...state,
      entities: {
        todos: validTodoIds.reduce((finalResult, id)=>{
          finalResult[id] = {
            ...state.entities.todos[id],
            completed: !areAllMarked,
          }
          return finalResult
        }, {})
      }
    }
  },
  'clear complete' (state, action) {
    const validTodoIds = state.relationships.pages.todos.home
    const validTodos = validTodoIds.map((id)=>state.entities.todos[id])
    return {
      ...state,
      relationships: {
        pages: {
          todos: {
            home: validTodos.filter(todo => todo.completed === false).map(todo=>todo.id)
          }
        }
      }
    }
  }
}, initialState)
