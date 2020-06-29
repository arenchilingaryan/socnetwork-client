import React from 'react'
import { connect } from 'react-redux'
import './profile-info.scss'



function ProfileInfo(props) {
    const user = props.profile
    return (
        <div className="profileInfo">
            <div className="profileInfo__item">
                <p className="profileInfo__titles"> Email </p>
                <p> {user.email} </p>
            </div>
            <div className="profileInfo__item">
                <p className="profileInfo__titles"> Firstname </p>
                <p> {user.firstName} </p>
            </div>
            <div className="profileInfo__item">
                <p className="profileInfo__titles"> Lastname </p>
                <p> {user.lastName} </p>
            </div>
            <div className="profileInfo__item">
                <p className="profileInfo__titles"> Age </p>
                <p> {user.age} </p>
            </div>
            <div className="profileInfo__item">
                <p className="profileInfo__titles"> Birthday </p>
                <p> {user.birthday} </p>
            </div>
            <div className="profileInfo__item">
                <p className="profileInfo__titles"> About </p>
                <p> {user.about} </p>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps)(ProfileInfo)