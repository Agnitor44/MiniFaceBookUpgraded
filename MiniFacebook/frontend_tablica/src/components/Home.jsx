import React, {useEffect, useState} from 'react'
import '../style/home.css'

import Post from './Post'
export default function Home() {
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        fetch('/api/posts').then(data => data.json()).then(data => setPosts(data))
    })
    const list = posts ? posts.map(item => <Post post = {item}/>) : null
    return (
        <div className = 'postContainer'>
            {list}
        </div>
        
    )
}
