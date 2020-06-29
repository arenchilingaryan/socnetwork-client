import React from 'react'
import { useAuth } from '../../hooks/auth-hook'
import { AuthContext } from '../../context/auth-context'
import { useRoutes } from '../routes/routes'
import { connect } from 'react-redux'
import { toggleMenu } from '../../redux/reducers/menu.reducer'
import Menu from '../menu/menu'
import './app.scss'

export const serverURL = 'https://obscure-dusk-00211.herokuapp.com'

function App(props) {

    const { token, login, logout, userId, email } = useAuth()

    const isAuthenticated = !!token
  
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{
            token, userId, email, login, logout, isAuthenticated
          }}>
            <Menu />
            <div className={ props.menu ? "App App__menu" : "App" }>
            <button onClick={props.toggleMenuBar} className="menu__btn">Menu</button>
                { routes }
            </div>
        </AuthContext.Provider>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
