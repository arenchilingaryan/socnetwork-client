import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { useHttp } from '../../../hooks/http-hook'
import { setDialogs, setCurrentMessages, setCurrentUser, setCurrentDialogId, deleteDialogs } from '../../../redux/reducers/dialogs.reducer'
import io from 'socket.io-client'
import Spinner from '../../spinner/spinner'
import { useHistory } from 'react-router-dom'
import { serverURL } from '../../app/app'
import './chat-dialogs.scss'

io('https://obscure-dusk-00211.herokuapp.com/')


function ChatDialogs(props) {
  const { request, loading } = useHttp()
  const history = useHistory()

  const dialogsMount = useCallback(
    () => {
      props.deleteDialogs()
      props.myProfile.dialogs.map(async el => {
        console.log('lol')
        const data = await request(`${serverURL}/api/profile/getinfo`, 'POST', { userId: el.with }, true)
        const dialogObj = { ...data.user, dialogId: el.id }
        props.setDialogs(dialogObj)
      })
    },
    [request],
  )

  useEffect(() => {
    dialogsMount()
  }, [props.myProfile, dialogsMount])

  const loadMessages = async (dialogId, userId) => {
    try {
      const data = await request(`${serverURL}/api/dialogs/getdialog`, 'POST', { id: dialogId }, true)
      const user = await request(`${serverURL}/api/profile/getinfo`, 'POST', { userId }, true)
      props.setCurrentUser(user.user)
      props.setCurrentDialog(data.messages)
      props.setCurrentDialogId(dialogId)
      history.push('/messages/dialog')
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <div>
      <div className="messages__contacts">
        <h2 className="messages__contacts-title">Dialogs</h2>
        {
          loading
            ? <Spinner />
            : <ul>
              {
                props.dialogs.dialogs.map(el => {
                  return (
                    <li key={el.dialogId} onClick={() => loadMessages(el.dialogId, el.userId)} className="messages__contact-item">
                      <span > {el.firstName + ' ' + el.lastName} </span>
                    </li>
                  )
                })
              }
            </ul>
        }
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    myProfile: state.myProfile,
    dialogs: state.dialogs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDialogs: (data) => dispatch(setDialogs(data)),
    setCurrentDialog: (currentDate) => dispatch(setCurrentMessages(currentDate)),
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setCurrentDialogId: (id) => dispatch(setCurrentDialogId(id)),
    deleteDialogs: () => dispatch(deleteDialogs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatDialogs)