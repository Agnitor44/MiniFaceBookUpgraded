import React, {useRef, useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import '../style/commentsContainer.css'
import Comment from './Comment'
function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function time() {
    const d = new Date();
    const x = document.getElementById("demo");
    const h = addZero(d.getHours());
    const m = addZero(d.getMinutes());
    const s = addZero(d.getSeconds());
    return `${h}:${m}:${s}`
  }



export default function Comments({comments, postId}) {
    const inpRef = useRef()
    const log = useSelector(state => state.log)
 

   

    const handleSub = (e) => {
        
        e.preventDefault()
        if(!inpRef.current.value) return alert('napisz komentarz')
        
        const obj = {
            comTxt: inpRef.current.value,
            author:  log.nick,
            authorId: log.id,
            postId: postId,
            time: time()
        } 
       
       
        fetch('/api/comment/add', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        fetch('/api/comment/addToUser', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        inpRef.current.value = ''
      
    }
    const listCom = comments.map(item => <Comment com = {item} />) // może bedzie potrzebny oddzielny fetch
    return (
        <div className = 'comContainer'>
         <form onSubmit = {handleSub}>
             <div>
            <input ref = {inpRef}/>
            <button>Dodaj</button>
            </div> 
        </form>
        
        {listCom}
        </div>
    )
}
