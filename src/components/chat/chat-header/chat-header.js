import React from 'react'
import { connect } from 'react-redux'
import DefaultUser from '../../../img/defaultUser.jpg'
import { useHistory } from 'react-router-dom'
import './chat-header.scss'


function ChatHeader(props) {
  const history = useHistory()

  const openProfileHandler = () => {
    history.push('/profile')
  }
  return (
    <div>
      <header className="messages__header">
        <div className="menu"></div>
        <div className="messages__personal" onClick={openProfileHandler}>
          <span>
            {props.myProfile.userName ? props.myProfile.userName : 'USER'}
          </span>
          <img className="messages__img"
            src={props.myProfile.img ? `data:image/png;base64,${props.myProfile.img}` : DefaultUser}
            alt={DefaultUser} />
        </div>
      </header>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    myProfile: state.myProfile
  }
}

export default connect(mapStateToProps)(ChatHeader)