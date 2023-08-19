import { createStore, bindActionCreators, combineReducers } from 'redux'

function todoReducer(state = [], action) {
    if (action.type === 'add_todo') {
        const todoText = action.payload.todoText
        return [
            ...state, { text: todoText, isFinished: false, id: (state.length === 0) ? 1 : state[state.length - 1].id + 1 }
        ]
    } else if (action.type === 'edit_todo') {
        const todoId = action.payload.todoId
        const todoText = action.payload.todoText

        return state.map(t => {
            if (t.id === todoId) {
                t.text = todoText
            }
            return t
        })
    } else if (action.type === 'delete_todo') {
        const todoId = action.payload.todoId
        return state.filter(t => t.id !== todoId)
    }
    return state
}
function userReducer(state = [], action) {
    if (action.type === 'add_user') {
        const userName = action.payload.userName
        return [
            ...state, { name: userName, id: (state.length === 0) ? 1 : state[state.length - 1].id + 1 }
        ]
    }
    return state
}
const reducer = combineReducers({ todo: todoReducer, user: userReducer })
const { dispatch, subscribe, getState, replaceReducer } = createStore(reducer)

subscribe(() => console.log(getState()))
const addTodo = (todoText) => ({ type: 'add_todo', payload: { todoText } })

const actions = bindActionCreators({ addTodo }, dispatch)
actions.addTodo("todo 1")
actions.addTodo("todo 2")
actions.addTodo("todo 3")
dispatch({ type: 'edit_todo', payload: { todoId: 1, todoText: "todo" } })
dispatch({ type: 'delete_todo', payload: { todoId: 2 } })
