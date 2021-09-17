import React from "react";
import { Link } from 'react-router-dom'

function CustomCard (props) {
    const { image, name, creator, id } = props;

    return (
        <div className="column">
        <span className="custom-card-object">
            <h4>{name}</h4>
                <Link to={`/customcards/${id}`}>
                    <img src={image} alt={name}></img> 
                </Link>
            <p> Created By: {creator}</p>
            <br />
        </span>
        </div>
    )
}

export default CustomCard;