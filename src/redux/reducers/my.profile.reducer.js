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

export const setMyProfileData = (data) => ({ type: 'SET_MY_PROFILE_DATA', data })


export default function myProfileReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MY_PROFILE_DATA': {
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
        default: return state
    }
}