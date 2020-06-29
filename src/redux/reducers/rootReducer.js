import { combineReducers } from 'redux'
import profileReducer from './profile.reducer'
import menuReducer from './menu.reducer'
import usersReducer from './users.reducer'
import myProfileReducer from './my.profile.reducer'
import dialogsReducer from './dialogs.reducer'

export default combineReducers({
    profile: profileReducer,
    menu: menuReducer,
    users: usersReducer,
    myProfile: myProfileReducer,
    dialogs: dialogsReducer
})
