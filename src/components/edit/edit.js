import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setProfileData } from '../../redux/reducers/profile.reducer'
import { useHttp } from '../../hooks/http-hook'
import Spinner from '../spinner/spinner'
import './edit.scss'
import { useAuth } from '../../hooks/auth-hook'
import { serverURL } from '../app/app'

function EditPage(props) {
    const auth = useAuth()
    const { request, loading, error } = useHttp()

    const [form, setForm] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        birthday: '',
        age: '',
        about: '',
        userId: ''
    })

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const editSubmitHandler = async (e) => {
        e.preventDefault()
        const newForm = {...form, userId: auth.userId}
        const data = await request(`${serverURL}/api/profile/updateinfo`, 'POST', { ...newForm }, true)
        props.setProfile(data.user)
        auth.login(auth.token, auth.userId, auth.email, props.profile.userName)

    }

    return (
        <div className="editPage__wrapper">
            <form onSubmit={editSubmitHandler} className="editPage">
                <h1 style={error ? { display: 'block' } : { display: 'none' }} >Error!</h1>
                <label htmlFor="userName">Username</label>
                <input onChange={changeHandler} className="editPage__input" type="text" name="userName" />
                <label htmlFor="firstName">Firstame</label>
                <input onChange={changeHandler} className="editPage__input" type="text" name="firstName" />
                <label htmlFor="lastName">Lastname</label>
                <input onChange={changeHandler} className="editPage__input" type="text" name="lastName" />
                <label htmlFor="birthday">Birthday</label>
                <input onChange={changeHandler} className="editPage__input" type="text" name="birthday" />
                <label htmlFor="age">Age</label>
                <input onChange={changeHandler} className="editPage__input" type="text" name="age" />
                <label htmlFor="about">About</label>
                <input onChange={changeHandler} className="editPage__input" type="text" name="about" />
                {
                    loading
                        ? <Spinner />
                        : <button className="editPage__button">Edit</button>
                }
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setProfile: (data) => dispatch(setProfileData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage)