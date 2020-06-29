import React, { useEffect, Fragment, useState } from 'react'
import defaultUser from '../../img/defaultUser.jpg'
import { NavLink, Route, useParams } from 'react-router-dom'
import Followers from './followers/followers'
import Following from './following/following'
import { useHttp } from '../../hooks/http-hook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFileUpload, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { setProfileData, updateProfileImg } from '../../redux/reducers/profile.reducer'
import { useAuth } from '../../hooks/auth-hook'
import ProfileInfo from './profile-info/profile-info'
import Spinner from '../spinner/spinner'
import { serverURL } from '../app/app'
import './profile.scss'

function Profile(props) {
    const { request, loading } = useHttp()
    const { id, detail } = useParams()
    const auth = useAuth()
    const [modalWin, setModalWin] = useState(false)
    const [modalWinMessage, setModalWinMessage] = useState('')


    useEffect(() => {
        if (!id && !detail) {
            if (auth.userId) {
                request(`${serverURL}/api/profile/getinfo`, 'POST', { userId: auth.userId }, true)
                    .then(data => props.setProfile(data.user))
            }
        } else if (id && id !== 'followers' && id !== 'following') {
            request(`${serverURL}/api/profile/getinfo`, 'POST', { userId: id }, false)
                .then(data => props.setProfile(data.user))
        }

    }, [auth.userId, id, detail, request])

    const handleFileSelect = (evt) => {
        const f = evt.target.files[0]
        const reader = new FileReader()
        reader.onload = (function (theFile) {
            return async function (e) {
                var binaryData = e.target.result
                const base64String = window.btoa(binaryData)
                try {
                    const imgReq = await request(
                        `${serverURL}/api/profile/updateimg`,
                        'POST',
                        { userId: auth.userId, img: base64String },
                        true
                    )
                    if (!imgReq) {
                        return console.log('poka')
                    } else {
                        props.updateImg(base64String)
                    }

                } catch (e) {
                    throw new Error(e)
                }
            }
        })(f)
        if (!f) {
            return null
        }
        reader.readAsBinaryString(f)
    }

    const changeModalMessage = (e) => {
        setModalWinMessage(e.target.value)
    }

    const sendMessage = (id) => {
        request(`${serverURL}/api/profile/message`, 'POST', { userId: id, id: auth.userId, message: modalWinMessage }, true)
        setModalWin(false)
    }

    return (
        <div className="profile__wrapper">
            <div className="profile__container">
                {
                    loading
                        ? <Spinner />
                        : <Fragment>
                            <div className="profile__modal" style={modalWin ? { display: 'block' } : { display: 'none' }}>
                                <form onSubmit={() => sendMessage(id)} className="profile__modal-inside">
                                    <input type="text" className="profile__modal-input" onChange={changeModalMessage} />
                                    <div className="profile__modal-btns">
                                        <button className="profile__modal-btn" onClick={() => setModalWin(false)}>Cancel</button>
                                        <button className="profile__modal-btn" onClick={() => sendMessage(id)}>Send</button>
                                    </div>
                                </form>
                            </div>
                            <div className="profile__header">
                                <div className="profile__img-content">
                                    <img
                                        className="profile__img"
                                        src={props.profile.img ? `data:image/png;base64,${props.profile.img}` : defaultUser}
                                        alt={defaultUser} />
                                    <div
                                        className="profile__image-upload"
                                        style={id || !auth.token ? { display: 'none' } : { display: 'block' }}>
                                        <label htmlFor="file-input">
                                            <FontAwesomeIcon
                                                style={!id ? { display: 'block' } : { display: 'none' }}
                                                className="profile__uploadIcon"
                                                icon={faFileUpload}
                                            />
                                        </label>
                                        <input onChange={handleFileSelect} className="file-input" id="file-input" type="file" />
                                    </div>
                                </div>
                                <div className="profile__header-info">
                                    <h3> {props.profile.userName} </h3>
                                </div>
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    style={id && id !== 'following' && id !== 'followers' ? { display: 'block' } : { display: 'none' }}
                                    className="profile__messageIcon"
                                    onClick={() => setModalWin(true)}
                                />
                                <NavLink to="/edit">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="profile__edit-icon"
                                        style={!id ? { display: 'block' } : { display: 'none' }}
                                    />
                                </NavLink>
                            </div>
                            <div className="profile__stats">
                                <div className="profile__followers-num">
                                    <p>Followers</p>
                                    <h1>
                                        <NavLink
                                            className="profile__stats-item"
                                            to={`/profile/followers`}
                                        >
                                            {props.profile.followers.length}
                                        </NavLink>
                                    </h1>
                                </div>
                                <div className="profile__following-num">
                                    <p>Following</p>
                                    <h1>
                                        <NavLink
                                            className="profile__stats-item"
                                            to={`/profile/following`}
                                        >
                                            {props.profile.following.length}
                                        </NavLink>
                                    </h1>
                                </div>
                            </div>
                            <div className="profile__content">
                                <Route path="/profile/:id?/followers" component={Followers} />
                                <Route path="/profile/:id?/following" component={Following} />
                                <Route path="/profile/:id?" exact component={ProfileInfo} />
                            </div>
                        </Fragment>
                }

            </div>
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
        setProfile: (data) => dispatch(setProfileData(data)),
        updateImg: (img) => dispatch(updateProfileImg(img))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)