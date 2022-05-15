import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// import "../components/CharactersAndComics.scss";

const CardCharacter = ({ character, favChar, setFavChar, token }) => {
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  // garder le favoris en mémoire
  useEffect(() => {
    if (favChar.findIndex((fav) => fav._id === character._id) !== -1) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [character._id, favChar]);

  // ajouter ou enlever favoris from BDD

  const handleFavorite = async () => {
    if (token) {
      try {
        if (!favorite) {
          const newFav = [...favChar];
          newFav.push(character);
          const response = await axios.post(
            "http://localhost:3000/favorites/update",
            // https://marvel-backend-lucie.herokuapp.com/favorites/update
            {
              favoriteCharacters: newFav,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setFavChar(response.data.favoriteCharacters);
          Cookies.set(
            "favChar",
            JSON.stringify(response.data.favoriteCharacters)
          );
        } else {
          const trashFav = favChar.filter((fav) => fav._id !== character._id);
          const response = await axios.post(
            "http://localhost:3000/favorites/update",
            // https://marvel-backend-lucie.herokuapp.com/favorites/update
            {
              favoriteCharacters: trashFav,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setFavChar(response.data.favoriteCharacters);
          Cookies.set(
            "favChar",
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
        <button className="red-btn" onClick={handleFavorite}>
          fav
        </button>
      ) : (
        <button className="grey-btn" type onClick={handleFavorite}>
          not fav
        </button>
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
          <div className="character-description">{character.description}</div>
        </div>
      </Link>
    </div>
  );
};
export default CardCharacter;
