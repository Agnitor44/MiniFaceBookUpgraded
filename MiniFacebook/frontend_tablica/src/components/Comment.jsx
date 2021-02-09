import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import Av from '../images/aaaaa.png'
export default function Comment({com}) {
 

    const log = useSelector(state => state.log)
    const warunek = log.id === com.authorId
    const deleteCom = () => {
      
        const obj = {
            authorId: com.authorId,
            postId: com.postId,
           time: com.time,
           comTxt: com.comTxt,
           author: com.author
       

        }
        fetch('/api/comment/user/delet', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        fetch('/api/comment/delet', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
      
    }
    return (
       <div className = 'comment'>
           {warunek ? <button onClick= {deleteCom} className = 'deletCom'>Usuń</button> : null}
           <div className = 'infoComment'>
           <img src = {Av}/>
           <div className = 'cos'>
           <h2>{com.author}</h2>
           <h4>{com.time}</h4>
           </div>
           </div>
           <article style = {{margin: 0, marginBottom: '3%' }}><p>{com.comTxt}</p></article>
       
        </div>
      
    )
}
