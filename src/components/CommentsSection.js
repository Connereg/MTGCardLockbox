import React from 'react';
import styled from 'styled-components';

const CommentsSectionWrapper = styled.ul`
    width: 50%;
`

function CommentsSection(props) {
    const { commentList, deleteComment, loggedIn } = props;

    const allCommentsList = commentList.map((comment) => (
        <li key={comment.id} style={{ marginTop: '4px' }}> <span style={{ color: "red"}}>{comment.name}</span>: {comment.text} {loggedIn ? <button onClick={() => deleteComment(comment.id)}> X </button> : null} </li>
    ))

    return (
        <CommentsSectionWrapper className="custom-card-comments">
            <h3> Card Comments: </h3>
            {allCommentsList.length < 1 ? (<li> No Comments to Show </li>) : allCommentsList}
        </CommentsSectionWrapper>
    )
};

export default CommentsSection;