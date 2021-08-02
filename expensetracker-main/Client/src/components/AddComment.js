import React, { useState, useEffect } from 'react'

export const AddComment = () => {
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [id, setId] = useState(0)
    const [date, setDate] = useState('')
    const [comments, setComments] = useState([])

    const onSubmit = () => {
        setId(id+1)
        setComments(oldArray => [...oldArray, [id, name, comment, date]])

        if (Boolean(window.localStorage.comments)) {
            let comments = [...(JSON.parse(localStorage.comments)), [id, name, comment, date]]
            localStorage.setItem('comments', JSON.stringify(comments))
        } else {
            let comments = [[id, name, comment, date]]
            localStorage.setItem('comments', JSON.stringify(comments))
        }
        setName('')
        setComment('')
    }

    const getDate = () => {
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0')
        let yyyy = today.getFullYear()
        today = mm + '.' + dd + '.' + yyyy
        return today
    }

    useEffect(() => {
        if (Boolean(window.localStorage.comments)) {
            setId(JSON.parse(window.localStorage.comments).length)
            setDate(getDate())
            let comments = JSON.parse(window.localStorage.comments)
            setTimeout(() => {
                if (window.localStorage.comments && comments.length > 0) {
                    setComments(comments)
                }
            }, 500)
        }
    }, [])

    const deleteComment = (id) => {
        let elem = document.getElementById("comment-" + id)
        let comments = JSON.parse(window.localStorage.comments)
        let filtered = comments.filter((value) => {
            return id !== value[0]
        })
        localStorage.setItem('comments', JSON.stringify(filtered))
        elem.parentNode.removeChild(elem)
    }

    return (
        <>
            {
                comments.map((item, id) => {
                    return <div 
                            id={`comment-${item[0]}`}
                            className="comment-text"
                            key={id}
                        >
                        <h4>
                            {item[1]}
                            <span className="comment-date">
                                {item[3]}
                            </span>
                        </h4>
                        <p>{item[2]}</p>
                        <button 
                            className="delete-btn"
                            onClick={() => deleteComment(item[0])}
                        >x</button>
                    </div>
                })
            }
            <h3>Add new comment</h3>
            <div className="form-control">
                <label htmlFor="text">Name</label>
                <input 
                onChange={(e) => setName(e.target.value)}
                type="text"
                value={name}
                placeholder="Enter name..."
                />
            </div>
            <div className="form-control">
                <label htmlFor="amount">Comment</label>
                <input
                onChange={(e) => setComment(e.target.value)}
                type="text"
                value={comment}
                placeholder="Enter comment..."
                />
            </div>
            <button onClick={onSubmit} className="btn">Add comment</button>
        </>
    )
}
