export { }

const initialState = {
    dialogs: [],
    currentMessages: [],
    currentUser: [],
    currentDialogId: ''
}

export const setDialogs = (data) => ({ type: 'SET_DIALOGS', data })
export const setCurrentMessages = (messages) => ({ type: 'SET_CURRENT_MESSAGES', messages })
export const setCurrentUser = (user) => ({type: 'SET_CUURENT_USER', user})
export const setCurrentDialogId = (id) => ({type: 'SET_CURRENT_DIALOG_ID', id})
export const addCurrentMessage = (obj) => ({type: 'ADD_CURRENT_MESSAGE', obj})


export default function dialogsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_DIALOGS': {
          return {
            ...state,
            dialogs: [...state.dialogs, action.data]
          }
        }
        case 'SET_CURRENT_MESSAGES': {
          return {
            ...state,
            currentMessages: action.messages
          }
        }
        case 'SET_CUURENT_USER': {
          return {
            ...state,
            currentUser: action.user
          }
        }
        case 'SET_CURRENT_DIALOG_ID': {
          return {
            ...state,
            currentDialogId: action.id
          }
        }
        case 'ADD_CURRENT_MESSAGE': {
          const newMessageArr = [...state.currentMessages, action.obj]
          return {
            ...state,
            currentMessages: newMessageArr
          }
        }
        default: return state
    }
}