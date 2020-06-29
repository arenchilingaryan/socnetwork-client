import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { setProfileData } from '../../redux/reducers/profile.reducer'
import defaultUser from '../../img/defaultUser.jpg'
import { useHttp } from '../../hooks/http-hook'
import { setUsers } from '../../redux/reducers/users.reducer'
import { useAuth } from '../../hooks/auth-hook'
import Spinner from '../spinner/spinner'
import { useHistory } from 'react-router-dom'
import { setMyProfileData } from '../../redux/reducers/my.profile.reducer'
import { serverURL } from '../app/app'
import './users.scss'

function Users(props) {
    const { request, loading } = useHttp()
    const auth = useAuth()
    const history = useHistory()
    useEffect(() => {
        request(`${serverURL}/api/users/users`).then(res => props.setUsers(res.users))
    }, [])

    const loadUser = (id) => {
        history.push(`/profile/${id}`)
    }



    async function followHandler(id) {
        try {
            await request(`${serverURL}/api/useraction/follow`, 'POST', { userId: id, myId: auth.userId }, true)
            const data = await request(`${serverURL}/api/profile/getinfo`, 'POST', { userId: auth.userId }, true)
            props.setMyProfile(data.user)
        } catch (e) {
            throw new Error(e)
        }
    }
    async function unfollowHandler(id) {
        try {
            await request('/api/useraction/unfollow', 'POST', { userId: id, myId: auth.userId }, true)
            const data = await request(`${serverURL}/api/profile/getinfo`, 'POST', { userId: auth.userId }, true)
            props.setMyProfile(data.user)
        } catch (e) {
            throw new Error(e)
        }
    }


    return (
        <div className="users__wrapper">
            <div className="users__content">
                {
                    loading
                        ? <Spinner />
                        : <Fragment>
                            <ul className="users__list">
                                {
                                    props.users.map(el => {
                                        let idx = props.users.indexOf(el)
                                        return (
                                            <li key={idx} className="users__list-item">
                                                <img
                                                    onClick={() => loadUser(el.userId)}
                                                    className="users__item-img"
                                                    src={el.img ? `data:image/png;base64,${el.img}` : defaultUser}
                                                    alt={defaultUser} />
                                                <span> {el.userName ? el.userName : `user${idx}`} </span>
                                                <span> {el.firstName + ' ' + el.lastName} </span>
                                                <span> {el.age ? el.age : 'NONE'} </span>
                                                {
                                                    auth.userId !== el.userId
                                                        ? props.myProfile.following.some(i => {
                                                            return i.id === el.userId
                                                        })
                                                            ? <button
                                                                onClick={() => unfollowHandler(el.userId)}
                                                                className="users__button">
                                                                Unfollow
                                                                        </button>
                                                            : <button
                                                                onClick={() => followHandler(el.userId)}
                                                                className="users__button">
                                                                Follow
                                                                        </button>

                                                        : <div></div>
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Fragment>
                }

            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        users: state.users.users,
        myProfile: state.myProfile
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setUsers: (data) => dispatch(setUsers(data)),
        setProfile: (data) => dispatch(setProfileData(data)),
        setMyProfile: (data) => dispatch(setMyProfileData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)