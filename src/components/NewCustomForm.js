import React from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components"


const Input = styled.input`
    width: 100%;
    padding: 10px 5px;
    margin: 2px 0;
    box-sizing: border-box;
`;

function NewCustomCardForm(props) {
    const { postNewCardSubmit } = props;

    const [ newCustomName, setNewCustomName ] = useState("")
    const [ newCustomImage, setNewCustomImage ] = useState("")
    const [ newCreatorUserName, setNewCreatorUsername ] = useState("")
    const [ newCustomPassword, setNewCustomPassword ] = useState("")
     
    function handleNewCustomName(event) {
        setNewCustomName(event.target.value)
    }
    function handleNewCustomImage(event) {
        setNewCustomImage(event.target.value)
    }
    function handleNewCreatorUsername(event) {
        setNewCreatorUsername(event.target.value)
    }
    function handleNewCustomPassword(event) {
        setNewCustomPassword(event.target.value)
    }

    function handleSubmitNewCustomCard(event) {
        event.preventDefault();
        postNewCardSubmit({
            image: (newCustomImage),
            name: (newCustomName),
            creator: (newCreatorUserName),
            password: (newCustomPassword),
        })
        setNewCustomName("")
        setNewCustomImage("")
        setNewCreatorUsername("")
        setNewCustomPassword("")
        
    }
    
    return (
        <div className="new-custom-form-container">
            <h2> Submit your own Custom Card! </h2>
            <form className="new-card-submit-form" onSubmit={handleSubmitNewCustomCard}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Custom Card Name"
                    onChange={handleNewCustomName}
                    value={newCustomName} />
                <br />
                <Input
                    type="text"
                    name="image"
                    placeholder="Custom Card Image URL"
                    onChange={handleNewCustomImage}
                    value={newCustomImage} />
                <br />
                <Input
                    type="text"
                    name="creator-username"
                    placeholder="Creator Username Here!"
                    onChange={handleNewCreatorUsername}
                    value={newCreatorUserName} />
                <br />
                <Input
                    type="text"
                    name="creator-password"
                    placeholder="Creator Password Here!"
                    onChange={handleNewCustomPassword}
                    value={newCustomPassword} />
                <br />
                <button className={"submit-button"} type="submit">Submit Your Card!</button>
            </form>

            <div className="new-card-preivew">
                <h3 style={{textAlign: "center"}}> Card Preview </h3>
                    <img src={newCustomImage} alt={newCustomName} />
                    <h4 style={{textAlign: "center"}}>{newCustomName}</h4>
                    <p style={{textAlign: "center"}}>Created by: {newCreatorUserName}</p>
            </div>
        </div>

    )
}

export default NewCustomCardForm;

