import React, {useRef} from 'react'
import {useSelector} from 'react-redux'
import '../style/addField.css'

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
  
  return `${h}:${m}`
}

export default function Add() {
    const LogStatus = useSelector(state => state.log)
    const postRef = useRef()
    const titleRef = useRef()
    const handleSub = (e) => {
      e.preventDefault()
      const obj = {
        authorId: LogStatus.id,
        authorNick: LogStatus.nick,
        post: postRef.current.value,
        title: titleRef.current.value,
        likes: 0,
        comments: [],
        time: time(),
        postId: Date.now()+'post'
      }
      console.log(obj)
      fetch('/api/posts', {
        method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                  })
                  postRef.current.value = ''
                  titleRef.current.value = ''
      return alert('Post został wstawiony')
      
    }
    return (
      LogStatus ?
        <div className = 'addField'>
          <form onSubmit = {handleSub}>
            <h1>Dodaj post</h1>
              <h2>Tytuł</h2>
              <input ref = {titleRef}/>
              <h2>Text</h2>
              <textarea  ref = {postRef}/>
              <button>Dodaj</button>
          </form>
        </div>
        : 
        <h2>Zaloguj się aby dodać post</h2>
    
    )
}
