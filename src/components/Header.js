import styled from "styled-components"
import { Link } from 'react-router-dom'

const Button = styled.button`
  background: dodgerblue;
  padding: 16px;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  transition: 200ms ease;
  color: white;
  text-decoration: none;
  font: 1rem sans-serif;

  &:hover {
    background: blueviolet;
    color: white;
  }

  &:focus {
    background: hotpink;
    color: white;
  }
`;





function Header () {
    return(
        <div className="page-header">
        <Link to={`/`}>
            <img className="application-logo" src={"https://64.media.tumblr.com/b87e04436adf7148602d6d5222cd74d3/tumblr_nbn8yujFiZ1qc29lyo1_1280.png"} alt={"mtg-logo"} style={{height: "100px"}}></img>
        </Link>
        <h1 className="application-titler"> MTG Card Lockbox </h1>
        <Wrapper>
            
            <a href={"https://mtgcardsmith.com/mtg-card-maker/"}>
                <Button> MTG Cardsmith </Button>
            </a>
            <Link to={`/customcards/newCard`}>
                <Button> New Card </Button>
            </Link>
            <Link to={`/customcards/`}>
                <Button> Custom Cards </Button>
            </Link>    
                    
        </Wrapper>
        </div>
    )
}

export default Header;

const Wrapper = styled.nav`
  display: block;
  justify-content: space-between;
  max-width: 30%;
  gap: 30px;
  margin: 20 auto;
  padding: 16px;
`;