export { };

const initialState = {
    menu: false
}

export const toggleMenu = () => ({ type: 'TOGGLE_MENU' })


export default function menuReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_MENU': {
            return {
                menu: !state.menu
            }
        }
        default: return state
    }
}