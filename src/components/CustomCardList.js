import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom'
import CustomCard from "./CustomCard";
import NewCustomCardForm from "./NewCustomForm";
import CustomCardDetail from "./CustomCardDetail";
import Search from "./Search";




function CustomCardList() {
    const [ randomRealCards, setRandomRealCards ] = useState([])
    const [ customCardList, setCustomCardList ] = useState([])
    const [ filterSearch, setFilterSearch ] = useState("")

    console.log(customCardList)
    let history = useHistory();

    useEffect(() => {
        console.log("Fetching Data...")
        fetchCustomCardList()
        fetchRandomizedRealCards()
    }, [])

    function fetchCustomCardList(){
        fetch("http://localhost:3000/customCards")
        .then((resp) => resp.json())
        .then(customCardListData => {
            console.log("Data Fetched!");
            setCustomCardList(customCardListData);
        });
    }

    function fetchRandomizedRealCards() {
        fetch("https://api.magicthegathering.io/v1/cards?pageSize=8&random=true&contains=imageUrl")
        .then((resp) => resp.json())
        .then(randomizedRealCards => {
            console.log("Random Cards Fetched!", randomizedRealCards);
            setRandomRealCards(randomizedRealCards.cards)
            
        })
    }

    function postNewCardSubmit(newCard) {
        fetch("http://localhost:3000/customCards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCard)
        }).then((r) => r.json())
        .then(returnedCard => {
            fetchCustomCardList()
            history.push(`/customcards/${returnedCard.id}`)
        })
    }

    const randomizedRealCardList = randomRealCards.map((randomCard) => (
        <img key={randomCard.id} src={randomCard.imageUrl} alt={randomCard.name} style={{ height: 310 }}/>
    ))


     const visibleCards = customCardList.filter((customCard) => 
        filterSearch === "" || customCard.name.toLowerCase().includes(filterSearch.toLowerCase())
    )

    

    const customizedCards = visibleCards.map((customCard) => {
        return (
            <CustomCard
                key={customCard.id}
                id={customCard.id}
                image={customCard.image}
                name={customCard.name}
                creator={customCard.creator}
                password={customCard.password}
            />
        )
    })

   
    return(
    <div>
     <Switch>

        <Route path="/customcards/newCard">
           <div className="randomized-real-card-section"> 
                <h4> Todays' Random Inspiration! </h4>
                <p> Try to use the following real Magic Cards as the basis for your Custom Card! </p>
                {randomizedRealCardList}
                <br />
            </div>

            <NewCustomCardForm postNewCardSubmit={postNewCardSubmit}/>
        </Route>

        <Route path="/customcards/:id">
             <CustomCardDetail fetchCustomCardList={fetchCustomCardList}/>
        </Route>
   
        <Route path="/customcards">
            <div className={"custom-card-div"}>
                <Search filterSearch={filterSearch} setFilterSearch={setFilterSearch}/>
                <h1> Custom Card List </h1>
                <div className="row">
                    {customizedCards}
                </div>
                <br />
            </div>
        </Route>

        <Route path="/">
            <>
                <br />
                <h2> Welcome to MTG Card Lockbox! </h2>
                <br/>
                <h4> This site is used to store, share, and comment on custom made Magic the Gathering cards! </h4>
                <p> To create a new custom card, click the New Card button!</p>
                <p> To see a list of Custom cards made by others, click the Custom Cards button! </p>
                <p> To comment on, and see other comments made on a custom card, simply click on the image of the card you wish you see! </p>
                {customizedCards}
            </>
        </Route>
            
    </Switch>
    </div>
    )
}

export default CustomCardList;