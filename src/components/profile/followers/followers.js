import React, { useEffect } from 'react'
import DefaultUser from '../../../img/defaultUser.jpg'
import { useParams, useHistory } from 'react-router-dom'
import { useHttp } from '../../../hooks/http-hook'
import { useAuth } from '../../../hooks/auth-hook'
import { connect } from 'react-redux'
import { setProfileData } from '../../../redux/reducers/profile.reducer'
import Spinner from '../../spinner/spinner'
import { serverURL } from '../../app/app'
import './followers.scss'

function Followers(props) {
    const { id } = useParams()
    const { request, loading } = useHttp()
    const auth = useAuth()
    const history = useHistory()

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
        <div className="profile__followers">
            {
                loading
                ? <Spinner />
                : props.profile.followers.length
                    ? props.profile.followers.map(el => {
                        return (
                            <div className="followers__item">
                                <img
                                    onClick={() => loadUser(el.id)}
                                    className="followers__item-img"
                                    src={el.img ? `data:image/png;base64,${el.img}` : DefaultUser}
                                    alt="sorry bro"
                                />
                                <span className="followers__item-name"> {el.userName ? el.userName : 'USER'} </span>
                            </div>
                        )
                    })
                    : <div className="followers__null">You haven't Followers</div>
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(Followers)