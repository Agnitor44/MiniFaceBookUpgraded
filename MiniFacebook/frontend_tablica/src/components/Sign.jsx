import React, {useRef} from 'react'
import '../style/login.css'
import {
    useHistory
   } from "react-router-dom";
   import {useDispatch, useSelector} from 'react-redux'
   import {headOff} from '../actions/HeaderOffAction'
   const url = '/api/clientData/shouldBeHidden/butItsNot/BcsICantDoThisJustNow/ForgiveMe'
export default function Sign() {
    const history = useHistory()
    const dispatch = useDispatch()
    const log = useSelector(state => headOff.state)
    const nickRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()
    const passTwoRef = useRef()
    const handleSub = (e) => {
        e.preventDefault()
        const mail = emailRef.current.value
        const nick = nickRef.current.value
        const pass = passRef.current.value
        const PassTwo = passTwoRef.current.value
        if(!pass || !nick || !mail || !PassTwo) return alert('Proszę wypełnić wszystkie pola')
        if(pass !== PassTwo) return alert('hasła są inne')
        fetch(url).
        then(data => data.json()).
        then(data => {
                const emailIs = data.findIndex(item => item.email === mail)
                const nickIs = data.findIndex(item => item.nick === nick)
                if(emailIs >= 0) return alert('Email jest już zajęty')
                if(nickIs >= 0) return alert('Nick jest już zajęty')
                const obj = {
                    email: mail,
                    nick: nick,
                    pass:pass,
                    likesPosts: [],
                    comments: [],
                    id: Date.now(),
                    shares: [],
                    info: null
                }
                fetch(url, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                  })})
           
             history.push('/login')
        }
    return (
        <div className = 'loginAll'>
        <div className = 'card'>
        <div className = 'back' onClick = {()=> {history.push('/'); dispatch(headOff())}}>X</div>
        <form onSubmit = {handleSub}>
            <h1 style = {{margin: '4%'}}>Zarejestruj Się!</h1>
            <h2>Nick</h2>
            <input  ref = {nickRef}/>
            <h2>Email</h2>
            <input type = 'email' ref = {emailRef} />
            <h2>Hasło</h2>
            <input type = 'password' ref = {passRef}/>
            <h2>Powtórz hasło</h2>
            <input type = 'password' ref = {passTwoRef}/>
            <button>Zarejestruj</button>
            </form>
            <h4 onClick = {() => {history.push('/login')}}>Mam konto</h4>
        </div>
    </div>
    )
}
