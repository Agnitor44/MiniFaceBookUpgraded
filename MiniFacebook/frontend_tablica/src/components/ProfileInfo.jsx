import React, {useEffect, useState} from 'react'
import Av from '../images/aaaaa.png'
import {
   NavLink
   } from "react-router-dom";
   import InfoTxt from './InfoTxt'
export default function ProfileInfo({display, shares, posts, id}) {


    return (
        <div>
            {display.post ? 
         
               posts ?  posts.map(post  =>
                 { return (
                    
                    <section className = 'post'>
                    <div className = 'postInfo'> <img src = {Av}/> <div><h3>{post.authorNick}</h3> <span>{post.time}</span></div></div>
                    <div className = 'likeTitle'><h1>{post.title}</h1><div><span>{post.likes}</span><i class="fas fa-thumbs-up"></i></div> </div>
                    
                    <article>
                        <p>
                           {post.post}
                        </p>
                    </article>
                
             
                   </section>


                   )

                 }) : null
        
            : null}








            {display.info ? 
            
            <InfoTxt id = {id} />
            
            :null}
            {display.shares ? 
             shares ?  shares.map(post  =>
                { return (
                   
                   <section className = 'post'>
                   <div className = 'postInfo'> <img src = {Av}/> <div><h3>{post.authorNick}</h3> <span>{post.time}</span></div></div>
                   <div className = 'likeTitle'><h1>{post.title}</h1><div><span>{post.likes}</span><i class="fas fa-thumbs-up"></i></div> </div>
                   
                   <article>
                       <p>
                          {post.post}
                       </p>
                   </article>
               
            
                  </section>


                  )

                }) : null
            
            
            : null}
        </div>
    )
}
