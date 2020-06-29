export { };

const initialState = {
    userId: '',
    img: '',
    userName: '',
    birthday: '',
    email: '',
    about: '',
    age: '',
    followers: [],
    following: [],
    firstName: '',
    lastName: '',
    dialogs: []
}

export const setProfileData = (data) => ({ type: 'SET_PROFILE_DATA', data })
export const updateProfileData = (form) => ({ type: 'UPDATE_PROFILE_DATA', form })
export const updateProfileImg = (img) => ({ type: 'UPDATE_PROFILE_IMG', img })


export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_PROFILE_EDIT':
            return { ...state, edit: !state.edit }
        case 'SET_PROFILE_DATA': {
            const { userId, birthday, email, about, age, userName, img, firstName, lastName, followers, following, dialogs } = action.data
            return {
                ...state,
                userId,
                firstName,
                lastName,
                img,
                userName,
                birthday,
                email,
                followers,
                following,
                about,
                age,
                dialogs
            }
        }
        case 'UPDATE_PROFILE_DATA': {
            const { birthday, about, age, userName } = action.form
            return {
                ...state,
                userName,
                birthday,
                about,
                age
            }
        }
        case 'UPDATE_PROFILE_IMG': {
            return { ...state, img: action.img }
        }

        default: return state
    }
}