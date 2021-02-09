import React, {useRef, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import '../style/info.css'
export default function InfoTxt({id}) {
    const txtRef = useRef()
    const url = '/api/clientData/shouldBeHidden/butItsNot/BcsICantDoThisJustNow/ForgiveMe'
    const [edit, setEdit] = useState(false)
    const [txt, setTxt] = useState(null)
   
    const log = useSelector(state => state.log)
    useEffect(() => {
       
        fetch(url).then(data => data.json()).then(data => {
          const index = data.findIndex(item => item.id === id)
         setTxt(data[index].info)
         if(!log) return 
          if(data[index].id === log.id) setEdit(true)
          
        })
    }, [])

    const handleSub = (e) => {
        e.preventDefault()
        if(!txtRef.current.value) return alert('pole musi być wypełnione')
       const obj = {
            authorId: id,
            info: txtRef.current.value
        }
        fetch('/api/user/info/change', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

    }
    return (
        edit ?
        <div className = 'infoConteiner'>
        <form onSubmit = {handleSub}>
            <textarea ref = {txtRef} value = {txt} onChange = {(e) => setTxt(e.target.value)}/>
            <button>Wstaw</button>
        </form>
        </div> : 
     <div className = 'txtCon'>
     <article>
        <p>{txt}</p>
        </article>

        </div>
    
      
    )
}
