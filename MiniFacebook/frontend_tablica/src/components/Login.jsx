import React, {useRef} from 'react'
import '../style/login.css'
import {
     useHistory
    } from "react-router-dom";
import Sign from './Sign'
import {useDispatch, useSelector} from 'react-redux'
import {headOff} from '../actions/HeaderOffAction'
import {Islogged} from '../actions/logAction'
const url = '/api/clientData/shouldBeHidden/butItsNot/BcsICantDoThisJustNow/ForgiveMe'
export default function Login() {
    const history = useHistory()
    const dispatch = useDispatch()
    const log = useSelector(state => headOff.state)
    const emailRef = useRef()
    const passRef = useRef()
    
    const handleSub = (e) => {
        e.preventDefault()
        let obj 
        const mail = emailRef.current.value
        const pass = passRef.current.value
        fetch(url).then(data => data.json()).then(data => {
            const emailId = data.findIndex(item => item.email === mail)
            if(emailId < 0) return alert('Nie ma takiego emaila')
            const shouldBePass = data[emailId].pass
            if(shouldBePass !== pass) return alert(' nieprawidłowe hasło')
            obj = data[emailId]
            dispatch(Islogged(data[emailId]))
            dispatch(headOff())
            history.push('/')
        })
    } 
    return (
      
        <div className = 'loginAll'>
            <div className = 'card'>
                <div className = 'back' onClick = { ()=> {history.push('/'); dispatch(headOff()) }}>X</div>
                <form onSubmit = {handleSub}>
                <h1>Zaloguj Się!</h1>
                <h2>Email</h2>
                <input  ref = {emailRef}/>
                <h2>Hasło</h2>
                <input type = 'password' ref = {passRef}/>
                <button>Zaloguj</button>
                </form>
                <h4 onClick = {() => {history.push('/signin')}}>Nie masz konta?</h4>
            </div>
        </div>
    )
}
