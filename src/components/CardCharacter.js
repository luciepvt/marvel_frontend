import { Link } from "react-router-dom";
import { useState } from "react";

// import "../components/CharactersAndComics.scss";

const CardCharacter = ({ name, description, picture, id }) => {
  return (
    <div className="card-character">
      <Link className="link-character" to={`/characters/${id}`}>
        <div className="character-name">{name}</div>
        <div className="character-picture-container">
          <img className="character-img" src={picture} alt="" />
        </div>
        <div className="character-description-container">
          <div className="character-description">{description}</div>
        </div>
      </Link>
    </div>
  );
};
export default CardCharacter;
