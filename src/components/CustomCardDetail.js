import React, {useEffect, useState } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import CommentsSection from './CommentsSection';
import NewCommentForm from './NewCommentForm';

const CustomCardWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`

const LoginFormWrapper = styled.div`
    display: flex;
    vertical-align: center;
`

const LoginForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;

    & > h4 {
        padding: 0 20px;
    }
`

function CustomCardDetail(props) {
    const { fetchCustomCardList } = props;
    
    const [ loadedCard, setLoadedCard ] = useState({})
    const { image, name, creator, password } = loadedCard;

    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ cardComments, setCardComments ] = useState([])
    
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ passwordInput, setPasswordInput ] = useState("")

   


    const id = parseInt(useParams().id);

    let history = useHistory();

    function fetchComments (cardId) {
        console.log('fetching comments')
        fetch('http://localhost:3000/comments')
            .then(r => r.json())
            .then(allComments => {
                const filteredComments = allComments.filter(comment => comment.cardId === cardId)
                console.log('filteredComments: ', filteredComments)
                setCardComments(filteredComments)
            })
    }

    useEffect(() => {
        fetch(`http://localhost:3000/customCards/${id}`)
        .then((resp) => resp.json())
        .then(customDetails => {
            fetchComments(parseInt(id));
            setLoadedCard(customDetails);
            setIsLoaded(true);
        })
    }, [id]);    

    function deleteComment(commentId) {
        fetch(`http://localhost:3000/comments/${commentId}`, {
                method: "DELETE",
            })
    }

    function handleDeleteSingleComment(commentId) {
        deleteComment(commentId)
        fetchComments(parseInt(id))
    }

    function handleDeleteAllComments () {
        cardComments.forEach((comment) => {
            deleteComment(comment.id)
        })
    }

    function handleDeleteCardButton () {
        fetch(`http://localhost:3000/customCards/${id}`, {
            method: "DELETE",
        }).then(() => {
            console.log("Custom Card Deleted")
            handleDeleteAllComments()
            fetchCustomCardList()
            history.push("/customcards")
        })
    }

    if (!isLoaded) return <h2>Loading Custom Card...</h2>


    function handleCheckPassword(event){
        event.preventDefault()
        if (passwordInput === password) {
            console.log("You are now Logged In!")
            setLoggedIn(true)
        }else{
            console.log("No Dice!")
        }
    
    }

    return (
        <section className="detailed-card-section">
            <div className="custom-card-container">
                <CustomCardWrapper>
                    <div>
                        <h2> {name} </h2>
                        <img src={image} alt={name}></img>
                          <LoginFormWrapper >  
                            <h4>Creator: {creator} </h4>
                            
                         </LoginFormWrapper>
                    </div>
                    <CommentsSection
                        commentList={cardComments}
                        deleteComment={handleDeleteSingleComment}
                        loggedIn={loggedIn}
                    />
                </CustomCardWrapper>
                
                <br />
                <LoginForm onSubmit={handleCheckPassword}>
                    <h4>Username: {creator} </h4>
                    <input type="password" style={{backgroundColor: 'purple', color: 'white' }} onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput} />
                    {loggedIn ? <button type="submit"> You Are Logged In! </button> : <button type="submit">Log in With Password</button>}
                    <br />
                    {loggedIn ? <button className={"delete-card-button"} onClick={handleDeleteCardButton}> Delete Your Card </button> : null}
                </LoginForm>
                <NewCommentForm userId={id} fetchComments={fetchComments}/>

                
            </div>
        </section>

    )
}

export default CustomCardDetail;