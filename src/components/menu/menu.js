import React from 'react'
import { connect } from 'react-redux'
import { toggleMenu } from '../../redux/reducers/menu.reducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare, faUsers, faSignOutAlt, faIdCardAlt } from '@fortawesome/free-solid-svg-icons'
import './menu.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/auth-hook'

function Menu(props) {
    const auth = useAuth()
    const logoutHandler = () => {
        auth.logout()
        props.toggleMenuBar()
    }
    return (
        <div className="menuBar" style={props.menu ? { display: 'block' } : { display: 'none' }}>
            <button onClick={props.toggleMenuBar} className="menu__btn">Menu</button>
            <div className="menuBar__list">
                <NavLink onClick={props.toggleMenuBar} className="menu__link" to="/users">
                    <div className="menu__icon-container">
                        <FontAwesomeIcon className="menu__icon" icon={faUsers} />
                        <span className="menu__icon-desc">Users</span>
                        <FontAwesomeIcon className="menu__icon-hide" icon={faUsers} />
                    </div>
                </NavLink>
                <NavLink onClick={props.toggleMenuBar} className="menu__link" to="/messages">
                    <div className="menu__icon-container">
                        <FontAwesomeIcon className="menu__icon" icon={faEnvelopeSquare} />
                        <span className="menu__icon-desc">Messages</span>
                        <FontAwesomeIcon className="menu__icon-hide" icon={faEnvelopeSquare} />
                    </div>
                </NavLink>
                <NavLink onClick={props.toggleMenuBar} className="menu__link" to={`/profile`}>
                    <div className="menu__icon-container">
                        <FontAwesomeIcon className="menu__icon" icon={faIdCardAlt} />
                        <span className="menu__icon-desc">Profile</span>
                        <FontAwesomeIcon className="menu__icon-hide" icon={faIdCardAlt} />
                    </div>
                </NavLink>
                <button onClick={logoutHandler} className="menu__icon-container">
                    <FontAwesomeIcon className="menu__icon" icon={faSignOutAlt} />
                    <span className="menu__icon-desc">Sign Out</span>
                    <FontAwesomeIcon className="menu__icon-hide" icon={faSignOutAlt} />
                </button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        menu: state.menu.menu
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleMenuBar: () => dispatch(toggleMenu())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)