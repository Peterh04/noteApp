import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import notes from '../assets/data'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left (1).svg'


const NotePage = () =>{

    const { id: noteId } = useParams()
    const navigate = useNavigate()

    // let note = notes.find(note => note.id === Number(noteId))

    let [note, setNote] = useState(null)

    useEffect(()=>{
        getNotes()
    }, [noteId])

    let getNotes = async() =>{
        if(noteId == 'new') return
        let response = await fetch(`http://localhost:8000/notes/${noteId}`)
        let data = await response.json();
        setNote(data)
    }

    let updateNote = async() =>{
        await fetch(`http://localhost:8000/notes/${noteId}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({...note, 'updated' : new Date()})
        })
    }

    let deleteNote = async () =>{
        await fetch(`http://localhost:8000/notes/${noteId}`,{
            method : 'DELETE',
            headers : {
                'content-type' :'application/json'
            },
            body : JSON.stringify({note})
        })
        navigate('/')
    }

    let createNote  = async() =>{
        let response = await fetch(`http://localhost:8000/notes/`, {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(note)
        })

    }


    let handleSubmit = () =>{
        if(noteId !== 'new' && !note.body ){
            deleteNote()
        }else if (noteId !== 'new'){

            updateNote();
        }else if(noteId === 'new' && note !== null ){
            createNote();
        }
        navigate('/')
    }

    return (
        <div className='note'>
            <div className="note-header">
                <h3>
                    <Link to={'/'}>
                    <ArrowLeft onClick={handleSubmit}/>
                    </Link>
                </h3>
                 {noteId !== 'new' ? (
                     
                     <button onClick={deleteNote}>Delete</button>
                 ): (
                    <button onClick={handleSubmit}>Add</button>
                 )}
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body} ></textarea>
        </div>
    )
}

export default NotePage