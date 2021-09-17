import React, { useState } from 'react';


function NewCommentForm(props) {
    const { userId, fetchComments } = props;

    const [ newComment, setNewComment ] = useState("")
    const [ newCommentAuthor, setNewCommentAuthor ] = useState("")

    function submitComment (comment) {
        return fetch('http://localhost:3000/comments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        })
    }

    function handleSubmitNewComment (event) {
        event.preventDefault();

        const commentSubmission = {
            text: newComment,
            name: newCommentAuthor,
            cardId: (userId)
        };        
        submitComment(commentSubmission).then(() => fetchComments(userId))
    }

    function handleNewComment(event) {
        setNewComment(event.target.value)
    }

    function handleNewCommentAuthor (event) {
        setNewCommentAuthor(event.target.value)
    }


    return (
        <form className="add-comment-form" onSubmit={handleSubmitNewComment}>
            <label> Add a New Comment! </label>
            <br />
            <input 
                type="text"
                id="new-comment"
                name="new-comment-input"
                placeholder="Add a Comment"
                value={newComment}
                onChange={handleNewComment}
            />
            <br />
            <input className="add-comment-author"
                type="text"
                id="new-comment-author"
                name="new-comment-author-input"
                placeholder="Author Name"
                value={newCommentAuthor}
                onChange={handleNewCommentAuthor}
            />
            <br />
            <button type="submit">Add Comment</button>
        </form>
    )
}

export default NewCommentForm;