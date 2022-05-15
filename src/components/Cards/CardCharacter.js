import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "../Cards/CharactersAndComics.scss";
import "../../pages/Favorites/Favorites.scss";
const CardCharacter = ({ character, favoriteChar, setFavoriteChar, token }) => {
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (favoriteChar.findIndex((fav) => fav._id === character._id) !== -1) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [character._id, favoriteChar]);

  const handleFavorite = async () => {
    if (token) {
      try {
        if (!favorite) {
          const newFav = [...favoriteChar];
          newFav.push(character);
          const response = await axios.post(
            "https://marvel-backend-lucie.herokuapp.com/favorites/update",

            {
              favoriteCharacters: newFav,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setFavoriteChar(response.data.favoriteCharacters);
          Cookies.set(
            "favoriteChar",
            JSON.stringify(response.data.favoriteCharacters)
          );
        } else {
          const trashFav = favoriteChar.filter(
            (fav) => fav._id !== character._id
          );
          const response = await axios.post(
            "https://marvel-backend-lucie.herokuapp.com/favorites/update",

            {
              favoriteCharacters: trashFav,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setFavoriteChar(response.data.favoriteCharacters);
          Cookies.set(
            "favoriteChar",
            JSON.stringify(response.data.favoriteCharacters)
          );
        }
        setFavorite(!favorite);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="card-character">
      {favorite ? (
        <button className="fav-btn" onClick={handleFavorite}></button>
      ) : (
        <button className="no-fav-btn" type onClick={handleFavorite}></button>
      )}
      <Link className="link-character" to={`/characters/${character._id}`}>
        <div className="character-name">{character.name}</div>
        <div className="character-picture-container">
          <img
            className="character-img"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt=""
          />
        </div>
        <div className="character-description-container">
          <p className="character-description">{character.description}</p>
        </div>
      </Link>
    </div>
  );
};
export default CardCharacter;
