import React from 'react'
import { connect } from 'react-redux';
import ChatHeader from './chat-header/chat-header';
import ChatDialogs from './chat-dialogs/chat-dialogs';
import ChatPage from './chat-page/chat-page';
import { Route } from 'react-router-dom'
import './chat.scss'

function Messages(props) {
  return (
    <div className="messages__wrapper">
      <ChatHeader />
      <div className="messages__content">
        <Route exact path="/messages" component={ChatDialogs} />
        <Route path="/messages/dialog" component={ChatPage} />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    myProfile: state.myProfile
  }
}

export default connect(mapStateToProps)(Messages)