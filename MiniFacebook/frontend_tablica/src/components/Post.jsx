import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useUpdateUser} from './updateUser'
import Av from '../images/aaaaa.png'
import '../style/home.css'
import '../style/post.css'
import Comments from './Comments'

import {Islogged, isLoggedOut} from '../actions/logAction'
import { NavLink, useParams } from 'react-router-dom'
export default function Post({post}) {

    const logged = useSelector(state => state.log)
    const [comsee, setComSee] = useState(false)
    const dis = useDispatch()
    const params = useParams()
    
    const giveLike = (lik, id) => {
        if(!logged) return alert('Nie zalogowany')
     
        
        const obj = {
            likes: lik,
            id: id,
            idUser: logged.id
        }
            
  fetch('/api/clientData/shouldBeHidden/butItsNot/BcsICantDoThisJustNow/ForgiveMe').then(data => data.json()).then(data => {
        
        const is = data.findIndex(item => item.id === logged.id)
        const have = data[is].likesPosts.findIndex(item => item === id)
      if(have>-1) { 
           fetch('/api/post/likeChange/delet', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      fetch('/api/user/likes/change/delet', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })  
    }
    else {
        fetch('/api/post/likeChange', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
          fetch('/api/user/likes/change', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
        }
    })  
        }
        const handleShare = () => {
          if(!logged) return alert(' nie zalogowany')
         const obj = {
            authorId: logged.id, 
            postId: post.postId
          }
          fetch('/api/clientData/shouldBeHidden/butItsNot/BcsICantDoThisJustNow/ForgiveMe').then(data => data.json()).then(data => {
            const index = data.findIndex(item => item.id === logged.id)
            if(data[index].shares.findIndex(item => item.postId === post.postId) > -1) return alert('już udostępniłeś')
          fetch('/api/user/shares', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
          })
      }
      const create = (cos) => {
        return `/account/${cos}`
      }
    return (
        <section className = 'post'>
            <div className = 'postInfo'> <img src = {Av}/> <div><h3><NavLink to = {create(post.authorId)}>{post.authorNick}</NavLink></h3> <span>{post.time}</span></div></div>
            <div className = 'likeTitle'><h1>{post.title}</h1><div><span>{post.likes}</span><i class="fas fa-thumbs-up"></i></div> </div>
            
            <article>
                <p>
                   {post.post}
                </p>
            </article>
            <div className = 'stats'>
                <div onClick = {giveLike.bind(this, post.likes, post.postId)}><a><i class="fas fa-thumbs-up"></i><h2>Like</h2></a></div>
                <div onClick ={() =>{ if(!logged)return alert('nie zalogowany');setComSee(prev => !prev)}} ><a><i class="fas fa-comment"></i><h2>Comment</h2></a></div>
                <div onClick = {handleShare}><a><i class="fas fa-share"></i><h2>Share</h2></a></div>

            </div>
           {comsee ? <Comments comments = {post.comments} postId = {post.postId}/> : null }
           </section>
    )
}
