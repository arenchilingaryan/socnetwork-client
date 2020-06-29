import React, { useEffect } from 'react'
import DefaultUser from '../../../img/defaultUser.jpg'
import { useParams, useHistory } from 'react-router-dom'
import { useHttp } from '../../../hooks/http-hook'
import { useAuth } from '../../../hooks/auth-hook'
import { connect } from 'react-redux'
import { setProfileData } from '../../../redux/reducers/profile.reducer'
import { setMyProfileData } from '../../../redux/reducers/my.profile.reducer'
import Spinner from '../../spinner/spinner'
import './following.scss'
import { serverURL } from '../../app/app'

function Following(props) {
    const { id } = useParams()
    const { request, loading } = useHttp()
    const auth = useAuth()
    const history = useHistory()

    async function unfollowHandler(id) {
        try {
            await request(`${serverURL}/api/useraction/unfollow`, 'POST', { userId: id, myId: auth.userId }, true)
            const data = await request(`${serverURL}/api/profile/getinfo`, 'POST', { userId: auth.userId }, true)
            props.setMyProfile(data.user)
            props.setProfile(data.user)
        } catch (e) {
            throw new Error(e)
        }
    }

    useEffect(() => {
        if (!id) {
            if (auth.userId) {
                request(`${serverURL}/api/profile/getinfo`, 'POST', { userId: auth.userId }, true)
                    .then(data => props.setProfile(data.user))
            }
        } else {
            request(`${serverURL}/api/profile/getinfo`, 'POST', { userId: id }, false)
                .then(data => props.setProfile(data.user))
        }
    }, [auth.userId])

    const loadUser = (id) => {
        history.push(`/profile/${id}`)
    }


    return (
        <div className="profile__following">
            {
                loading
                    ? <Spinner />
                    : props.myProfile.following.map(el => {
                        return (
                            <div key={el.id} className="following__item">
                                <img
                                    onClick={() => loadUser(el.id)}
                                    className="following__item-img"
                                    src={el.img ? `data:image/png;base64,${el.img}` : DefaultUser} alt="sorry bro :'("
                                />
                                <span className="following__item-name"> {el.userName ? el.userName : 'USER'} </span>
                                <button onClick={() => unfollowHandler(el.id)} className="following__unfollow-btn">Unfollow</button>
                            </div>
                        )
                    })
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        profile: state.profile,
        myProfile: state.myProfile
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setProfile: (data) => dispatch(setProfileData(data)),
        setMyProfile: (data) => dispatch(setMyProfileData(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Following)