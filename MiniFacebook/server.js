const express = require('express')
const fs = require('fs')

const app = express()
const data = fs.readFileSync('data.json')
const users = JSON.parse(data)
const post = fs.readFileSync('posts.json')
const dataPostIn = JSON.parse(post)
app.use(express.json())

app.get('/api/clientData/shouldBeHidden/butItsNot/BcsICantDoThisJustNow/ForgiveMe', (req, res) => {
    res.json(JSON.parse(data))
    res.end()
})
app.get('/api/posts', (req, res) => {
    res.json(dataPostIn)
    res.end()
}
    )
app.post('/api/clientData/shouldBeHidden/butItsNot/BcsICantDoThisJustNow/ForgiveMe', (req, res) => {
 
  
    const usersNew = [...users, req.body]
    const newJson = JSON.stringify(usersNew)
  fs.writeFileSync('data.json', newJson)
  res.end()
})
app.post('/api/posts', (req, res) => {
    const postNew = [...dataPostIn, req.body]
    const newJson = JSON.stringify(postNew)
    fs.writeFileSync('posts.json', newJson)
    res.end()
})
app.put('/api/post/likeChange', (req, res) => {
const odp = req.body
const newPostsId = [...dataPostIn].findIndex(item => item.postId === odp.id)
const newPost = [...dataPostIn]
newPost[newPostsId].likes = odp.likes + 1

const newJson = JSON.stringify(newPost)
fs.writeFileSync('posts.json', newJson)
res.end()


})
app.put('/api/user/likes/change', (req, res) => {
    const idPost = req.body.id
    const idUser = req.body.idUser
    const userFindId = [...users].findIndex(item => item.id === idUser)
   const dataReplica = [...users]
    dataReplica[userFindId].likesPosts.push(idPost)

  const newJson = JSON.stringify(dataReplica)
  fs.writeFileSync('data.json', newJson)
  res.end()
})
app.put('/api/post/likeChange/delet', (req, res) => {
    const odp = req.body
    const newPostsId = [...dataPostIn].findIndex(item => item.postId === odp.id)
    const newPost = [...dataPostIn]
    newPost[newPostsId].likes = odp.likes - 1

    const newJson = JSON.stringify(newPost)
    fs.writeFileSync('posts.json', newJson)
    res.end()
    
    
    })
    app.put('/api/user/likes/change/delet', (req, res) => {
        const idPost = req.body.id
        const idUser = req.body.idUser
        const userFindId = [...users].findIndex(item => item.id === idUser)
       
       const rep = [...users]
      const repLikes =  rep[userFindId].likesPosts.filter(item => item != idPost)
        rep[userFindId].likesPosts = repLikes
    

        
      
    
      const newJson = JSON.stringify(rep)
      fs.writeFileSync('data.json', newJson)
      res.end()
    })

    app.put('/api/comment/add', (req, res) => {
        const replicaPost = [...dataPostIn]
       const index =  replicaPost.findIndex(item => item.postId === req.body.postId)
        replicaPost[index].comments.push(req.body)
        const newJson = JSON.stringify(replicaPost)
      fs.writeFileSync('posts.json', newJson)
      res.end()
    })
    app.put('/api/comment/addToUser', (req, res) => {
        const obj =  {
            postId: req.body.postId,
            comTxt: req.body.comTxt,
            time: req.body.time,
            author: req.body.author,
            authorId: req.body.authorId      
          }
        
       const rep = [...users]
       const index = rep.findIndex(item => item.id === req.body.authorId)
       rep[index].comments.push(obj)
       const newJson = JSON.stringify(rep)
       fs.writeFileSync('data.json', newJson)
       res.end()

    })

   

    app.put('/api/comment/user/delet', (req, res) => {
        const rep = [...users]
        const userId = rep.findIndex(item => item.id === req.body.authorId)
        const front = req.body
        const index = rep[userId].comments.findIndex(item => item.time === front.time && item.comTxt === front.comTxt && item.author === front.author)
   
       rep[userId].comments.splice(index, 1)
       console.log(rep)
       const newJson = JSON.stringify(rep)
       fs.writeFileSync('data.json', newJson)
       res.end()
     
      
    })
    app.put('/api/comment/delet', (req, res) => {
        const rep = [...dataPostIn]
        const postId = rep.findIndex(item => item.postId === req.body.postId)
       const front = req.body
       const index = rep[postId].comments.findIndex(item => item.time === front.time && item.comTxt === front.comTxt && item.author === front.author)
       rep[postId].comments.splice(index, 1)
       
       const newJson = JSON.stringify(rep)
       fs.writeFileSync('posts.json', newJson)
       res.end()
       
       
          
    
    })
    app.put('/api/user/shares', (req, res) => {
        const front = req.body
        const rep = [...users]
       const index = rep.findIndex(item => item.id === front.authorId)
       const obj = {
           authorId: front.authorId,
           postId: front.postId
       }
        rep[index].shares.push(obj)
        const newJson = JSON.stringify(rep)
        fs.writeFileSync('data.json', newJson)
        res.end()
    })
app.put('/api/user/info/change', (req, res) => {
    const rep = [...users]
   const index = rep.findIndex(item => item.id === req.body.authorId)
    rep[index].info = req.body.info
    const newJson = JSON.stringify(rep)
    fs.writeFileSync('data.json', newJson)
    res.end()
})
app.listen(5000, () => {
    console.log('słucha')
})