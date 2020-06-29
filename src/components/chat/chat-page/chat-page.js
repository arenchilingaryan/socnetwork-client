import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import DefaultUser from '../../../img/defaultUser.jpg'
import { useAuth } from '../../../hooks/auth-hook'
import { addCurrentMessage } from '../../../redux/reducers/dialogs.reducer'
import io from 'socket.io-client'
import './chat-page.scss'


const socket = io('https://obscure-dusk-00211.herokuapp.com/')


function ChatPage(props) {
  const [msg, setMsg] = useState('')
  const auth = useAuth()

  useEffect(() => {
    if (props.currentDialogId) {
      socket.emit('join', { room: props.currentDialogId })
      socket.on('sending', msg => {
        props.addCurrentMessage(msg)
      })
    }
  }, [props.currentDialogId])

  const changeHandler = (e) => {
    setMsg(e.target.value)
  }

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('new message', { message: msg, id: auth.userId })
    props.addCurrentMessage({ message: msg, id: auth.userId })
    setMsg('')
  }

  return (
    <div>
      <div className="messages__chat">
        <h1 className="message__chat-name">
          {props.currentUser.firstName ? props.currentUser.firstName + ' ' + props.currentUser.lastName : 'user'}
        </h1>
        <div className="chatMessages">
          {
            props.currentMessages.map(el => {
              return (
                <li className={el.id === auth.userId ? "messages__item-message-me" : "messages__item-message"}>
                  <img className={el.id === auth.userId ? 'messages__img-chat-me' : 'messages__img-chat'}
                    src={el.id === auth.userId
                      ? `data:image/png;base64,${props.myProfile.img}` :
                      props.currentUser.img.length ? `data:image/png;base64,${props.currentUser.img}` : DefaultUser}
                    alt={DefaultUser} />
                  <div className={el.id === auth.userId ? "messages__chat-msg-me" : "messages__chat-msg"}> {el.message} </div>
                </li>
              )
            })
          }
        </div>
        <form className="messages__form" onSubmit={sendMessage}>
          <input className="messages__sendInput" onChange={changeHandler} type="text" value={msg} />
          <button className="messages__chat-btn">Send</button>
        </form>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    myProfile: state.myProfile,
    currentMessages: state.dialogs.currentMessages,
    currentUser: state.dialogs.currentUser,
    currentDialogId: state.dialogs.currentDialogId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCurrentMessage: (obj) => dispatch(addCurrentMessage(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
