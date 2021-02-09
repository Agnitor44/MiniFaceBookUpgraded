import React, {useState, useEffect} from 'react'
import {
   useParams,
   useHistory
  } from "react-router-dom";
  import '../style/profile.css'
  import Av from '../images/aaaaa.png'
  import ProfileInfo from './ProfileInfo'
 
export default function Account() {
    const params = useParams()
    const [button, setButton] = useState({post: true, info: false, shares: false})
    const [profile, setProfile] = useState('')
    const [posts, setPosts] = useState('')
    
    const [shares, setShares] = useState('')
    const history = useHistory()
    useEffect(() => {
        fetch('/api/clientData/shouldBeHidden/butItsNot/BcsICantDoThisJustNow/ForgiveMe').then(data => data.json()).then(data => {
           const index =  data.findIndex(item=> item.id == params.code)
           if(!data[index]) return history.push('/')
            setProfile(data[index])
          
            fetch('/api/posts').then(data => data.json()).then(res => {
               const comments = data[index].comments
               const shares = data[index].shares
              setPosts(res.filter(item => item.authorId === data[index].id))


              const comm =  res.map(item =>  data[index].shares.filter(itemm => itemm.postId === item.postId))
                const co = comm.flat()
                
           const newComm = co.map(item => res.filter(itemm => itemm.postId === item.postId)).flat()
              
                setShares(newComm)
                
                
                
            

            })
        })
    }, [])

    return (
        <div className = 'profileAll'>
            <section className = 'profileInfo'>
                <div className ='infoWrapper'>
                <img src = {Av}/>
                <h1>{profile? profile.nick : null}</h1>
                <h2>{profile ?profile.email : null}</h2>
                </div>
                <div className = 'infoNavWrapper'>
                    <div className = 'butZone'>
                        <button onClick = {() => setButton({post:false, info: true, shares: false})}>Info</button>
                        <button onClick = {() => setButton({post:true, info: false, shares: false})}>Posts</button>
                        <button onClick = {() => setButton({post:false, info: false, shares: true})}>Shares</button>
                    </div>
                    <div className = 'ramka'></div>
                </div>
            </section>
            <ProfileInfo display = {button} shares = {shares} posts = {posts} id = {profile.id} /> 
        </div>
    )
}
