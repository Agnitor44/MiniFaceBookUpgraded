import React, {useState} from 'react'
import {
  Route,
   Switch,
   NavLink,
   useHistory
  } from "react-router-dom";
  import '../style/header.css'
  import Sign from './Sign'
  import Login from './Login'
  import {useDispatch, useSelector} from 'react-redux'
  import {headOff} from '../actions/HeaderOffAction'
  import {isLoggedOut} from '../actions/logAction'
  import Av from '../images/aaaaa.png' 
export default function Header() {
 
  const dispatch = useDispatch()
  const log = useSelector(state => state.headOff)
  const isLogged = useSelector(state => state.log)
  const history = useHistory()
  const myacc = isLogged ? `/account/${isLogged.id}` : null
    return (
     !log ?
    
        <nav className = "Nawigacja">
           <ul>
               <li><NavLink activeStyle = {{backgroundColor: '#5d5da7'}} exact to = '/'>Home</NavLink></li>
               <li><NavLink activeStyle = {{backgroundColor: '#5d5da7'}} to = '/news'>News</NavLink></li>
               <li><NavLink activeStyle = {{backgroundColor: '#5d5da7'}} to = '/add'>Add</NavLink></li>
    {isLogged ? <li className = 'goli'><img src = {Av}/><NavLink className = 'go' style ={{textDecoration: 'underLine'}} to = {myacc}>{isLogged.nick}</NavLink>
                  <ul  className = 'extend'>
                  
                    <li><NavLink onClick = {() => dispatch(isLoggedOut())} to = '/'>LogOut</NavLink></li>
                  </ul>
    </li> : <button onClick = {() => {history.push('/login'); dispatch(headOff())}}>Log In</button> }
           </ul>
          
        </nav>
        :
        <Switch>
        <Route path = '/login' component = {Login}></Route>
        <Route path = '/signin' component = {Sign}></Route>
        </Switch>



       
      
    )
}
