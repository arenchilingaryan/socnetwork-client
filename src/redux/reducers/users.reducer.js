export { };

const initialState = {
    users: []
}

export const setUsers = (users) => ({ type: 'SET_USERS', users })


export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USERS': {
            return {
                users: action.users
            }
        }
        default: return state
    }
}